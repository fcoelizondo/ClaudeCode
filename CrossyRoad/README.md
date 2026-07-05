# Crossy Road (iPhone)

A single-player Crossy Road–style game built with SwiftUI + SpriteKit.

## Run it

1. Open `CrossyRoad.xcodeproj` in Xcode (15+).
2. Pick an iPhone simulator (or a device — you'll need to set your team under
   **Signing & Capabilities** for a real device).
3. Press **Run**.

No external assets or dependencies — everything (the chicken avatar, cars,
logs, scenery) is drawn procedurally with SpriteKit primitives.

## Rules

- You start at the bottom of the screen and only ever move **forward**
  (up), **left**, or **right** — there's no way to move back down.
- **Swipe up** (or tap) to hop forward a row, **swipe left/right** to shift a
  column.
- Grass rows are safe, but occasionally have trees blocking a tile.
- Road rows have moving cars — get hit and it's game over.
- Water rows only have moving logs to hop across — miss a log and you drown.
- Difficulty (traffic/current speed, hazard frequency) ramps up the farther
  you get. Your score is the furthest row reached; best score is saved
  between sessions.

## Project layout

- `CrossyRoadApp.swift` — app entry point.
- `ContentView.swift` — hosts the SpriteKit scene via `SpriteView`.
- `GameScene.swift` — input handling, movement, collisions, camera, HUD,
  game-over/restart flow.
- `GameModels.swift` — lane/obstacle model and the procedural lane generator.
- `PlayerNode.swift` — the player avatar and its animations.
