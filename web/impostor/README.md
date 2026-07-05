# Impostor

Pass-the-phone social deduction game. Plain HTML/CSS/JS, no build step,
no dependencies — open `index.html` directly or serve the folder.

Set the number of players and impostors, pick a case-file category, and
optionally name each player, then play through three stages on one
shared device:

1. **Role assignment** — pass the device around; each player holds a
   button to reveal their word (or their impostor status, plus the
   category), then holds another to conceal it before passing it on.
2. **Discussion** — going in order, each player says one word related
   to the case file (out loud, no need to hide the screen). After
   everyone's gone once, the group decides whether to do another round
   of one-word clues before moving on.
3. **Voting** — pass the device around again; each player secretly picks
   who they think the impostor is (their own name is excluded from the
   choices). Once everyone has voted, a tap-to-confirm reveal shows the
   secret word, every player's real role, who voted for whom, and
   whether the crew caught the impostor or they got away with it.

The setup screen has an EN/ES toggle that switches the UI copy, the
category names, and the word bank itself (not just a translation layer —
each language has its own word lists). The choice is remembered in
`localStorage` between visits. Internally the selected word is stored as
a language-independent `{ category, index }` pick and resolved to text
at render time, so switching languages never changes the secret word
mid-round — it just relabels it.

## Files

- `index.html` — page shell; mounts the app into `#device`.
- `style.css` — layout, theming (light/dark), and the hold-to-reveal /
  stamp / vote / results visuals.
- `game.js` — all game logic: word bank, role assignment, and the
  setup → names → handoff → reveal → discussion (turn/round-decision) →
  voting (handoff/select/complete) → results state machine.
