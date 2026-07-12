# Head Strikers

A side-view, physics-based head soccer game — 1 player vs CPU, or 2
players on the same keyboard. Plain HTML5 Canvas + JS, no build step, no
dependencies — open `index.html` directly or serve the folder.

Score more goals than your opponent before the 90-second clock runs out.
Bump the ball with any part of your player for a soft touch, or press
kick for a hard, aimed shot.

## Controls

- **Player 1** — `A`/`D` to move, `W` to jump, `S` (or `Space`) to kick.
- **Player 2** (2-player mode) — arrow keys to move, `↑` to jump, `↓` to
  kick.
- Touch devices get on-screen move/jump/kick pads instead (bottom-left
  for Player 1, bottom-right for Player 2 in 2-player mode).
- This is a landscape game; portrait phones get a rotate prompt.

## Files

- `index.html` — page shell, HUD, start/goal/full-time overlays, and the
  touch control pads.
- `style.css` — layout, overlay, and touch-pad styling.
- `game.js` — all game logic: player and ball physics, collisions, goal
  detection, simple CPU opponent, rendering.
- `icon.svg` — home-screen / hub icon.
