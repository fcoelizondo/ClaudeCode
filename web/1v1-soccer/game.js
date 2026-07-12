(() => {
  'use strict';

  // ---- Field & physics constants (logical pixels, tuned for this layout) ----
  const WIDTH = 960, HEIGHT = 540;
  const GROUND_Y = HEIGHT - 70;
  const GOAL_WIDTH = 88; // deep nets pull the goal lines toward midfield, Head Ball-style
  const GOAL_HEIGHT = 150;
  const GOAL_LINE_LEFT = GOAL_WIDTH;
  const GOAL_LINE_RIGHT = WIDTH - GOAL_WIDTH;
  const MOUTH_TOP = GROUND_Y - GOAL_HEIGHT;
  const POST_R = 5; // collision radius of the post/crossbar tip

  const PLAYER_R = 27;
  const BALL_R = 13;
  const GRAVITY = 2000;
  const MOVE_SPEED = 330;
  const MOVE_ACCEL = 2900; // ground acceleration
  const AIR_ACCEL = 1750;  // weaker steering while airborne
  const JUMP_V = -780;
  const GROUND_BOUNCE = 0.72;
  const WALL_BOUNCE = 0.68;
  const KICK_RANGE = PLAYER_R + BALL_R + 18;
  const KICK_POWER = 920;
  // Lift tuned so a midfield shot crosses the goal line roughly at
  // jump-block height: the defender can save it by timing a jump.
  const KICK_LIFT = -620;
  const KICK_DURATION = 0.18;
  const BALL_MAX_SPEED = 1350;
  const BUMP_POWER = 480;
  const MATCH_TIME = 90;
  const GOAL_CELEBRATE_TIME = 1.6;

  const clamp = (v, lo, hi) => Math.min(hi, Math.max(lo, v));
  const damp = (value, factor, dt) => value * Math.pow(factor, dt * 60);

  // Deterministic PRNG so the crowd looks the same every match.
  function mulberry32(a) {
    return function () {
      a |= 0; a = (a + 0x6D2B79F5) | 0;
      let t = Math.imul(a ^ (a >>> 15), 1 | a);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function roundRectPath(ctx, x, y, w, h, r) {
    ctx.beginPath();
    ctx.moveTo(x + r, y);
    ctx.arcTo(x + w, y, x + w, y + h, r);
    ctx.arcTo(x + w, y + h, x, y + h, r);
    ctx.arcTo(x, y + h, x, y, r);
    ctx.arcTo(x, y, x + w, y, r);
    ctx.closePath();
  }

  // Small synthesized sound effects — no audio assets needed. The
  // AudioContext is created lazily on the first user gesture, per
  // browser autoplay rules.
  class Sfx {
    ensure() {
      if (!this.ctx) {
        const AC = window.AudioContext || window.webkitAudioContext;
        if (AC) this.ctx = new AC();
      }
      if (this.ctx && this.ctx.state === 'suspended') this.ctx.resume();
    }
    tone(freq, dur, { type = 'sine', gain = 0.12, slideTo = 0, delay = 0 } = {}) {
      if (!this.ctx) return;
      const t0 = this.ctx.currentTime + delay;
      const o = this.ctx.createOscillator();
      const g = this.ctx.createGain();
      o.type = type;
      o.frequency.setValueAtTime(freq, t0);
      if (slideTo) o.frequency.exponentialRampToValueAtTime(slideTo, t0 + dur);
      g.gain.setValueAtTime(gain, t0);
      g.gain.exponentialRampToValueAtTime(0.001, t0 + dur);
      o.connect(g).connect(this.ctx.destination);
      o.start(t0);
      o.stop(t0 + dur + 0.02);
    }
    kick() { this.tone(150, 0.12, { type: 'triangle', gain: 0.22, slideTo: 55 }); }
    bounce() { this.tone(120, 0.08, { type: 'sine', gain: 0.07, slideTo: 70 }); }
    land() { this.tone(95, 0.06, { type: 'sine', gain: 0.05, slideTo: 60 }); }
    whistle(blasts = 1) {
      for (let i = 0; i < blasts; i++) {
        this.tone(2050, i === blasts - 1 ? 0.3 : 0.14, { type: 'square', gain: 0.045, delay: i * 0.22 });
      }
    }
    goal() {
      [523, 659, 784, 1047].forEach((f, i) =>
        this.tone(f, 0.2, { type: 'triangle', gain: 0.1, delay: i * 0.09 }));
    }
  }

  class Player {
    constructor(side, color, accent) {
      this.side = side; // 'left' | 'right'
      this.color = color;
      this.accent = accent; // headband / trim color
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
      this.runPhase = 0;
      this.stretch = 1; // squash & stretch scale, relaxes back to 1
      this.aiKickCd = 0;
      this.aiJumpCd = 0;
      this.aiWait = 0;
    }
    jump() {
      if (this.onGround) {
        this.vy = JUMP_V;
        this.onGround = false;
        this.stretch = 1.16;
      }
    }
    kick() {
      if (this.kickTimer <= 0) {
        this.kickTimer = KICK_DURATION;
        this.kickApplied = false;
      }
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

      this.p1 = new Player('left', '#3fa7ff', '#1c5f96');
      this.p2 = new Player('right', '#ff6b6b', '#9e3535');
      this.ball = { x: WIDTH / 2, y: GROUND_Y - BALL_R - 120, vx: 0, vy: 0, spin: 0 };

      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.timeLeft = MATCH_TIME;
      this.state = 'start'; // start | playing | goal | fulltime
      this.celebrateTimer = 0;

      this.fx = { particles: [], trail: [], shake: 0 };
      this.sfx = new Sfx();

      this.keys = {};
      this.buildBackground();
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
      this.cssW = cssW;
      this.cssH = cssH;

      const scale = Math.min(cssW / WIDTH, cssH / HEIGHT);
      const offsetX = (cssW - WIDTH * scale) / 2;
      const offsetY = (cssH - HEIGHT * scale) / 2;
      this.dpr = dpr;
      this.fieldTransform = [dpr * scale, 0, 0, dpr * scale, dpr * offsetX, dpr * offsetY];
    }

    setupInput() {
      const movementCodes = new Set(['KeyA', 'KeyD', 'ArrowLeft', 'ArrowRight', 'KeyW', 'ArrowUp', 'KeyS', 'ArrowDown', 'Space']);
      const wake = () => this.sfx.ensure();
      window.addEventListener('pointerdown', wake);
      window.addEventListener('keydown', wake);

      window.addEventListener('keydown', (e) => {
        if (movementCodes.has(e.code)) e.preventDefault();
        if (e.repeat) return;
        this.keys[e.code] = true;
        if (this.state !== 'playing' && this.state !== 'goal') return;
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
      const active = () => this.state === 'playing' || this.state === 'goal';
      bind('p1-left'); bind('p1-right');
      bind('p1-jump', () => active() && this.p1.jump());
      bind('p1-kick', () => active() && this.p1.kick());
    }

    startMatch() {
      this.scoreLeft = 0;
      this.scoreRight = 0;
      this.timeLeft = MATCH_TIME;
      this.updateScoreHud();
      this.resetPositions();
      this.state = 'playing';
      this.startOverlay.classList.add('hidden');
      this.fulltimeOverlay.classList.add('hidden');
      this.goalBanner.classList.add('hidden');
      this.sfx.ensure();
      this.sfx.whistle(1);
    }

    resetPositions() {
      this.ball.x = WIDTH / 2;
      this.ball.y = GROUND_Y - BALL_R - 120;
      this.ball.vx = 0;
      this.ball.vy = 0;
      this.ball.spin = 0;
      this.fx.trail.length = 0;
      this.p1.reset();
      this.p2.reset();
      // Kickoff fairness: the CPU has frame-perfect reactions, so give it
      // a short hesitation before it may charge the dropped ball, or it
      // wins every kickoff scramble.
      this.p2.aiWait = 0.55;
      this.p2.aiKickCd = 0.8;
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

      if (this.state === 'playing') {
        this.timeLeft -= dt;
        if (this.timeLeft <= 0) {
          this.timeLeft = 0;
          this.endMatch();
        }
        this.updateTimerHud();
        this.stepWorld(dt);
      } else if (this.state === 'goal') {
        // Keep the world simulating during the celebration so the ball
        // settles into the net and players stay controllable; scoring is
        // gated on state === 'playing' so nothing double-counts.
        this.celebrateTimer -= dt;
        this.stepWorld(dt);
        if (this.celebrateTimer <= 0) {
          this.goalBanner.classList.add('hidden');
          this.resetPositions();
          this.state = 'playing';
          this.sfx.whistle(1);
        }
      }

      this.updateFx(dt);
      this.render();
      requestAnimationFrame((t) => this.loop(t));
    }

    stepWorld(dt) {
      this.updatePlayerInput(dt);
      this.updateAI(dt);
      this.updatePlayerPhysics(this.p1, dt);
      this.updatePlayerPhysics(this.p2, dt);
      this.resolvePlayerCollision();

      // Substep the ball so a fast shot can't tunnel through a player
      // between frames (~10px of travel per substep), and resolve the
      // player pair twice per substep so being pushed out of one body
      // in a scrum can't shove the ball straight through the other.
      const speed = Math.hypot(this.ball.vx, this.ball.vy);
      const steps = clamp(Math.ceil((speed * dt) / 10), 1, 6);
      const h = dt / steps;
      for (let i = 0; i < steps; i++) {
        this.updateBallPhysics(h);
        for (let k = 0; k < 2; k++) {
          this.resolveBallPlayerCollision(this.p1, h);
          this.resolveBallPlayerCollision(this.p2, h);
        }
      }
      this.updateTrail();
    }

    updateTimerHud() {
      const t = Math.ceil(this.timeLeft);
      const m = Math.floor(t / 60);
      const s = t % 60;
      this.timerEl.textContent = `${m}:${s.toString().padStart(2, '0')}`;
    }

    // Momentum-based steering shared by the player and the CPU: quick to
    // accelerate, with friction when no direction is held.
    steer(p, dir, dt, maxSpeed = MOVE_SPEED) {
      if (dir !== 0) {
        const accel = p.onGround ? MOVE_ACCEL : AIR_ACCEL;
        p.vx = clamp(p.vx + dir * accel * dt, -maxSpeed, maxSpeed);
        p.facing = dir > 0 ? 1 : -1;
      } else {
        p.vx = damp(p.vx, p.onGround ? 0.7 : 0.93, dt);
        if (Math.abs(p.vx) < 8) p.vx = 0;
      }
    }

    updatePlayerInput(dt) {
      let dir = 0;
      if (this.keys['KeyA'] || this.keys['ArrowLeft'] || this.keys['p1-left']) dir -= 1;
      if (this.keys['KeyD'] || this.keys['ArrowRight'] || this.keys['p1-right']) dir += 1;
      this.steer(this.p1, dir, dt);
    }

    updateAI(dt) {
      const ai = this.p2;
      const ball = this.ball;
      ai.aiKickCd = Math.max(0, ai.aiKickCd - dt);
      ai.aiJumpCd = Math.max(0, ai.aiJumpCd - dt);

      // During the kickoff hesitation, drift home instead of attacking.
      if (ai.aiWait > 0) {
        ai.aiWait -= dt;
        const homeDx = WIDTH * 0.75 - ai.x;
        this.steer(ai, Math.abs(homeDx) > 12 ? Math.sign(homeDx) : 0, dt, MOVE_SPEED * 0.7);
        return;
      }

      // Rubber-band difficulty: the CPU speeds up when trailing and eases
      // off when comfortably ahead, so matches stay close.
      const diff = clamp(this.scoreLeft - this.scoreRight, -2, 2);
      const speed = MOVE_SPEED * (0.9 + 0.045 * diff);

      // Lead the ball slightly so the CPU meets it instead of chasing it.
      const lead = ball.x + ball.vx * 0.22;
      const attacking = lead > WIDTH * 0.42 || ball.vx > 80;
      // When attacking, stand slightly goal-side of the ball so kicks
      // send it left; when defending, hold a lane between ball and goal.
      const target = attacking
        ? lead + 14
        : clamp(lead + 120, WIDTH * 0.6, GOAL_LINE_RIGHT - 50);

      const dx = target - ai.x;
      this.steer(ai, Math.abs(dx) > 10 ? Math.sign(dx) : 0, dt, speed);

      if (ai.aiJumpCd === 0 && ai.onGround &&
          ball.y < ai.y - 24 && ball.vy > -60 && Math.abs(ball.x - ai.x) < 72) {
        ai.jump();
        ai.aiJumpCd = 0.6;
      }
      // The CPU kicks on a slower cadence than a human can, so timed
      // kicks and jump kicks win contested scrambles more often than not.
      const distToBall = Math.hypot(ball.x - ai.x, ball.y - ai.y);
      if (distToBall < KICK_RANGE - 4 && ai.aiKickCd === 0) {
        ai.kick();
        ai.aiKickCd = 0.6;
      }
    }

    updatePlayerPhysics(p, dt) {
      p.x += p.vx * dt;
      // Players stop at the goal lines — they can guard the line like a
      // keeper but not run inside the net.
      p.x = clamp(p.x, GOAL_LINE_LEFT, GOAL_LINE_RIGHT);

      const wasAirborne = !p.onGround;
      p.vy += GRAVITY * dt;
      p.y += p.vy * dt;
      if (p.y >= GROUND_Y - PLAYER_R) {
        p.y = GROUND_Y - PLAYER_R;
        if (wasAirborne && p.vy > 300) {
          p.stretch = 0.85;
          this.spawnDust(p.x, GROUND_Y, 6);
          this.sfx.land();
        }
        p.vy = 0;
        p.onGround = true;
      } else {
        p.onGround = false;
      }

      if (p.onGround && Math.abs(p.vx) > 20) p.runPhase += Math.abs(p.vx) * dt * 0.06;
      p.stretch += (1 - p.stretch) * Math.min(1, dt * 10);
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
        a.x = clamp(a.x - push * dir, GOAL_LINE_LEFT, GOAL_LINE_RIGHT);
        b.x = clamp(b.x + push * dir, GOAL_LINE_LEFT, GOAL_LINE_RIGHT);
      }
    }

    updateBallPhysics(dt) {
      const b = this.ball;
      b.vy += GRAVITY * dt;

      const speed = Math.hypot(b.vx, b.vy);
      if (speed > BALL_MAX_SPEED) {
        b.vx *= BALL_MAX_SPEED / speed;
        b.vy *= BALL_MAX_SPEED / speed;
      }

      b.x += b.vx * dt;
      b.y += b.vy * dt;

      // Ground
      if (b.y + BALL_R > GROUND_Y) {
        b.y = GROUND_Y - BALL_R;
        if (b.vy > 250) this.sfx.bounce();
        b.vy = -b.vy * GROUND_BOUNCE;
        b.vx = damp(b.vx, 0.85, dt);
        if (Math.abs(b.vy) < 40) b.vy = 0;
      }
      // Ceiling
      if (b.y - BALL_R < 0) {
        b.y = BALL_R;
        b.vy = -b.vy * WALL_BOUNCE;
      }

      // Air drag + visual spin
      b.vx = damp(b.vx, 0.995, dt);
      b.spin += b.vx * dt * 0.025;

      // Post/crossbar tips — shots can rattle off the bar.
      this.collidePostTip(GOAL_LINE_LEFT, MOUTH_TOP);
      this.collidePostTip(GOAL_LINE_RIGHT, MOUTH_TOP);

      // Goal planes: above the mouth the post line is a wall; below it,
      // crossing the line is a goal.
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

      // Outer world bounds (the back of each net) so a scored ball
      // bounces around inside the goal during the celebration.
      if (b.x - BALL_R < 0) { b.x = BALL_R; b.vx = -b.vx * WALL_BOUNCE; }
      if (b.x + BALL_R > WIDTH) { b.x = WIDTH - BALL_R; b.vx = -b.vx * WALL_BOUNCE; }
    }

    // Sampled once per frame (not per substep) so trail spacing stays even.
    updateTrail() {
      const b = this.ball;
      const sp = Math.hypot(b.vx, b.vy);
      if (sp > 480) {
        this.fx.trail.unshift({ x: b.x, y: b.y });
        if (this.fx.trail.length > 9) this.fx.trail.pop();
      } else if (this.fx.trail.length) {
        this.fx.trail.pop();
      }
    }

    collidePostTip(px, py) {
      const b = this.ball;
      const dx = b.x - px, dy = b.y - py;
      const dist = Math.hypot(dx, dy) || 0.001;
      const minDist = BALL_R + POST_R;
      if (dist < minDist) {
        const nx = dx / dist, ny = dy / dist;
        b.x = px + nx * minDist;
        b.y = py + ny * minDist;
        const dot = b.vx * nx + b.vy * ny;
        if (dot < 0) {
          b.vx -= (1 + WALL_BOUNCE) * dot * nx;
          b.vy -= (1 + WALL_BOUNCE) * dot * ny;
          this.sfx.bounce();
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
      // outstretched leg drawn in drawPlayer().
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
          // Kicks are aimed: mostly toward the opponent's goal, with some
          // contact-angle influence, and extra lift on jump kicks.
          const dirSign = p === this.p1 ? 1 : -1;
          const lift = p.onGround ? KICK_LIFT : KICK_LIFT * 1.2;
          b.vx = dirSign * KICK_POWER * 0.72 + nx * KICK_POWER * 0.28 + p.vx * 0.35;
          // Small contact-angle influence only: a ball on the ground has a
          // downward-pointing normal that would otherwise flatten the arc.
          b.vy = lift + ny * KICK_POWER * 0.18;
          p.kickApplied = true;
          this.spawnSpark(b.x, b.y);
          this.addShake(4);
          this.sfx.kick();
        }
      } else {
        const relSpeed = Math.hypot(p.vx, p.vy);
        const power = Math.max(BUMP_POWER * 0.4, relSpeed * 1.1);
        b.vx = nx * power + p.vx * 0.5;
        b.vy = ny * power - 60;
      }
    }

    scoreGoal(scoringSide) {
      if (scoringSide === 'left') this.scoreLeft++;
      else this.scoreRight++;
      this.updateScoreHud();
      this.state = 'goal';
      this.celebrateTimer = GOAL_CELEBRATE_TIME;
      this.goalBanner.classList.remove('hidden');

      const mouthX = scoringSide === 'left'
        ? (GOAL_LINE_RIGHT + WIDTH) / 2
        : GOAL_LINE_LEFT / 2;
      this.spawnConfetti(mouthX, MOUTH_TOP + 30);
      this.addShake(9);
      this.sfx.goal();
    }

    endMatch() {
      this.state = 'fulltime';
      let title = "IT'S A DRAW";
      if (this.scoreLeft > this.scoreRight) title = 'YOU WIN!';
      else if (this.scoreRight > this.scoreLeft) title = 'CPU WINS';
      this.fulltimeTitle.textContent = title;
      this.fulltimeScore.textContent = `${this.scoreLeft} - ${this.scoreRight}`;
      this.fulltimeOverlay.classList.remove('hidden');
      this.sfx.whistle(3);
    }

    // ---- Effects ----

    addShake(m) { this.fx.shake = Math.max(this.fx.shake, m); }

    spawnDust(x, y, n) {
      for (let i = 0; i < n; i++) {
        this.fx.particles.push({
          x: x + (Math.random() - 0.5) * 24, y: y - Math.random() * 6,
          vx: (Math.random() - 0.5) * 90, vy: -20 - Math.random() * 55,
          g: -40, life: 0.35, max: 0.35,
          size: 2 + Math.random() * 2.5, color: 'rgba(235,240,235,0.55)', shape: 'dot',
        });
      }
    }

    spawnSpark(x, y) {
      for (let i = 0; i < 10; i++) {
        const a = Math.random() * Math.PI * 2;
        const sp = 60 + Math.random() * 260;
        this.fx.particles.push({
          x, y, vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40,
          g: 300, life: 0.3, max: 0.3,
          size: 1.5 + Math.random() * 2, color: i % 2 ? '#ffd23f' : '#ffffff', shape: 'dot',
        });
      }
    }

    spawnConfetti(x, y) {
      const colors = ['#ffd23f', '#ff6b6b', '#5cc7ff', '#7bd88a', '#ff9ff3', '#ffffff'];
      for (let i = 0; i < 40; i++) {
        this.fx.particles.push({
          x: x + (Math.random() - 0.5) * 50, y: y + (Math.random() - 0.5) * 30,
          vx: (Math.random() - 0.5) * 480, vy: -140 - Math.random() * 300,
          g: 540, life: 0.9 + Math.random() * 0.7, max: 1.4,
          size: 3 + Math.random() * 3.5,
          color: colors[(Math.random() * colors.length) | 0], shape: 'rect',
          rot: Math.random() * Math.PI, vr: (Math.random() - 0.5) * 12,
        });
      }
    }

    updateFx(dt) {
      this.fx.shake = damp(this.fx.shake, 0.82, dt);
      const ps = this.fx.particles;
      for (let i = ps.length - 1; i >= 0; i--) {
        const p = ps[i];
        p.vy += p.g * dt;
        p.x += p.vx * dt;
        p.y += p.vy * dt;
        if (p.vr) p.rot += p.vr * dt;
        p.life -= dt;
        if (p.life <= 0) ps.splice(i, 1);
      }
    }

    // ---- Render ----

    // All static scenery (sky, stands, crowd, ad boards, pitch, goals) is
    // drawn once to an offscreen canvas and blitted each frame — the crowd
    // alone is hundreds of dots that would be wasteful to redraw at 60fps.
    buildBackground() {
      const c = document.createElement('canvas');
      c.width = WIDTH * 2;
      c.height = HEIGHT * 2;
      const g = c.getContext('2d');
      g.scale(2, 2);

      const PITCH_TOP = MOUTH_TOP - 20;
      const AD_TOP = PITCH_TOP - 18;
      const STAND_TOP = 170;

      // Dusk sky
      const sky = g.createLinearGradient(0, 0, 0, AD_TOP);
      sky.addColorStop(0, '#101f33');
      sky.addColorStop(0.7, '#1e4152');
      sky.addColorStop(1, '#27584d');
      g.fillStyle = sky;
      g.fillRect(0, 0, WIDTH, AD_TOP);

      // Distant skyline silhouette behind the stand roof
      const rnd = mulberry32(7);
      g.fillStyle = '#0d1a2b';
      let sx = 0;
      while (sx < WIDTH) {
        const w = 30 + rnd() * 60;
        const h = 10 + rnd() * 26;
        g.fillRect(sx, STAND_TOP - h, w, h);
        sx += w + 4;
      }

      // Floodlight towers
      [90, WIDTH - 90].forEach((x) => {
        g.strokeStyle = '#31465c';
        g.lineWidth = 5;
        g.beginPath();
        g.moveTo(x, STAND_TOP);
        g.lineTo(x, 46);
        g.stroke();
        g.fillStyle = '#31465c';
        g.fillRect(x - 26, 30, 52, 16);
        const glow = g.createRadialGradient(x, 38, 4, x, 38, 60);
        glow.addColorStop(0, 'rgba(255,244,200,0.55)');
        glow.addColorStop(1, 'rgba(255,244,200,0)');
        g.fillStyle = glow;
        g.fillRect(x - 60, -10, 120, 110);
        g.fillStyle = '#ffe9a8';
        for (let i = 0; i < 3; i++) g.fillRect(x - 20 + i * 16, 34, 8, 8);
      });

      // Stand structure + roof edge
      g.fillStyle = '#22364d';
      g.fillRect(0, STAND_TOP, WIDTH, AD_TOP - STAND_TOP);
      g.fillStyle = 'rgba(255,255,255,0.5)';
      g.fillRect(0, STAND_TOP, WIDTH, 3);

      // Crowd — deterministic scatter of shirt-colored dots
      const shirts = ['#d84f4f', '#4f7fd8', '#e8c34f', '#57b06a', '#c9c9c9', '#b46ad4'];
      for (let row = 0; row < 8; row++) {
        const y = STAND_TOP + 14 + row * 12;
        for (let col = 0; col < 62; col++) {
          const x = 8 + col * 15.5 + (row % 2 ? 7 : 0) + (rnd() - 0.5) * 5;
          g.fillStyle = shirts[(rnd() * shirts.length) | 0];
          g.globalAlpha = 0.55 + rnd() * 0.35;
          g.beginPath();
          g.arc(x, y + (rnd() - 0.5) * 3, 2.6, 0, Math.PI * 2);
          g.fill();
        }
      }
      g.globalAlpha = 1;
      // Soften the lower stands so the ad boards pop
      const standShade = g.createLinearGradient(0, AD_TOP - 40, 0, AD_TOP);
      standShade.addColorStop(0, 'rgba(13,22,35,0)');
      standShade.addColorStop(1, 'rgba(13,22,35,0.55)');
      g.fillStyle = standShade;
      g.fillRect(0, AD_TOP - 40, WIDTH, 40);

      // Ad boards
      g.fillStyle = '#152a42';
      g.fillRect(0, AD_TOP, WIDTH, PITCH_TOP - AD_TOP);
      g.fillStyle = 'rgba(255,255,255,0.4)';
      g.fillRect(0, AD_TOP, WIDTH, 2);
      g.fillStyle = 'rgba(255,255,255,0.55)';
      g.font = 'bold 10px -apple-system, "Segoe UI", sans-serif';
      g.textBaseline = 'middle';
      const slogans = ['1V1 SOCCER', 'GOOOAL!'];
      for (let x = 20, i = 0; x < WIDTH; x += 130, i++) {
        g.fillText(slogans[i % 2], x, AD_TOP + (PITCH_TOP - AD_TOP) / 2 + 1);
      }

      // Pitch: mowing stripes
      const stripeCount = 10;
      const stripeW = WIDTH / stripeCount;
      for (let i = 0; i < stripeCount; i++) {
        g.fillStyle = i % 2 === 0 ? '#2f9450' : '#2a8a49';
        g.fillRect(i * stripeW, PITCH_TOP, stripeW, HEIGHT - PITCH_TOP);
      }

      // Pitch markings
      g.strokeStyle = 'rgba(255,255,255,0.55)';
      g.lineWidth = 2;
      g.beginPath();
      g.moveTo(WIDTH / 2, PITCH_TOP);
      g.lineTo(WIDTH / 2, HEIGHT);
      g.stroke();
      g.beginPath();
      g.arc(WIDTH / 2, GROUND_Y, 55, Math.PI, Math.PI * 2);
      g.stroke();
      g.beginPath();
      g.arc(GOAL_LINE_LEFT, GROUND_Y, 95, Math.PI * 1.5, Math.PI * 2);
      g.stroke();
      g.beginPath();
      g.arc(GOAL_LINE_RIGHT, GROUND_Y, 95, Math.PI, Math.PI * 1.5);
      g.stroke();
      g.beginPath();
      g.moveTo(0, GROUND_Y);
      g.lineTo(WIDTH, GROUND_Y);
      g.stroke();

      this.drawGoal(g, 'left');
      this.drawGoal(g, 'right');

      this.bg = c;
    }

    render() {
      const ctx = this.ctx;
      ctx.setTransform(this.dpr, 0, 0, this.dpr, 0, 0);
      ctx.fillStyle = '#0e2916';
      ctx.fillRect(0, 0, this.cssW, this.cssH);

      const tf = this.fieldTransform.slice();
      if (this.fx.shake > 0.2) {
        tf[4] += (Math.random() * 2 - 1) * this.fx.shake * tf[0];
        tf[5] += (Math.random() * 2 - 1) * this.fx.shake * tf[3];
      }
      ctx.setTransform(...tf);

      ctx.drawImage(this.bg, 0, 0, WIDTH, HEIGHT);
      this.drawTrail(ctx);
      this.drawPlayer(ctx, this.p1);
      this.drawPlayer(ctx, this.p2);
      this.drawBall(ctx);
      this.drawParticles(ctx);
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
      const shadowScale = 1 - clamp((GROUND_Y - (p.y + PLAYER_R)) / 200, 0, 0.5);
      ctx.fillStyle = 'rgba(0,0,0,0.25)';
      ctx.beginPath();
      ctx.ellipse(p.x, GROUND_Y + 4, PLAYER_R * 0.8 * shadowScale, 7 * shadowScale, 0, 0, Math.PI * 2);
      ctx.fill();

      // Squash & stretch around the feet: roughly volume-preserving so
      // jumps look springy and landings look weighty.
      const sYs = p.stretch;
      const sXs = 1 + (1 - sYs) * 0.6;
      const ax = p.x, ay = p.y + PLAYER_R;
      ctx.save();
      ctx.translate(ax, ay);
      ctx.scale(sXs, sYs);
      ctx.translate(-ax, -ay);

      const bodyY = p.y + PLAYER_R * 0.55;
      const bodyBottom = bodyY + 10;
      const kicking = p.kickTimer > 0;
      // 0→1→0 swing over the kick so the leg snaps out and returns.
      const kickExt = kicking ? Math.sin((1 - p.kickTimer / KICK_DURATION) * Math.PI) : 0;
      const runAmp = Math.min(1, Math.abs(p.vx) / MOVE_SPEED) * 7;
      const swing = p.onGround ? Math.sin(p.runPhase) * runAmp : 0;
      const legLen = p.onGround ? 14 : 10;

      const skin = '#f2b98a';
      const hipBack = p.x - p.facing * 6;
      const hipFront = p.x + p.facing * 6;
      const backFootX = hipBack + p.facing * (-2 - swing);
      const backFootY = bodyBottom + legLen;
      const frontFootX = kicking
        ? hipFront + p.facing * (6 + kickExt * 22)
        : hipFront + p.facing * (2 + swing);
      const frontFootY = kicking
        ? bodyBottom + legLen * (1 - kickExt * 0.6)
        : bodyBottom + legLen;

      // Legs
      ctx.strokeStyle = '#2b2b2b';
      ctx.lineWidth = 8;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.moveTo(hipBack, bodyBottom);
      ctx.lineTo(backFootX, backFootY);
      ctx.moveTo(hipFront, bodyBottom);
      ctx.lineTo(frontFootX, frontFootY);
      ctx.stroke();

      // Cleats
      ctx.fillStyle = '#1a1a1a';
      roundRectPath(ctx, backFootX - 5 + p.facing, backFootY - 3, 11, 6, 3);
      ctx.fill();
      roundRectPath(ctx, frontFootX - 5 + p.facing * 2, frontFootY - 3, 11, 6, 3);
      ctx.fill();

      // Back arm (behind the jersey)
      const armSwing = -swing * 0.9;
      const shoulderY = p.y + PLAYER_R * 0.45;
      ctx.strokeStyle = skin;
      ctx.lineWidth = 6;
      ctx.beginPath();
      ctx.moveTo(p.x - p.facing * 9, shoulderY);
      ctx.lineTo(p.x - p.facing * (11 + armSwing), shoulderY + 13);
      ctx.stroke();

      // Body (jersey) with a trim stripe
      ctx.fillStyle = p.color;
      roundRectPath(ctx, p.x - PLAYER_R * 0.6, bodyY - 6, PLAYER_R * 1.2, PLAYER_R * 0.9, 10);
      ctx.fill();
      ctx.fillStyle = 'rgba(255,255,255,0.35)';
      ctx.fillRect(p.x - PLAYER_R * 0.6 + 3, bodyY + 2, PLAYER_R * 1.2 - 6, 3);

      // Front arm
      ctx.strokeStyle = skin;
      ctx.beginPath();
      ctx.moveTo(p.x + p.facing * 9, shoulderY);
      ctx.lineTo(p.x + p.facing * (11 - armSwing), shoulderY + 13);
      ctx.stroke();

      // Head — oversized, head-soccer style
      const headR = PLAYER_R * 0.72;
      const headY = p.y - 2;
      ctx.fillStyle = skin;
      ctx.beginPath();
      ctx.arc(p.x, headY, headR, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = 'rgba(0,0,0,0.15)';
      ctx.lineWidth = 2;
      ctx.stroke();

      // Headband in team trim color
      ctx.strokeStyle = p.accent;
      ctx.lineWidth = 5;
      ctx.beginPath();
      ctx.arc(p.x, headY, headR - 1.5, Math.PI * 1.12, Math.PI * 1.88);
      ctx.stroke();

      // Face: eye, brow, and a little smile on the facing side
      ctx.fillStyle = '#1a1a1a';
      const eyeX = p.x + p.facing * 8;
      ctx.beginPath();
      ctx.arc(eyeX, headY - 3, 2.6, 0, Math.PI * 2);
      ctx.fill();
      ctx.strokeStyle = '#1a1a1a';
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(eyeX - 4, headY - 9);
      ctx.lineTo(eyeX + 3, headY - 10);
      ctx.stroke();
      ctx.beginPath();
      ctx.arc(p.x + p.facing * 7, headY + 6, 4,
        p.facing > 0 ? 0.2 : Math.PI - 1.2,
        p.facing > 0 ? 1.2 : Math.PI - 0.2);
      ctx.stroke();

      ctx.restore();
    }

    drawTrail(ctx) {
      const trail = this.fx.trail;
      for (let i = trail.length - 1; i >= 0; i--) {
        const t = trail[i];
        const f = 1 - i / 9;
        ctx.fillStyle = `rgba(255,255,255,${0.22 * f})`;
        ctx.beginPath();
        ctx.arc(t.x, t.y, BALL_R * (0.4 + 0.6 * f), 0, Math.PI * 2);
        ctx.fill();
      }
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

    drawParticles(ctx) {
      for (const p of this.fx.particles) {
        ctx.globalAlpha = clamp(p.life / p.max, 0, 1);
        if (p.shape === 'rect') {
          ctx.save();
          ctx.translate(p.x, p.y);
          ctx.rotate(p.rot);
          ctx.fillStyle = p.color;
          ctx.fillRect(-p.size / 2, -p.size / 3, p.size, p.size * 0.66);
          ctx.restore();
        } else {
          ctx.fillStyle = p.color;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
          ctx.fill();
        }
      }
      ctx.globalAlpha = 1;
    }
  }

  // Handle for debugging and automated play-testing.
  window.__game = new Game();
})();
