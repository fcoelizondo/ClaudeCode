# Impostor

Pass-the-phone social deduction game. Plain HTML/CSS/JS, no build step,
no dependencies — open `index.html` directly or serve the folder.

Set the number of players and impostors, pick a case-file category, then
pass the device around the table. Each player holds a button to reveal
their word (or their impostor status, plus the category), then holds
another to conceal it before passing the device on. Once everyone has
seen their role, a discussion timer runs before the full roster —
including the word and who was the impostor — is revealed.

## Files

- `index.html` — page shell; mounts the app into `#device`.
- `style.css` — layout, theming (light/dark), and the hold-to-reveal /
  stamp / timer visuals.
- `game.js` — all game logic: word bank, role assignment, the
  setup → handoff → reveal → discussion → answers state machine.
