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
2. **Night** — the device passes to every living player in turn, one at
   a time, the same way the day vote does. Whoever is holding it sees
   whatever their role calls for — the Doctor picks someone to protect,
   the Detective picks someone to investigate and privately learns if
   they're Mafia — while everyone else just sees "nothing to do." Every
   turn is the same shape (tap a name, hold to confirm and pass on), so
   no one can guess a player's role from how long their turn takes or how
   many times they tap the screen.

   Each Mafia player picks a target and sees the current pick from
   whichever teammate went before them, so they can tap the same name to
   agree or a different one to overrule it. If every Mafia player's final
   pick matches by the end of the round, that's the kill (unless the
   Doctor protected them). If they don't all agree, the device announces
   it and every player — Mafia included — passes through the night once
   more to try again. A second round with no agreement means no one is
   attacked that night.
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
  handoff/reveal (loop) → night (handoff/turn loop over every living
  player) → day (announce → discuss → vote handoff/select → reveal) →
  repeat → game over state machine.
