# Crossy Road

Single-player Crossy Road–style game. Plain HTML5 Canvas + JS, no build
step, no dependencies — open `index.html` directly or serve the folder.

## Controls

- Swipe up, tap, or press **↑ / W** to hop forward.
- Swipe left/right or press **← / A**, **→ / D** to strafe.
- There's no way to move backward — grass rows are safe (watch for
  trees blocking a tile), road rows have moving cars, water rows only
  have logs to hop across.

Score is the furthest row reached; best score persists in
`localStorage` between visits.

## Files

- `index.html` — page shell and overlays (ready / game over screens).
- `style.css` — layout and overlay styling.
- `game.js` — all game logic: procedural lane generation, movement,
  collisions, camera, rendering.
- `manifest.json` / `icon.svg` — home-screen install support.
