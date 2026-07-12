(() => {
  'use strict';

  // ---- Tunable constants ----
  const GRAVITY = 1400; // px/s^2
  const JUMP_VELOCITY = -680; // normal platform bounce
  const SPRING_VELOCITY = -1050; // trampoline bounce
  const FLIGHT_VY = -520; // constant ascend while balloon-boosted
  const FLIGHT_DURATION = 3; // seconds
  const MAX_VX = 340; // px/s
  const STEER_LERP = 10; // how quickly vx catches up to the input target
  const PLAYER_HALF_W = 22, PLAYER_HALF_H = 26;
  const PLATFORM_W = 76, PLATFORM_H = 18;
  const ANCHOR_FRACTION = 0.4; // player stays at this fraction of screen height once climbing
  const GAP_MIN = 72, GAP_MAX = 118, GAP_MAX_HARD = 148;
  const SPAWN_MARGIN_ABOVE = 40;
  const DESPAWN_MARGIN_BELOW = 60;
  const MOVING_PLATFORM_SPEED = 70;
  const ENEMY_SPEED = 90;
  const BEST_SCORE_KEY = 'skyroo.bestScore';
  const SPACE_TRANSITION_SCROLL = 7000; // px of total climb to fully shift to the night sky

  const lerp = (a, b, t) => a + (b - a) * t;
  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const clamp01 = (t) => clamp(t, 0, 1);
  const lerpColor = (c1, c2, t) => {
    const r = Math.round(lerp(c1[0], c2[0], t));
    const g = Math.round(lerp(c1[1], c2[1], t));
    const b = Math.round(lerp(c1[2], c2[2], t));
    return `rgb(${r},${g},${b})`;
  };

  const SKY_DAY = [126, 200, 242];
  const SKY_SPACE = [20, 22, 48];

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

      this.resize();
      window.addEventListener('resize', () => this.resize());

      this.setupInput();
      document.getElementById('restart-btn').addEventListener('click', () => this.startNewGame());

      this.stars = [];
      for (let i = 0; i < 60; i++) {
        this.stars.push({ x: Math.random(), y: Math.random() * 3000, r: Math.random() * 1.6 + 0.4 });
      }
      this.bgClouds = [];
      for (let i = 0; i < 10; i++) {
        this.bgClouds.push({ x: Math.random(), y: Math.random() * 2000, scale: 0.6 + Math.random() * 0.8 });
      }

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
      this.anchorY = this.height * ANCHOR_FRACTION;
    }

    setupInput() {
      this.inputDir = 0;
      this.pointerDown = false;
      const keys = new Set();

      const updateFromKeys = () => {
        let d = 0;
        if (keys.has('ArrowLeft') || keys.has('a') || keys.has('A')) d -= 1;
        if (keys.has('ArrowRight') || keys.has('d') || keys.has('D')) d += 1;
        if (!this.pointerDown) this.inputDir = d;
        this.keyDir = d;
      };

      window.addEventListener('keydown', (e) => {
        keys.add(e.key);
        updateFromKeys();
        if (e.key === ' ' || e.key === 'Enter') {
          if (this.state === 'ready') this.startPlaying();
          else if (this.state === 'gameOver') this.startNewGame();
        }
      });
      window.addEventListener('keyup', (e) => {
        keys.delete(e.key);
        updateFromKeys();
      });

      this.canvas.addEventListener('pointerdown', (e) => {
        this.pointerDown = true;
        this.inputDir = e.clientX < this.width / 2 ? -1 : 1;
      });
      this.canvas.addEventListener('pointermove', (e) => {
        if (!this.pointerDown) return;
        this.inputDir = e.clientX < this.width / 2 ? -1 : 1;
      });
      const releasePointer = () => {
        this.pointerDown = false;
        this.inputDir = this.keyDir || 0;
      };
      this.canvas.addEventListener('pointerup', releasePointer);
      this.canvas.addEventListener('pointercancel', releasePointer);

      let readyTracking = false;
      this.readyOverlay.addEventListener('pointerdown', () => { readyTracking = true; });
      this.readyOverlay.addEventListener('pointerup', () => {
        if (readyTracking) this.startPlaying();
        readyTracking = false;
      });
    }

    // ---- Platform / enemy / powerup generation ----

    makePlatform(x, y) {
      const roll = Math.random();
      const difficulty = clamp01(this.totalScroll / 4000);
      let type = 'normal';
      if (roll < 0.10 + difficulty * 0.05) type = 'spring';
      else if (roll < 0.30 + difficulty * 0.12) type = 'moving';
      else if (roll < 0.46 + difficulty * 0.14) type = 'breakable';

      return {
        x, y, type,
        width: PLATFORM_W,
        vx: type === 'moving' ? (Math.random() < 0.5 ? -1 : 1) * MOVING_PLATFORM_SPEED : 0,
        broken: false,
        breakTimer: 0,
        squash: 0,
      };
    }

    spawnAbove() {
      let topY = this.platforms.length
        ? Math.min(...this.platforms.map((p) => p.y))
        : this.height - 80;
      while (topY > -SPAWN_MARGIN_ABOVE) {
        const difficulty = clamp01(this.totalScroll / 5000);
        const gapMax = lerp(GAP_MAX, GAP_MAX_HARD, difficulty);
        const gap = GAP_MIN + Math.random() * (gapMax - GAP_MIN);
        topY -= gap;
        const margin = PLATFORM_W / 2 + 8;
        const x = margin + Math.random() * (this.width - margin * 2);
        this.platforms.push(this.makePlatform(x, topY));

        // Occasionally place a balloon a little above a platform, and a crow
        // drifting in open space once the player has climbed a bit.
        if (Math.random() < 0.12) {
          this.powerups.push({ x: clamp(x + (Math.random() * 80 - 40), 30, this.width - 30), y: topY - 60, taken: false });
        }
        if (this.totalScroll > 600 && Math.random() < 0.16 + difficulty * 0.1) {
          this.enemies.push({
            x: Math.random() < 0.5 ? -20 : this.width + 20,
            y: topY - 40 - Math.random() * 40,
            vx: (Math.random() < 0.5 ? -1 : 1) * ENEMY_SPEED,
            wingPhase: Math.random() * Math.PI * 2,
          });
        }
      }
    }

    // ---- Game lifecycle ----

    startNewGame() {
      this.platforms = [];
      this.enemies = [];
      this.powerups = [];
      this.totalScroll = 0;
      this.flightTimer = 0;
      this.squashTimer = 0;

      // A guaranteed safe starting platform right under the player.
      this.platforms.push(this.makePlatform(this.width / 2, this.height - 70));
      let topY = this.height - 70;
      while (topY > -SPAWN_MARGIN_ABOVE) {
        topY -= GAP_MIN + Math.random() * (GAP_MAX - GAP_MIN);
        const margin = PLATFORM_W / 2 + 8;
        const x = margin + Math.random() * (this.width - margin * 2);
        this.platforms.push(this.makePlatform(x, topY));
      }

      this.player = {
        x: this.width / 2, y: this.height - 70 - PLAYER_HALF_H - 4,
        vx: 0, vy: 0, facing: 1,
      };
      this.player.prevY = this.player.y;

      this.state = 'ready';
      this.updateScoreLabel();
      this.gameOverOverlay.classList.add('hidden');
      this.readyOverlay.classList.remove('hidden');
    }

    startPlaying() {
      if (this.state !== 'ready') return;
      this.state = 'playing';
      this.readyOverlay.classList.add('hidden');
      this.player.vy = JUMP_VELOCITY * 0.6;
    }

    triggerGameOver() {
      if (this.state !== 'playing') return;
      this.state = 'gameOver';
      const scoreVal = this.scoreValue();
      const best = Math.max(this.getBest(), scoreVal);
      localStorage.setItem(BEST_SCORE_KEY, String(best));
      setTimeout(() => this.showGameOverOverlay(scoreVal, best), 250);
    }

    getBest() {
      return Number(localStorage.getItem(BEST_SCORE_KEY)) || 0;
    }

    scoreValue() {
      return Math.floor(this.totalScroll / 10);
    }

    updateScoreLabel() {
      this.scoreEl.textContent = String(this.scoreValue());
      this.bestEl.textContent = 'BEST ' + Math.max(this.getBest(), this.scoreValue());
    }

    showGameOverOverlay(score, best) {
      this.finalScoreEl.textContent = `Score: ${score}`;
      this.finalBestEl.textContent = `Best: ${best}`;
      this.gameOverOverlay.classList.remove('hidden');
    }

    // ---- Update loop ----

    loop(now) {
      if (!this.lastTime) this.lastTime = now;
      const dt = Math.min((now - this.lastTime) / 1000, 1 / 30);
      this.lastTime = now;
      this.update(dt);
      this.render();
      requestAnimationFrame((t) => this.loop(t));
    }

    update(dt) {
      const p = this.player;

      // Horizontal steering, with screen wrap-around.
      const targetVx = this.inputDir * MAX_VX;
      p.vx = lerp(p.vx, targetVx, clamp01(dt * STEER_LERP));
      if (this.inputDir !== 0) p.facing = this.inputDir;
      p.x += p.vx * dt;
      if (p.x < -PLAYER_HALF_W) p.x = this.width + PLAYER_HALF_W;
      if (p.x > this.width + PLAYER_HALF_W) p.x = -PLAYER_HALF_W;

      if (this.squashTimer > 0) this.squashTimer -= dt;

      if (this.state !== 'playing') {
        this.updateDecor(dt, 0);
        return;
      }

      p.prevY = p.y;
      if (this.flightTimer > 0) {
        this.flightTimer -= dt;
        p.vy = FLIGHT_VY;
      } else {
        p.vy += GRAVITY * dt;
      }
      p.y += p.vy * dt;

      // Scroll the world up under the player once she climbs above the anchor line.
      let scrollAmount = 0;
      if (p.y < this.anchorY) {
        scrollAmount = this.anchorY - p.y;
        p.y = this.anchorY;
        this.totalScroll += scrollAmount;
        for (const pl of this.platforms) pl.y += scrollAmount;
        for (const e of this.enemies) e.y += scrollAmount;
        for (const b of this.powerups) b.y += scrollAmount;
      }

      // Moving platforms.
      for (const pl of this.platforms) {
        if (pl.type === 'moving' && !pl.broken) {
          pl.x += pl.vx * dt;
          const margin = PLATFORM_W / 2 + 4;
          if (pl.x < margin) { pl.x = margin; pl.vx *= -1; }
          if (pl.x > this.width - margin) { pl.x = this.width - margin; pl.vx *= -1; }
        }
        if (pl.squash > 0) pl.squash -= dt * 4;
        if (pl.broken) {
          pl.breakTimer += dt;
        }
      }
      this.platforms = this.platforms.filter((pl) => !(pl.broken && pl.breakTimer > 0.35));

      // Enemies.
      for (const e of this.enemies) {
        e.x += e.vx * dt;
        e.wingPhase += dt * 10;
      }

      // Landing on a platform: only while falling, and only if we crossed
      // its top surface this frame (prevents landing while ascending through it).
      if (p.vy > 0 && this.flightTimer <= 0) {
        for (const pl of this.platforms) {
          if (pl.broken) continue;
          const halfW = pl.width / 2;
          if (Math.abs(p.x - pl.x) > halfW + PLAYER_HALF_W - 8) continue;
          const feetPrev = p.prevY + PLAYER_HALF_H;
          const feetNow = p.y + PLAYER_HALF_H;
          if (feetPrev <= pl.y && feetNow >= pl.y) {
            p.y = pl.y - PLAYER_HALF_H;
            pl.squash = 1;
            if (pl.type === 'spring') {
              p.vy = SPRING_VELOCITY;
            } else {
              p.vy = JUMP_VELOCITY;
            }
            if (pl.type === 'breakable') {
              pl.broken = true;
              pl.breakTimer = 0;
            }
            this.squashTimer = 0.15;
            break;
          }
        }
      }

      // Powerups.
      for (const b of this.powerups) {
        if (b.taken) continue;
        const dx = p.x - b.x, dy = p.y - b.y;
        if (Math.abs(dx) < 30 && Math.abs(dy) < 34) {
          b.taken = true;
          this.flightTimer = FLIGHT_DURATION;
        }
      }
      this.powerups = this.powerups.filter((b) => !b.taken);

      // Enemy collisions (flight makes Roo invincible, matching the boost's
      // "soar past everything" feel).
      if (this.flightTimer <= 0) {
        for (const e of this.enemies) {
          if (Math.abs(p.x - e.x) < 28 && Math.abs(p.y - e.y) < 28) {
            this.triggerGameOver();
            break;
          }
        }
      }

      // Cull offscreen, spawn new ahead.
      this.platforms = this.platforms.filter((pl) => pl.y < this.height + DESPAWN_MARGIN_BELOW);
      this.enemies = this.enemies.filter((e) => e.y < this.height + DESPAWN_MARGIN_BELOW && e.y > -400);
      this.powerups = this.powerups.filter((b) => b.y < this.height + DESPAWN_MARGIN_BELOW);
      this.spawnAbove();

      this.updateScoreLabel();
      this.updateDecor(dt, scrollAmount);

      if (p.y - PLAYER_HALF_H > this.height) {
        this.triggerGameOver();
      }
    }

    updateDecor(dt, scrollAmount) {
      for (const s of this.stars) {
        s.y += scrollAmount * 0.5;
        if (s.y > this.height + 20) s.y -= 3000;
      }
      for (const c of this.bgClouds) {
        c.y += scrollAmount * 0.3;
        if (c.y > this.height + 60) c.y -= 2000;
      }
    }

    // ---- Rendering ----

    spaceT() {
      return clamp01(this.totalScroll / SPACE_TRANSITION_SCROLL);
    }

    render() {
      const ctx = this.ctx;
      const t = this.spaceT();
      ctx.clearRect(0, 0, this.width, this.height);
      ctx.fillStyle = lerpColor(SKY_DAY, SKY_SPACE, t);
      ctx.fillRect(0, 0, this.width, this.height);

      if (t > 0.15) {
        ctx.save();
        ctx.globalAlpha = clamp01((t - 0.15) / 0.5);
        ctx.fillStyle = '#fff';
        for (const s of this.stars) {
          ctx.beginPath();
          ctx.arc(s.x * this.width, s.y % (this.height + 3000), s.r, 0, Math.PI * 2);
          ctx.fill();
        }
        ctx.restore();
      }

      ctx.save();
      ctx.globalAlpha = 0.85 * (1 - t * 0.6);
      for (const c of this.bgClouds) this.drawBgCloud(c.x * this.width, c.y % (this.height + 2000), c.scale);
      ctx.restore();

      for (const b of this.powerups) this.drawBalloon(b.x, b.y);
      for (const pl of this.platforms) this.drawPlatform(pl);
      for (const e of this.enemies) this.drawCrow(e);
      this.drawPlayer();
    }

    drawBgCloud(x, y, scale) {
      const ctx = this.ctx;
      ctx.save();
      ctx.translate(x, y);
      ctx.scale(scale, scale);
      ctx.fillStyle = '#fff';
      ctx.beginPath();
      ctx.ellipse(0, 0, 26, 14, 0, 0, Math.PI * 2);
      ctx.ellipse(-18, 4, 16, 10, 0, 0, Math.PI * 2);
      ctx.ellipse(18, 4, 16, 10, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }

    drawPlatform(pl) {
      if (pl.y < -PLATFORM_H || pl.y > this.height + PLATFORM_H) return;
      const ctx = this.ctx;
      const squash = pl.squash > 0 ? Math.max(0, pl.squash) : 0;
      const w = pl.width * (1 + squash * 0.12);
      const h = PLATFORM_H * (1 - squash * 0.3);
      ctx.save();
      ctx.translate(pl.x, pl.y);
      if (pl.broken) ctx.globalAlpha = 1 - pl.breakTimer / 0.35;

      const puffColor = pl.type === 'moving' ? '#cfe8ff' : pl.type === 'breakable' ? '#e9e9ee' : '#ffffff';
      ctx.fillStyle = puffColor;
      ctx.strokeStyle = 'rgba(0,0,0,0.12)';
      ctx.lineWidth = 1.5;
      roundRectPath(ctx, -w / 2, -h / 2, w, h, h / 2);
      ctx.fill();
      ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(-w * 0.22, -h * 0.15, w * 0.22, h * 0.55, 0, 0, Math.PI * 2);
      ctx.ellipse(w * 0.2, -h * 0.1, w * 0.2, h * 0.5, 0, 0, Math.PI * 2);
      ctx.fill();

      if (pl.type === 'breakable') {
        ctx.strokeStyle = 'rgba(120,120,130,0.6)';
        ctx.lineWidth = 1.2;
        ctx.beginPath();
        ctx.moveTo(-w * 0.2, -h * 0.3); ctx.lineTo(-w * 0.05, h * 0.2); ctx.lineTo(w * 0.15, -h * 0.1);
        ctx.stroke();
      }
      if (pl.type === 'spring') {
        ctx.strokeStyle = '#c0392b';
        ctx.lineWidth = 3;
        ctx.beginPath();
        for (let i = 0; i < 3; i++) {
          const cy = -h / 2 - 3 - i * 5;
          ctx.moveTo(-9, cy);
          ctx.lineTo(9, cy - 4);
        }
        ctx.stroke();
      }
      ctx.restore();
    }

    drawBalloon(x, y) {
      const ctx = this.ctx;
      const bob = Math.sin((performance.now() / 400) + x) * 3;
      ctx.save();
      ctx.translate(x, y + bob);
      const colors = ['#e0473f', '#f2994a', '#4cad59'];
      const offsets = [-11, 0, 11];
      for (let i = 0; i < 3; i++) {
        ctx.strokeStyle = 'rgba(0,0,0,0.25)';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(offsets[i], 10);
        ctx.lineTo(0, 22);
        ctx.stroke();
      }
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.ellipse(offsets[i], 0, 10, 13, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawCrow(e) {
      const ctx = this.ctx;
      if (e.y < -30 || e.y > this.height + 30) return;
      const flap = Math.sin(e.wingPhase) * 10;
      ctx.save();
      ctx.translate(e.x, e.y);
      ctx.scale(e.vx < 0 ? -1 : 1, 1);
      ctx.fillStyle = '#2b2b33';
      ctx.beginPath();
      ctx.ellipse(0, 0, 12, 7, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(9, -3, 5, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#f2994a';
      ctx.beginPath();
      ctx.moveTo(14, -3); ctx.lineTo(20, -1); ctx.lineTo(14, 1);
      ctx.fill();
      ctx.strokeStyle = '#2b2b33';
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(-2, 0); ctx.lineTo(-16, -flap);
      ctx.moveTo(2, 0); ctx.lineTo(16, flap);
      ctx.stroke();
      ctx.restore();
    }

    drawPlayer() {
      const ctx = this.ctx;
      const p = this.player;
      let scale = 1;
      if (this.squashTimer > 0) scale = 1 - (this.squashTimer / 0.15) * 0.18;

      ctx.save();
      ctx.globalAlpha = this.state === 'gameOver' ? 0.5 : 1;
      ctx.translate(p.x, p.y);
      ctx.scale(p.facing < 0 ? -1 : 1, scale);

      ctx.fillStyle = 'rgba(0,0,0,0.2)';
      ctx.beginPath();
      ctx.ellipse(0, PLAYER_HALF_H + 4, 16, 5, 0, 0, Math.PI * 2);
      ctx.fill();

      if (this.flightTimer > 0) this.drawFlightBalloons(ctx);

      this.drawRoo(ctx);
      ctx.restore();
    }

    drawFlightBalloons(ctx) {
      const bob = Math.sin(performance.now() / 200) * 2;
      ctx.save();
      ctx.translate(0, -PLAYER_HALF_H - 14 + bob);
      const colors = ['#e0473f', '#f2994a', '#4cad59'];
      const offsets = [-13, 0, 13];
      ctx.strokeStyle = 'rgba(0,0,0,0.25)';
      ctx.lineWidth = 1;
      for (let i = 0; i < 3; i++) {
        ctx.beginPath();
        ctx.moveTo(offsets[i], 10);
        ctx.lineTo(0, 24);
        ctx.stroke();
      }
      for (let i = 0; i < 3; i++) {
        ctx.fillStyle = colors[i];
        ctx.beginPath();
        ctx.ellipse(offsets[i], 0, 9, 12, 0, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }

    drawRoo(ctx) {
      // Tail
      ctx.fillStyle = '#c98452';
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-6, 10);
      ctx.quadraticCurveTo(-24, 18, -20, 30);
      ctx.quadraticCurveTo(-16, 20, -2, 16);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Legs / feet
      ctx.fillStyle = '#c98452';
      roundRectPath(ctx, -14, 16, 12, 10, 4);
      ctx.fill(); ctx.stroke();
      roundRectPath(ctx, 4, 16, 14, 8, 4);
      ctx.fill(); ctx.stroke();

      // Body
      ctx.fillStyle = '#dc9a68';
      roundRectPath(ctx, -18, -14, 36, 32, 14);
      ctx.fill();
      ctx.stroke();

      // Belly / pouch
      ctx.fillStyle = '#f0c396';
      roundRectPath(ctx, -12, -2, 22, 18, 9);
      ctx.fill();

      // Joey peeking out of the pouch
      ctx.fillStyle = '#dc9a68';
      ctx.beginPath();
      ctx.arc(-2, 4, 6, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath(); ctx.arc(-4, 3, 1, 0, Math.PI * 2); ctx.fill();
      ctx.beginPath(); ctx.arc(0, 3, 1, 0, Math.PI * 2); ctx.fill();

      // Arms
      ctx.fillStyle = '#dc9a68';
      roundRectPath(ctx, -19, -6, 8, 16, 4);
      ctx.fill(); ctx.stroke();
      roundRectPath(ctx, 11, -6, 8, 16, 4);
      ctx.fill(); ctx.stroke();

      // Head
      ctx.fillStyle = '#dc9a68';
      ctx.beginPath();
      ctx.arc(6, -22, 15, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Ears
      ctx.fillStyle = '#dc9a68';
      ctx.beginPath();
      ctx.ellipse(-2, -36, 6, 11, -0.3, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.beginPath();
      ctx.ellipse(12, -37, 6, 11, 0.25, 0, Math.PI * 2);
      ctx.fill(); ctx.stroke();
      ctx.fillStyle = '#f0c396';
      ctx.beginPath();
      ctx.ellipse(-2, -35, 3, 7, -0.3, 0, Math.PI * 2);
      ctx.fill();
      ctx.beginPath();
      ctx.ellipse(12, -36, 3, 7, 0.25, 0, Math.PI * 2);
      ctx.fill();

      // Snout
      ctx.fillStyle = '#f0c396';
      ctx.beginPath();
      ctx.ellipse(14, -18, 7, 6, 0, 0, Math.PI * 2);
      ctx.fill();
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.ellipse(19, -19, 2, 2.4, 0, 0, Math.PI * 2);
      ctx.fill();

      // Eye
      ctx.fillStyle = '#000';
      ctx.beginPath();
      ctx.arc(9, -25, 2, 0, Math.PI * 2);
      ctx.fill();
    }
  }

  window.addEventListener('DOMContentLoaded', () => { window.__skyRoo = new Game(); });
})();
