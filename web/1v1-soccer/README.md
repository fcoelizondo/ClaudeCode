# 1v1 Soccer

A side-view, physics-based head soccer game — 1 player vs a CPU
opponent with three selectable difficulty levels (easy/medium/hard vary
the CPU's speed, kick power, reaction cooldowns, and anticipation).
Plain HTML5 Canvas + JS, no build step, no dependencies — open
`index.html` directly or serve the folder.

## Characters & achievements

Six playable characters, each with different stats (move speed, jump
height, kick power, shot angle, body size) and a distinct look. Only
LEO starts unlocked; the rest unlock through lifetime achievements
tracked in `localStorage` (play 10 matches, score 25 goals, score 10
header goals, win 10 matches). The legendary RAYO (100 goals scored)
has a special chip shot: a golden ballistic lob solved from the
distance to goal, arcing over even a jumping defender. Progress and
selection persist between visits; unlocks are announced on the
full-time screen.

Score more goals than the CPU before the 90-second clock runs out. Bump
the ball with any part of your player for a soft touch, or press kick
for a hard shot aimed at the opponent's goal — jump kicks get extra
lift. Shots can rattle off the crossbar, and the CPU rubber-bands its
speed to keep matches close.

Includes a full stadium backdrop (crowd, floodlights, ad boards),
animated players with run cycles and squash-and-stretch, goal confetti,
screen shake, a ball motion trail, and synthesized sound effects (no
audio assets).

## Controls

- **Move** — `A`/`D` or `←`/`→`.
- **Jump** — `W` or `↑`.
- **Kick** — `S`, `↓`, or `Space`.
- Touch devices get on-screen controls instead: a left-thumb pad to move
  left/right, and a right-thumb pad for jump and kick.
- This is a landscape game; portrait phones get a rotate prompt.

## Files

- `index.html` — page shell, HUD, start/goal/full-time overlays, and the
  touch control pads.
- `style.css` — layout, overlay, and touch-pad styling.
- `game.js` — all game logic: player and ball physics, collisions, goal
  detection, simple CPU opponent, rendering.
- `icon.svg` — hub icon and PWA icon.
- `apple-touch-icon.png` / `manifest.json` — home-screen install
  support (iOS needs a full-bleed square PNG; it applies its own
  corner rounding).
