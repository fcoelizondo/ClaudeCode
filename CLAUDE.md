# ClaudeCode

Personal repo for small, self-contained interactive pages (games today,
but not limited to games), each deployed as its own static page under
one GitHub Pages site.

## Repo layout

- `web/` — the deployed site. `web/index.html` is a hub page listing
  every item as a card; each item lives in its own `web/<name>/`
  subfolder. Deployed by `.github/workflows/deploy-pages.yml`, which
  triggers on any push to `main` touching `web/**` and publishes the
  whole `web/` directory to Pages — no manual deploy step.
- `CrossyRoad/` — a native iOS/SpriteKit build of the Crossy Road game.
  Unrelated to the web pages; don't confuse the two when asked to
  change "Crossy Road".

## Adding a new page to `web/`

This convention applies to any new self-contained page — a game, a
tool, a demo, whatever comes next — not just games. Follow it without
being asked:

1. Create `web/<name>/` with its own `index.html`, `style.css`, and
   `game.js`/`app.js` (plus any assets it needs). No shared code between
   folders — each one must work standalone when served on its own.
2. Add an `icon.svg` (flat, simple shapes, `viewBox="0 0 192 192"`,
   rounded-square background) and a short `README.md` describing what
   it is and its file layout. Use `web/crossy-road/` or
   `web/impostor/` as the template for both.
3. Add a card to `web/index.html`'s `.grid`: an `<a class="game-card"
   href="<name>/">` with an `<img class="icon" src="<name>/icon.svg">`
   and a `.name` div. Do this in the same change that adds the page —
   a page that isn't linked from the hub isn't done.
4. Push to `main`. The existing workflow picks up the change
   automatically; there's nothing else to configure.

Each page ends up served at `https://<user>.github.io/<repo>/<name>/`.

The hub's title and card class names ("Games", `game-card`) still
reflect that everything so far has been a game. If/when the first
non-game page is added, revisit that wording rather than leaving it
inaccurate.
