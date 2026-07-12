# Sky Roo

Single-player Doodle Jump–style vertical jumper starring Roo the kangaroo.
Plain HTML5 Canvas + JS, no build step, no dependencies — open `index.html`
directly or serve the folder.

## Controls

- Tilt your phone left/right to steer Roo in the air (device orientation
  sensor). On desktop, use **← / A**, **→ / D** instead. Neutral tilt is
  calibrated to however you're holding the phone the moment each run
  starts, so there's no need to hold it dead level.
- iOS requires a one-time motion-sensor permission prompt, triggered by
  the "tap to play" gesture on the ready screen.
- Roo bounces automatically whenever she lands on a platform — there's no
  jump button. Just don't let her fall off the bottom of the screen.
- Roo wraps around the sides: drift off one edge and she reappears on the
  other.

## Platforms & hazards

- White cloud platforms are solid and static.
- Pale blue platforms drift back and forth.
- Faintly cracked platforms crumble the instant Roo bounces off them.
- Platforms with a red coil launch Roo much higher than a normal bounce.
- Balloon clusters grant a few seconds of boosted flight (and brief
  invincibility) — grab them on the way past.
- Crows drift across the sky the higher you climb; touching one ends the
  run.

Score is the height climbed; best score persists in `localStorage` between
visits. The sky gradually shifts from day to a starry night the higher Roo
gets.

## Files

- `index.html` — page shell and overlays (ready / game over screens).
- `style.css` — layout and overlay styling.
- `game.js` — all game logic: procedural platform generation, physics,
  collisions, scrolling camera, rendering.
- `manifest.json` / `icon.svg` — home-screen install support.
