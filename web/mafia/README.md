# Mafia

Pass-the-phone social deduction game — the device plays moderator for a
group of Villagers hunting a hidden Mafia. Plain HTML/CSS/JS, no build
step, no dependencies — open `index.html` directly or serve the folder.

Set the number of players, how many are Mafia, and whether to include a
Detective and/or a Doctor, then optionally name each player. Play runs as
a loop of three stages on one shared device:

1. **Role assignment** — pass the device around; each player holds a
   button to reveal their role (Villager, Mafia, Detective, or Doctor —
   Mafia players also see their teammates' names), then holds another to
   conceal it before passing it on.
2. **Night** — "everyone closes their eyes." The device wakes the Doctor
   (pick someone to protect), then the Detective (pick someone to
   investigate, privately learn if they're Mafia), then the Mafia
   (decide together, quietly, on someone to eliminate) — each in its own
   private handoff. The night resolves immediately if the Mafia's target
   was protected.
3. **Day** — the device announces who died (if anyone) and their role,
   then the group discusses out loud. Pass the device once more for a
   secret vote: each living player picks who to eliminate. A tap-to-hold
   confirm reveals who was voted out and their role.

Night and day repeat until the Mafia are all gone (Village wins) or the
Mafia equal or outnumber the rest (Mafia wins), then a final screen shows
the full roster with every role revealed.

The setup screen has an EN/ES toggle that switches all UI copy. The
choice is remembered in `localStorage` between visits.

## Files

- `index.html` — page shell; mounts the app into `#device`.
- `style.css` — layout, theming (light/dark), and the hold-to-reveal /
  stamp / vote / roster visuals.
- `game.js` — all game logic: role assignment, and the setup → names →
  handoff/reveal (loop) → night (doctor → detective → mafia) → day
  (announce → discuss → vote handoff/select → reveal) → repeat → game
  over state machine.
