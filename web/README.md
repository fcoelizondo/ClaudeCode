# Games

Static, no-build-step browser pages, deployed together as one GitHub Pages
site via `.github/workflows/deploy-pages.yml`. Everything here has been a
game so far, but the convention below applies to any self-contained page.

- `index.html` — landing page linking to each page.
- `crossy-road/` — [Crossy Road](crossy-road/README.md).
- `impostor/` — [Impostor](impostor/README.md).

## Adding a new page

1. Create a new subfolder here, e.g. `web/snake/`, with its own
   self-contained `index.html`, assets, and JS (no shared code between
   folders — each one should work standalone).
2. Add an `icon.svg` and a short `README.md` for it, matching the shape
   of `crossy-road/` or `impostor/`.
3. Add a card for it in `index.html`'s `.grid`, linking to `snake/`.
4. Push to `main` — the existing workflow picks up any change under `web/`
   and redeploys the whole site automatically.

Each page ends up served at `https://<user>.github.io/<repo>/<folder>/`.
