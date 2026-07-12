(() => {
  'use strict';

  // ---- Field & physics constants (logical pixels, tuned for this layout) ----
  const WIDTH = 960, HEIGHT = 540;
  const GROUND_Y = HEIGHT - 70;
  const GOAL_WIDTH = 46;
  const GOAL_HEIGHT = 150;
  const GOAL_LINE_LEFT = GOAL_WIDTH;
  const GOAL_LINE_RIGHT = WIDTH - GOAL_WIDTH;
  const MOUTH_TOP = GROUND_Y - GOAL_HEIGHT;

  const PLAYER_R = 27;
  const BALL_R = 13;
  const GRAVITY = 2000;
  const MOVE_SPEED = 300;
  const JUMP_V = -760;
  const GROUND_BOUNCE = 0.72;
  const WALL_BOUNCE = 0.68;
  const KICK_RANGE = PLAYER_R + BALL_R + 16;
  const KICK_POWER = 900;
  const KICK_LIFT = -320;
  const KICK_DURATION = 0.18;
  const BUMP_POWER = 480;
  const MATCH_TIME = 90;
  const GOAL_CELEBRATE_TIME = 1.4;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const damp = (value, factor, dt) => value * Math.pow(factor, dt * 60);

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  class Player {
    constructor(side, color, isAI) {
      this.side = side; // 'left' | 'right'
      this.color = color;
      this.isAI = isAI;
      this.reset();
    }
    reset() {
      this.x = this.side === 'left' ? WIDTH * 0.25 : WIDTH * 0.75;
      this.y = GROUND_Y - PLAYER_R;
      this.vx = 0;
      this.vy = 0;
      this.onGround = true;
      this.facing = this.side === 'left' ? 1 : -1;
      this.kickTimer = 0;
      this.kickApplied = false;
      this.aiCooldown = 0;
    }
    jump() {
      if (this.onGround) {
        this.vy = JUMP_V;
        this.onGround = false;
      }
    }
    kick() {
      this.kickTimer = KICK_DURATION;
      this.kickApplied = false;
    }
  }

  class Game {
    constructor() {
      this.canvas = document.getElementById('game');
      this.ctx = this.canvas.getContext('2d');
      this.timerEl = document.getElementById('timer');
      this.scoreLeftEl = document.getElementById('score-left');
      this.scoreRightEl = document.getElementById('score-right');
      this.startOverlay = document.getElementById('start-overlay');
      this.fulltimeOverlay = document.getElementById('fulltime-overlay');
      this.fulltimeTitle = document.getElementById('fulltime-title');
      this.fulltimeScore = document.getElementById('fulltime-score');
      this.goalBanner = document.getElementById('goal-banner');

      this.p1 = new Player('left', '#5cc7ff', false);
      this.p2 = new Player('right', '#ff6b6b', true);
      this.ball = { x: WIDTH / 2, y: GROUND_Y - BALL_R - 120, vx: 0, vy: 0, spin: 0 };

      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.timeLeft = MATCH_TIME;
      this.state = 'start'; // start | playing | goal | fulltime
      this.celebrateTimer = 0;
      this.lastGoalSide = null;

      this.keys = {};
      this.resize();
      window.addEventListener('resize', () => this.resize());

      this.setupInput();
      document.getElementById('start-btn').addEventListener('click', () => this.startMatch());
      document.getElementById('restart-btn').addEventListener('click', () => this.startMatch());

      this.lastTime = performance.now();
      requestAnimationFrame((t) => this.loop(t));
    }

    // ---- Setup ----

    resize() {
      const dpr = window.devicePixelRatio || 1;
      const cssW = window.innerWidth;
      const cssH = window.innerHeight;
      this.canvas.style.width = cssW + 'px';
      this.canvas.style.height = cssH + 'px';
      this.canvas.width = Math.round(cssW * dpr);
      this.canvas.height = Math.round(cssH * dpr);

      const scale = Math.min(cssW / WIDTH, cssH / HEIGHT);
      const offsetX = (cssW - WIDTH * scale) / 2;
      const offsetY = (cssH - HEIGHT * scale) / 2;
      this.dpr = dpr;
      this.fieldTransform = [dpr * scale, 0, 0, dpr * scale, dpr * offsetX, dpr * offsetY];
    }

    setupInput() {
      const movementCodes = new Set(['KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight', 'KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'Space']);
      window.addEventListener('keydown', (e) => {
        if (movementCodes.has(e.code)) e.preventDefault();
        if (e.repeat) return;
        this.keys[e.code] = true;
        if (this.state !== 'playing') return;
        if (e.code === 'KeyW' || e.code === 'ArrowUp') this.p1.jump();
        if (e.code === 'KeyS' || e.code === 'ArrowDown' || e.code === 'Space') this.p1.kick();
      });
      window.addEventListener('keyup', (e) => {
        this.keys[e.code] = false;
      });

      const bind = (action, onPress) => {
        const el = document.querySelector(`[data-action="${action}"]`);
        if (!el) return;
        el.addEventListener('pointerdown', (e) => {
          e.preventDefault();
          this.keys[action] = true;
          if (onPress) onPress();
        });
        const release = () => { this.keys[action] = false; };
        el.addEventListener('pointerup', release);
        el.addEventListener('pointercancel', release);
        el.addEventListener('pointerleave', release);
      };
      bind('p1-left'); bind('p1-right');
      bind('p1-jump', () => this.state === 'playing' && this.p1.jump());
      bind('p1-kick', () => this.state === 'playing' && this.p1.kick());
    }

    startMatch() {
      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.timeLeft = MATCH_TIME;
      this.updateScoreHud();
      this.p1.reset();
      this.p2.reset();
      this.resetBall(null);
      this.state = 'playing';
      this.startOverlay.classList.add('hidden');
      this.fulltimeOverlay.classList.add('hidden');
      this.goalBanner.classList.add('hidden');
    }

    resetBall(scoredSide) {
      this.ball.x = WIDTH / 2;
      this.ball.y = GROUND_Y - BALL_R - 120;
      this.ball.vx = 0;
      this.ball.vy = 0;
      this.p1.reset();
      this.p2.reset();
    }

    updateScoreHud() {
      this.scoreLeftEl.textContent = this.scoreLeft;
      this.scoreRightEl.textContent = this.scoreRight;
    }

    // ---- Loop ----

    loop(now) {
      let dt = (now - this.lastTime) / 1000;
      this.lastTime = now;
      dt = Math.min(dt, 1 / 30);

      if (this.state === 'playing') this.update(dt);
      else if (this.state === 'goal') this.updateGoalPause(dt);

      this.render();
      requestAnimationFrame((t) => this.loop(t));
    }

    updateGoalPause(dt) {
      this.celebrateTimer -= dt;
      if (this.celebrateTimer <= 0) {
        this.goalBanner.classList.add('hidden');
        this.resetBall(this.lastGoalSide);
        this.state = 'playing';
      }
    }

    update(dt) {
      this.timeLeft -= dt;
      if (this.timeLeft <= 0) {
        this.timeLeft = 0;
        this.endMatch();
      }
      this.updateTimerHud();

      this.updatePlayerInput(dt);
      if (this.p2.isAI) this.updateAI(dt);

      this.updatePlayerPhysics(this.p1, dt);
      this.updatePlayerPhysics(this.p2, dt);
      this.resolvePlayerCollision();
      this.updateBallPhysics(dt);
      this.resolveBallPlayerCollision(this.p1, dt);
      this.resolveBallPlayerCollision(this.p2, dt);

      if (this.state === 'playing') this.checkGoal();
    }

    updateTimerHud() {
      const t = Math.ceil(this.timeLeft);
      const m = Math.floor(t / 60);
      const s = t % 60;
      this.timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    }

    updatePlayerInput(dt) {
      const p1 = this.p1;
      p1.vx = 0;
      if (this.keys['KeyA'] || this.keys['ArrowLeft'] || this.keys['p1-left']) { p1.vx -= MOVE_SPEED; p1.facing = -1; }
      if (this.keys['KeyD'] || this.keys['ArrowRight'] || this.keys['p1-right']) { p1.vx += MOVE_SPEED; p1.facing = 1; }
    }

    updateAI(dt) {
      const ai = this.p2;
      const ball = this.ball;
      ai.aiCooldown = Math.max(0, ai.aiCooldown - dt);

      const defendX = WIDTH * 0.72;
      const ballApproaching = ball.x > WIDTH * 0.45;
      const targetX = ballApproaching ? ball.x + 6 : defendX;
      const dx = targetX - ai.x;

      if (Math.abs(dx) > 8) {
        ai.vx = clamp(dx, -1, 1) * MOVE_SPEED;
        ai.facing = dx > 0 ? 1 : -1;
      } else {
        ai.vx = 0;
      }

      const distToBall = Math.hypot(ball.x - ai.x, ball.y - ai.y);
      if (ai.onGround && ball.y < ai.y - 10 && Math.abs(ball.x - ai.x) < 60 && ai.aiCooldown === 0) {
        ai.jump();
      }
      if (distToBall < KICK_RANGE + 10 && ai.aiCooldown === 0) {
        ai.kick();
        ai.aiCooldown = 0.5;
      }
    }

    updatePlayerPhysics(p, dt) {
      p.x += p.vx * dt;
      p.x = clamp(p.x, PLAYER_R, WIDTH - PLAYER_R);

      p.vy += GRAVITY * dt;
      p.y += p.vy * dt;
      if (p.y >= GROUND_Y - PLAYER_R) {
        p.y = GROUND_Y - PLAYER_R;
        p.vy = 0;
        p.onGround = true;
      } else {
        p.onGround = false;
      }

      if (p.kickTimer > 0) p.kickTimer -= dt;
    }

    resolvePlayerCollision() {
      const a = this.p1, b = this.p2;
      const minDist = PLAYER_R * 1.7;
      const dx = b.x - a.x;
      const dist = Math.abs(dx) || 0.001;
      if (dist < minDist) {
        const push = (minDist - dist) / 2;
        const dir = dx > 0 ? 1 : -1;
        a.x = clamp(a.x - push * dir, PLAYER_R, WIDTH - PLAYER_R);
        b.x = clamp(b.x + push * dir, PLAYER_R, WIDTH - PLAYER_R);
      }
    }

    updateBallPhysics(dt) {
      const b = this.ball;
      b.vy += GRAVITY * dt;
      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // Ground
      if (b.y + BALL_R > GROUND_Y) {
        b.y = GROUND_Y - BALL_R;
        b.vy = -b.vy * GROUND_BOUNCE;
        b.vx = damp(b.vx, 0.85, dt);
        if (Math.abs(b.vy) < 40) b.vy = 0;
      }
      // Ceiling
      if (b.y - BALL_R < 0) {
        b.y = BALL_R;
        b.vy = -b.vy * WALL_BOUNCE;
      }

      // Rolling air drag
      b.vx = damp(b.vx, 0.995, dt);
      b.spin += b.vx * dt * 0.02;

      // Side walls / goal frame plane
      if (b.x - BALL_R < GOAL_LINE_LEFT) {
        if (b.y + BALL_R > MOUTH_TOP) {
          if (this.state === 'playing') this.scoreGoal('right');
        } else {
          b.x = GOAL_LINE_LEFT + BALL_R;
          b.vx = -b.vx * WALL_BOUNCE;
        }
      }
      if (b.x + BALL_R > GOAL_LINE_RIGHT) {
        if (b.y + BALL_R > MOUTH_TOP) {
          if (this.state === 'playing') this.scoreGoal('left');
        } else {
          b.x = GOAL_LINE_RIGHT - BALL_R;
          b.vx = -b.vx * WALL_BOUNCE;
        }
      }
    }

    resolveBallPlayerCollision(p, dt) {
      const b = this.ball;
      const dx = b.x - p.x;
      const dy = b.y - p.y;
      const dist = Math.hypot(dx, dy) || 0.001;
      const bodyDist = PLAYER_R + BALL_R;
      const kicking = p.kickTimer > 0;
      // A kick reaches further than a plain header/body bump, matching the
      // outstretched leg drawn in drawPlayer() — otherwise the foot visibly
      // touches the ball while the kick never registers.
      const range = kicking ? KICK_RANGE : bodyDist;

      if (dist >= range) {
        if (!kicking) p.kickApplied = false;
        return;
      }

      const nx = dx / dist, ny = dy / dist;
      if (dist < bodyDist) {
        b.x = p.x + nx * bodyDist;
        b.y = p.y + ny * bodyDist;
      }

      if (kicking) {
        if (!p.kickApplied) {
          b.vx = nx * KICK_POWER + p.vx * 0.4;
          b.vy = ny * KICK_POWER + KICK_LIFT;
          p.kickApplied = true;
        }
      } else {
        const relSpeed = Math.hypot(p.vx, p.vy);
        const power = Math.max(BUMP_POWER * 0.4, relSpeed * 1.1);
        b.vx = nx * power + p.vx * 0.5;
        b.vy = ny * power - 60;
      }
    }

    checkGoal() {
      // scoreGoal() is invoked from updateBallPhysics when the ball crosses
      // a goal line; nothing to poll here, kept for clarity of the update() order.
    }

    scoreGoal(scoringSide) {
      if (scoringSide === 'left') this.scoreLeft++;
      else this.scoreRight++;
      this.updateScoreHud();
      this.lastGoalSide = scoringSide;
      this.state = 'goal';
      this.celebrateTimer = GOAL_CELEBRATE_TIME;
      this.goalBanner.classList.remove('hidden');
    }

    endMatch() {
      this.state = 'fulltime';
      let title = "IT'S A DRAW";
      if (this.scoreLeft > this.scoreRight) title = 'YOU WIN!';
      else if (this.scoreRight > this.scoreLeft) title = 'CPU WINS';
      this.fulltimeTitle.textContent = title;
      this.fulltimeScore.textContent = `${this.scoreLeft} - ${this.scoreRight}`;
      this.fulltimeOverlay.classList.remove('hidden');
    }

    // ---- Render ----

    render() {
      const ctx = this.ctx;
      const dpr = this.dpr;

      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.fillStyle = '#0e2916';
      ctx.fillRect(0, 0, this.canvas.width / dpr, this.canvas.height / dpr);

      ctx.setTransform(...this.fieldTransform);
      ctx.clearRect(-4, -4, WIDTH + 8, HEIGHT + 8);

      this.drawBackground(ctx);
      this.drawPitch(ctx);
      this.drawGoal(ctx, 'left');
      this.drawGoal(ctx, 'right');
      this.drawPlayer(ctx, this.p1);
      this.drawPlayer(ctx, this.p2);
      this.drawBall(ctx);
    }

    drawBackground(ctx) {
      const sky = ctx.createLinearGradient(0, 0, 0, MOUTH_TOP - 40);
      sky.addColorStop(0, '#1c3f57');
      sky.addColorStop(1, '#2c6b4a');
      ctx.fillStyle = sky;
      ctx.fillRect(0, 0, WIDTH, MOUTH_TOP - 20);

      // Crowd dots
      ctx.fillStyle = 'rgba(255,255,255,0.08)';
      for (let i = 0; i < 40; i++) {
        const x = (i * 47) % WIDTH;
        const y = 30 + ((i * 31) % 60);
        ctx.beginPath();
        ctx.arc(x, y, 3, 0, Math.PI * 2);
        ctx.fill();
      }
      // Floodlights
      ctx.fillStyle = 'rgba(255, 240, 200, 0.5)';
      [90, WIDTH - 90].forEach((x) => {
        ctx.beginPath();
        ctx.arc(x, 14, 8, 0, Math.PI * 2);
        ctx.fill();
      });
    }

    drawPitch(ctx) {
      const pitchTop = MOUTH_TOP - 20;
      const stripeCount = 10;
      const stripeW = WIDTH / stripeCount;
      for (let i = 0; i < stripeCount; i++) {
        ctx.fillStyle = i % 2 === 0 ? '#2f9450' : '#2a8a49';
        ctx.fillRect(i * stripeW, pitchTop, stripeW, HEIGHT - pitchTop);
      }

      ctx.strokeStyle = 'rgba(255,255,255,0.55)';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(WIDTH / 2, pitchTop);
      ctx.lineTo(WIDTH / 2, HEIGHT);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(WIDTH / 2, GROUND_Y, 55, Math.PI, Math.PI * 2);
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(0, GROUND_Y);
      ctx.lineTo(WIDTH, GROUND_Y);
      ctx.stroke();
    }

    drawGoal(ctx, side) {
      const isLeft = side === 'left';
      const postX = isLeft ? GOAL_WIDTH : WIDTH - GOAL_WIDTH;
      const backX = isLeft ? 0 : WIDTH;

      // Net crosshatch
      ctx.strokeStyle = 'rgba(255,255,255,0.35)';
      ctx.lineWidth = 1;
      const step = 10;
      ctx.beginPath();
      for (let x = Math.min(backX, postX); x <= Math.max(backX, postX); x += step) {
        ctx.moveTo(x, MOUTH_TOP);
        ctx.lineTo(x, GROUND_Y);
      }
      for (let y = MOUTH_TOP; y <= GROUND_Y; y += step) {
        ctx.moveTo(backX, y);
        ctx.lineTo(postX, y);
      }
      ctx.stroke();

      // Frame
      ctx.strokeStyle = '#f2f2f2';
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.moveTo(backX, GROUND_Y);
      ctx.lineTo(backX, MOUTH_TOP);
      ctx.lineTo(postX, MOUTH_TOP);
      ctx.stroke();
      ctx.lineWidth = 4;
      ctx.beginPath();
      ctx.moveTo(postX, MOUTH_TOP);
      ctx.lineTo(postX, GROUND_Y);
      ctx.stroke();
    }

    drawPlayer(ctx, p) {
      const bodyY = p.y + PLAYER_R * 0.55;
      const shadowScale = 1 - clamp((GROUND_Y - (p.y + PLAYER_R)) / 200, 0, 0.5);

      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(p.x, GROUND_Y + 4, PLAYER_R * 0.8 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Legs — always drawn a short, fixed length relative to the body
      // (not to GROUND_Y), so they stay tucked-looking in the air instead
      // of stretching into a long diagonal as the body rises on a jump.
      const bodyBottom = bodyY + 10;
      const kicking = p.kickTimer > 0;
      const standLen = p.onGround ? 13 : 9;
      const backX = p.x - p.facing * 6;
      const frontX = p.x + p.facing * 6;

      ctx.strokeStyle = '#2b2b2b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';

      // Back (support) leg
      ctx.beginPath();
      ctx.moveTo(backX, bodyBottom);
      ctx.lineTo(backX - p.facing * 2, bodyBottom + standLen);
      ctx.stroke();

      // Front (kicking) leg — swings forward and up while kicking
      ctx.beginPath();
      ctx.moveTo(frontX, bodyBottom);
      if (kicking) {
        ctx.lineTo(frontX + p.facing * 24, bodyBottom + standLen * 0.4);
      } else {
        ctx.lineTo(frontX + p.facing * 3, bodyBottom + standLen);
      }
      ctx.stroke();

      // Body (jersey)
      ctx.fillStyle = p.color;
      roundRectPath(ctx, p.x - PLAYER_R * 0.6, bodyY - 6, PLAYER_R * 1.2, PLAYER_R * 0.9, 10);
      ctx.fill();

      // Head
      ctx.fillStyle = '#f2b98a';
      ctx.beginPath();
      ctx.arc(p.x, p.y, PLAYER_R * 0.62, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Eyes (face the direction they're moving/facing)
      ctx.fillStyle = '#1a1a1a';
      const eyeX = p.x + p.facing * 6;
      ctx.beginPath();
      ctx.arc(eyeX, p.y - 2, 2.4, 0, Math.PI * 2);
      ctx.fill();
    }

    drawBall(ctx) {
      const b = this.ball;
      const shadowScale = 1 - clamp((GROUND_Y - (b.y + BALL_R)) / 200, 0, 0.6);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(b.x, GROUND_Y + 4, BALL_R * 0.9 * shadowScale, 5 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      ctx.save();
      ctx.translate(b.x, b.y);
      ctx.rotate(b.spin);
      ctx.fillStyle = '#f5f5f5';
      ctx.beginPath();
      ctx.arc(0, 0, BALL_R, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#222';
      ctx.lineWidth = 1.4;
      ctx.stroke();
      ctx.fillStyle = '#222';
      for (let i = 0; i < 5; i++) {
        const a = (Math.PI * 2 * i) / 5;
        ctx.beginPath();
        ctx.arc(Math.cos(a) * BALL_R * 0.5, Math.sin(a) * BALL_R * 0.5, 2.6, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.restore();
    }
  }

  new Game();
})();
