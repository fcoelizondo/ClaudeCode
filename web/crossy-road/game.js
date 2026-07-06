(() => {
  'use strict';

  // ---- Tunable constants (mirrors the native version's GameConstants) ----
  const TILE = 60;
  const MOVE_DURATION = 120; // ms
  const HOP_HEIGHT = 14;
  const MIN_ROAD_SPEED = 70, MAX_ROAD_SPEED = 190; // px/s
  const MIN_WATER_SPEED = 40, MAX_WATER_SPEED = 110;
  const SAFE_START_ROWS = 3;
  const ROWS_AHEAD_BUFFER = 14;
  const ROWS_BEHIND_KEEP = 6;
  const PLAYER_HALF_WIDTH = 12;
  // Left/right thirds of the screen strafe; the middle third hops forward.
  // (A narrow edge-only strip was too easy to miss on a real phone: a tap
  // anywhere short of the very edge fell through to "forward" and looked
  // like sideways movement was broken, especially when sidestepping a tree.)
  const EDGE_ZONE_FRACTION = 1 / 3;
  const EDGE_ZONE_MIN = 90, EDGE_ZONE_MAX = 220; // px clamp so it stays sane on tiny/huge screens
  // Max pointer travel (px) for a gesture to still count as a tap rather than
  // a swipe -- shared by the canvas and the ready overlay so an exploratory
  // swipe doesn't accidentally dismiss the instructions as a "tap to start".
  const TAP_MAX_TRAVEL = 28;
  const BEST_SCORE_KEY = 'crossyroad.bestScore';
  const CAR_COLORS = ['#e0473f', '#3b82f6', '#f2994a', '#f2d84a', '#9b5de5'];

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp01 = (t) => Math.min(1, Math.max(0, t));

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  class Game {
    constructor() {
      this.canvas = document.getElementById('game');
      this.ctx = this.canvas.getContext('2d');
      this.scoreEl = document.getElementById('score');
      this.bestEl = document.getElementById('best');
      this.readyOverlay = document.getElementById('ready-overlay');
      this.gameOverOverlay = document.getElementById('gameover-overlay');
      this.finalScoreEl = document.getElementById('final-score');
      this.finalBestEl = document.getElementById('final-best');

      this.lanes = new Map();
      this.recentDifficultRun = 0;
      this.minColumn = -4;
      this.maxColumn = 4;

      this.resize();
      window.addEventListener('resize', () => this.resize());

      this.setupInput();
      document.getElementById('restart-btn').addEventListener('click', () => this.startNewGame());

      this.startNewGame();
      requestAnimationFrame((t) => this.loop(t));
    }

    // ---- Setup ----

    resize() {
      const dpr = window.devicePixelRatio || 1;
      this.width = window.innerWidth;
      this.height = window.innerHeight;
      this.canvas.width = Math.round(this.width * dpr);
      this.canvas.height = Math.round(this.height * dpr);
      this.canvas.style.width = this.width + 'px';
      this.canvas.style.height = this.height + 'px';
      this.ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const columnsVisible = Math.max(7, Math.floor(this.width / TILE) | 1);
      this.minColumn = -Math.floor(columnsVisible / 2);
      this.maxColumn = Math.floor(columnsVisible / 2);
      this.anchorScreenY = this.height * 0.75;
    }

    setupInput() {
      let tracking = false, startX = 0, startY = 0;

      this.canvas.addEventListener('pointerdown', (e) => {
        tracking = true;
        startX = e.clientX;
        startY = e.clientY;
      });
      this.canvas.addEventListener('pointerup', (e) => {
        if (!tracking) return;
        tracking = false;
        const dx = e.clientX - startX;
        const dy = e.clientY - startY;
        const adx = Math.abs(dx), ady = Math.abs(dy);
        if (adx < TAP_MAX_TRAVEL && ady < TAP_MAX_TRAVEL) {
          this.handleTapAt(e.clientX);
        } else if (ady > adx) {
          if (dy < 0) this.attemptMove(0, 1); // swipe up; swipe down is ignored (no backward move)
        } else {
          this.attemptMove(dx > 0 ? 1 : -1, 0);
        }
      });
      this.canvas.addEventListener('pointercancel', () => { tracking = false; });

      // The ready overlay only starts the game on a genuine tap. A plain
      // 'click' listener would also fire after a drag that lifts over the
      // same element -- meaning a player's very first exploratory swipe
      // (testing what the controls do) would silently start the game
      // before they'd finished reading the instructions.
      let readyTracking = false, readyStartX = 0, readyStartY = 0;
      this.readyOverlay.addEventListener('pointerdown', (e) => {
        readyTracking = true;
        readyStartX = e.clientX;
        readyStartY = e.clientY;
      });
      this.readyOverlay.addEventListener('pointerup', (e) => {
        if (!readyTracking) return;
        readyTracking = false;
        const adx = Math.abs(e.clientX - readyStartX);
        const ady = Math.abs(e.clientY - readyStartY);
        if (adx < TAP_MAX_TRAVEL && ady < TAP_MAX_TRAVEL) this.startPlaying();
      });
      this.readyOverlay.addEventListener('pointercancel', () => { readyTracking = false; });

      window.addEventListener('keydown', (e) => {
        switch (e.key) {
          case 'ArrowUp': case 'w': case 'W':
            this.handleTap();
            break;
          case 'ArrowLeft': case 'a': case 'A':
            if (this.state === 'playing') this.attemptMove(-1, 0);
            break;
          case 'ArrowRight': case 'd': case 'D':
            if (this.state === 'playing') this.attemptMove(1, 0);
            break;
          // ArrowDown / 's' intentionally do nothing: moving backward isn't allowed.
        }
      });
    }

    handleTap() {
      if (this.state === 'ready') this.startPlaying();
      else if (this.state === 'playing') this.attemptMove(0, 1);
    }

    edgeZoneWidth() {
      return Math.min(EDGE_ZONE_MAX, Math.max(EDGE_ZONE_MIN, this.width * EDGE_ZONE_FRACTION));
    }

    // A tap (not a swipe) in the left/right edge strip strafes instead of
    // hopping forward, so lateral moves don't require a full swipe gesture.
    handleTapAt(clientX) {
      if (this.state === 'ready') { this.startPlaying(); return; }
      if (this.state !== 'playing') return;

      const edge = this.edgeZoneWidth();
      if (clientX < edge) this.attemptMove(-1, 0);
      else if (clientX > this.width - edge) this.attemptMove(1, 0);
      else this.attemptMove(0, 1);
    }

    // ---- Lane generation (mirrors LaneGenerator/GameModels.swift) ----

    generateLane(rowIndex) {
      if (rowIndex < SAFE_START_ROWS) return this.buildLane(rowIndex, 'grass', 0);

      const difficulty = Math.min(1, rowIndex / 140);
      let type;
      if (this.recentDifficultRun >= 3) {
        type = 'grass';
      } else {
        const roll = Math.random();
        if (roll < 0.38) type = 'grass';
        else if (roll < 0.72) type = 'road';
        else type = 'water';
      }
      this.recentDifficultRun = type === 'grass' ? 0 : this.recentDifficultRun + 1;
      return this.buildLane(rowIndex, type, difficulty);
    }

    buildLane(rowIndex, type, difficulty) {
      const lane = {
        row: rowIndex, type,
        direction: 0, speed: 0, loopWidth: 0,
        obstacles: [], blockedColumns: new Set(), trees: [],
        obstacleHalfWidth: TILE / 2,
      };

      if (type === 'grass') {
        const treeCount = Math.floor(Math.random() * 3); // 0..2
        const candidates = [];
        for (let c = this.minColumn; c <= this.maxColumn; c++) candidates.push(c);
        for (let i = 0; i < treeCount && candidates.length; i++) {
          const idx = Math.floor(Math.random() * candidates.length);
          const col = candidates.splice(idx, 1)[0];
          lane.blockedColumns.add(col);
          lane.trees.push(col);
        }
      } else if (type === 'road') {
        const direction = Math.random() < 0.5 ? 1 : -1;
        const speed = MIN_ROAD_SPEED + (MAX_ROAD_SPEED - MIN_ROAD_SPEED) * difficulty * (0.5 + Math.random() * 0.5);
        const carWidth = TILE * 0.82;
        lane.obstacleHalfWidth = carWidth / 2;
        const gap = (1.6 + Math.random() * 1.0) * TILE;
        const spacing = carWidth + gap;
        const count = 6;
        const loopWidth = spacing * count;
        const startOffset = Math.random() * spacing;
        for (let i = 0; i < count; i++) {
          lane.obstacles.push({
            x: -loopWidth / 2 + i * spacing + startOffset,
            width: carWidth,
            color: CAR_COLORS[Math.floor(Math.random() * CAR_COLORS.length)],
            facing: direction,
          });
        }
        lane.direction = direction;
        lane.speed = speed;
        lane.loopWidth = loopWidth;
      } else { // water
        const direction = Math.random() < 0.5 ? 1 : -1;
        const speed = MIN_WATER_SPEED + (MAX_WATER_SPEED - MIN_WATER_SPEED) * difficulty * (0.5 + Math.random() * 0.5);
        const logLength = 2 + Math.floor(Math.random() * 3); // 2..4
        const logWidth = TILE * logLength - TILE * 0.12;
        lane.obstacleHalfWidth = logWidth / 2;
        const gap = (1.0 + Math.random() * 0.8) * TILE;
        const spacing = logWidth + gap;
        const count = 5;
        const loopWidth = spacing * count;
        const startOffset = Math.random() * spacing;
        for (let i = 0; i < count; i++) {
          lane.obstacles.push({ x: -loopWidth / 2 + i * spacing + startOffset, width: logWidth });
        }
        lane.direction = direction;
        lane.speed = speed;
        lane.loopWidth = loopWidth;
      }

      return lane;
    }

    obstacleCovering(lane, x) {
      return lane.obstacles.find((o) => Math.abs(o.x - x) < (lane.obstacleHalfWidth + PLAYER_HALF_WIDTH));
    }

    recycleLanes() {
      const neededUpTo = this.player.row + ROWS_AHEAD_BUFFER;
      for (let r = this.player.row + 1; r <= neededUpTo; r++) {
        if (!this.lanes.has(r)) this.lanes.set(r, this.generateLane(r));
      }
      const cutoff = this.player.row - ROWS_BEHIND_KEEP;
      for (const r of Array.from(this.lanes.keys())) {
        if (r < cutoff) this.lanes.delete(r);
      }
    }

    // ---- Game lifecycle ----

    startNewGame() {
      this.lanes.clear();
      this.recentDifficultRun = 0;
      this.player = { col: 0, row: 0, x: 0, y: 0, facing: 1 };
      this.moveAnim = null;
      this.bumpAnim = null;
      this.deathAnim = null;
      this.hopPhase = 0;
      this.furthestRow = 0;

      for (let r = 0; r <= ROWS_AHEAD_BUFFER; r++) this.lanes.set(r, this.generateLane(r));

      this.cameraY = 0;
      this.cameraTargetY = 0;
      this.state = 'ready';

      this.updateScoreLabel();
      this.gameOverOverlay.classList.add('hidden');
      this.readyOverlay.classList.remove('hidden');
    }

    startPlaying() {
      if (this.state !== 'ready') return;
      this.state = 'playing';
      this.readyOverlay.classList.add('hidden');
    }

    attemptMove(dCol, dRow) {
      if (dRow < 0) return; // moving backward is never allowed
      if (this.state === 'ready') this.startPlaying();
      if (this.state !== 'playing' || this.moveAnim) return;

      const targetCol = this.player.col + dCol;
      const targetRow = this.player.row + dRow;
      if (targetCol < this.minColumn || targetCol > this.maxColumn) return;

      const lane = this.lanes.get(targetRow);
      if (!lane) return;

      if (lane.type === 'grass' && lane.blockedColumns.has(targetCol)) {
        this.bumpAnim = { start: performance.now(), duration: 150, dir: dCol || 1 };
        return;
      }

      this.player.col = targetCol;
      this.player.row = targetRow;
      if (dCol !== 0) this.player.facing = dCol > 0 ? 1 : -1;
      if (targetRow > this.furthestRow) {
        this.furthestRow = targetRow;
        this.updateScoreLabel();
      }

      this.moveAnim = {
        fromX: this.player.x, fromY: this.player.y,
        toX: targetCol * TILE, toY: targetRow * TILE,
        start: performance.now(), duration: MOVE_DURATION,
        onDone: () => this.handleLanding(lane),
      };
    }

    handleLanding(lane) {
      if (this.state !== 'playing') return;
      if (lane.type === 'water') {
        if (!this.obstacleCovering(lane, this.player.x)) this.triggerGameOver('drowned');
      } else if (lane.type === 'road') {
        if (this.obstacleCovering(lane, this.player.x)) this.triggerGameOver('hit');
      }
    }

    triggerGameOver(reason) {
      if (this.state !== 'playing') return;
      this.state = 'gameOver';
      this.deathAnim = { reason, start: performance.now(), duration: 500 };

      const best = Math.max(this.getBest(), this.furthestRow);
      localStorage.setItem(BEST_SCORE_KEY, String(best));

      setTimeout(() => this.showGameOverOverlay(best), 400);
    }

    getBest() {
      return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
    }

    updateScoreLabel() {
      this.scoreEl.textContent = String(this.furthestRow);
      this.bestEl.textContent = 'BEST ' + Math.max(this.getBest(), this.furthestRow);
    }

    showGameOverOverlay(best) {
      this.finalScoreEl.textContent = `Score: ${this.furthestRow}`;
      this.finalBestEl.textContent = `Best: ${best}`;
      this.gameOverOverlay.classList.remove('hidden');
    }

    // ---- Update loop ----

    loop(now) {
      if (!this.lastTime) this.lastTime = now;
      const dt = Math.min((now - this.lastTime) / 1000, 1 / 30);
      this.lastTime = now;
      this.update(dt, now);
      this.render();
      requestAnimationFrame((t) => this.loop(t));
    }

    update(dt, now) {
      if (this.moveAnim) {
        const t = clamp01((now - this.moveAnim.start) / this.moveAnim.duration);
        this.player.x = lerp(this.moveAnim.fromX, this.moveAnim.toX, t);
        this.player.y = lerp(this.moveAnim.fromY, this.moveAnim.toY, t);
        this.hopPhase = Math.sin(Math.PI * t);
        if (t >= 1) {
          const anim = this.moveAnim;
          this.moveAnim = null;
          this.hopPhase = 0;
          anim.onDone();
        }
      }
      if (this.bumpAnim && now - this.bumpAnim.start >= this.bumpAnim.duration) {
        this.bumpAnim = null;
      }

      if (this.state === 'ready') return;

      for (const lane of this.lanes.values()) {
        if (lane.type === 'grass') continue;
        const delta = lane.direction * lane.speed * dt;
        const half = lane.loopWidth / 2;
        for (const o of lane.obstacles) {
          o.x += delta;
          if (o.x > half) o.x -= lane.loopWidth;
          if (o.x < -half) o.x += lane.loopWidth;
        }

        if (this.state !== 'playing') continue;
        if (lane.row === this.player.row && !this.moveAnim) {
          if (lane.type === 'road') {
            if (this.obstacleCovering(lane, this.player.x)) this.triggerGameOver('hit');
          } else if (lane.type === 'water') {
            if (this.obstacleCovering(lane, this.player.x)) {
              this.player.x += delta;
            } else {
              this.triggerGameOver('drowned');
            }
          }
        }
      }

      if (this.state === 'playing') {
        this.recycleLanes();
        this.cameraTargetY = Math.max(this.cameraTargetY, this.player.y);
        this.cameraY += (this.cameraTargetY - this.cameraY) * Math.min(1, dt * 6);
      }
    }

    // ---- Rendering ----

    screenX(worldX) { return this.width / 2 + worldX; }
    screenY(worldY) { return this.anchorScreenY - (worldY - this.cameraY); }

    render() {
      const ctx = this.ctx;
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.fillStyle = '#8cc7f2';
      ctx.fillRect(0, 0, this.width, this.height);

      for (const lane of this.lanes.values()) this.drawLane(lane);
      this.drawPlayer();
      if (this.state === 'playing') this.drawEdgeHints();
    }

    // Chevrons marking the tap-to-strafe zones (centered in each zone). Each
    // sits on its own translucent dark pill so it stays legible regardless
    // of which lane color happens to be scrolling underneath -- a plain
    // low-alpha glyph directly on the world was unreadable over grass/water.
    drawEdgeHints() {
      const ctx = this.ctx;
      const edge = this.edgeZoneWidth();
      const midY = this.height * 0.5;
      const fontSize = Math.min(40, Math.max(26, edge * 0.22));
      const pillRadius = fontSize * 0.66;

      const drawHint = (x, glyph) => {
        ctx.save();
        ctx.globalAlpha = 0.72;
        ctx.fillStyle = '#000000';
        ctx.beginPath();
        ctx.arc(x, midY, pillRadius, 0, Math.PI * 2);
        ctx.fill();
        ctx.restore();

        ctx.save();
        ctx.fillStyle = '#ffffff';
        ctx.font = `${Math.round(fontSize)}px -apple-system, sans-serif`;
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText(glyph, x, midY);
        ctx.restore();
      };

      drawHint(edge * 0.5, '‹');
      drawHint(this.width - edge * 0.5, '›');
    }

    drawLane(lane) {
      const y = this.screenY(lane.row * TILE);
      if (y < -TILE || y > this.height + TILE) return;

      const ctx = this.ctx;
      ctx.save();
      if (lane.type === 'grass') ctx.fillStyle = '#5cb852';
      else if (lane.type === 'road') ctx.fillStyle = '#383838';
      else ctx.fillStyle = '#3478d9';
      ctx.fillRect(0, y - TILE / 2, this.width, TILE);

      if (lane.type === 'road') {
        ctx.fillStyle = 'rgba(255,255,255,0.6)';
        for (let c = this.minColumn; c <= this.maxColumn; c++) {
          const x = this.screenX(c * TILE);
          ctx.fillRect(x - TILE * 0.175, y - 2, TILE * 0.35, 4);
        }
        for (const car of lane.obstacles) this.drawCar(this.screenX(car.x), y, car);
      } else if (lane.type === 'water') {
        for (const log of lane.obstacles) this.drawLog(this.screenX(log.x), y, log.width);
      } else {
        for (const col of lane.trees) this.drawTree(this.screenX(col * TILE), y);
      }
      ctx.restore();
    }

    drawCar(x, y, car) {
      const ctx = this.ctx;
      const h = TILE * 0.62;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = car.color;
      ctx.fillRect(-car.width / 2, -h / 2, car.width, h);
      ctx.fillStyle = 'rgba(230,230,230,0.9)';
      const cabinW = car.width * 0.4, cabinH = h * 0.7;
      const cabinX = car.facing > 0 ? car.width * 0.12 : -car.width * 0.12;
      ctx.fillRect(cabinX - cabinW / 2, -cabinH / 2, cabinW, cabinH);
      ctx.restore();
    }

    drawLog(x, y, width) {
      const ctx = this.ctx;
      const h = TILE * 0.7;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = '#8c5c33';
      ctx.fillRect(-width / 2, -h / 2, width, h);
      ctx.strokeStyle = 'rgba(97,61,31,0.8)';
      ctx.lineWidth = 1.5;
      for (let i = 0; i < 3; i++) {
        const cx = -width / 2 + width * (i + 0.5) / 3;
        ctx.beginPath();
        ctx.arc(cx, 0, h * 0.18, 0, Math.PI * 2);
        ctx.stroke();
      }
      ctx.restore();
    }

    drawTree(x, y) {
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);
      ctx.fillStyle = '#6b4726';
      ctx.fillRect(-5, -2, 10, 16);
      ctx.fillStyle = '#26722e';
      ctx.beginPath();
      ctx.arc(0, -14, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawPlayer() {
      const ctx = this.ctx;
      const now = performance.now();
      let x = this.screenX(this.player.x);
      let y = this.screenY(this.player.y);
      let scale = 1, rotation = 0, alpha = 1, hopLift = 0, bumpOffset = 0;

      if (this.hopPhase) hopLift = this.hopPhase * HOP_HEIGHT;
      if (this.bumpAnim) {
        const t = clamp01((now - this.bumpAnim.start) / this.bumpAnim.duration);
        bumpOffset = Math.sin(t * Math.PI) * 8 * this.bumpAnim.dir;
      }
      if (this.deathAnim) {
        const t = clamp01((now - this.deathAnim.start) / this.deathAnim.duration);
        if (this.deathAnim.reason === 'hit') {
          rotation = t * Math.PI * 4;
          scale = 1 - t * 0.9;
        } else {
          y += t * 20;
          alpha = 1 - t;
        }
      }

      ctx.save();
      ctx.globalAlpha = alpha;
      ctx.translate(x + bumpOffset, y - hopLift);
      ctx.rotate(rotation);
      ctx.scale(this.player.facing < 0 ? -scale : scale, scale);
      this.drawChicken(ctx);
      ctx.restore();
    }

    drawChicken(ctx) {
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(0, 10, 13, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.fillStyle = '#ffffff';
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1.5;

      roundRectPath(ctx, -15, -23, 30, 30, 8);
      ctx.fill(); ctx.stroke();

      roundRectPath(ctx, -10, -33, 20, 18, 6);
      ctx.fill(); ctx.stroke();

      ctx.fillStyle = '#e0473f';
      roundRectPath(ctx, -3, -40, 6, 6, 2);
      ctx.fill();

      ctx.fillStyle = '#f2994a';
      roundRectPath(ctx, -4, -27, 8, 6, 1);
      ctx.fill();

      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(-5, -25, 1.6, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(5, -25, 1.6, 0, Math.PI * 2); ctx.fill();
    }
  }

  window.addEventListener('DOMContentLoaded', () => { window.__crossyRoad = new Game(); });
})();
