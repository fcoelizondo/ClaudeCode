# Games

Static, no-build-step browser games, deployed together as one GitHub Pages
site via `.github/workflows/deploy-pages.yml`.

- `index.html` — landing page linking to each game.
- `crossy-road/` — [Crossy Road](crossy-road/README.md).

## Adding a new game

1. Create a new subfolder here, e.g. `web/snake/`, with its own
   self-contained `index.html`, assets, and JS (no shared code between
   games — each folder should work standalone).
2. Add a card for it in `index.html`'s `.grid`, linking to `snake/`.
3. Push to `main` — the existing workflow picks up any change under `web/`
   and redeploys the whole site automatically.

Each game ends up served at `https://<user>.github.io/<repo>/<folder>/`.
