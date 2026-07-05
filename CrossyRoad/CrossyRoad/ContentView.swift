import SwiftUI
import SpriteKit

struct ContentView: View {
    // Created once and reused so SwiftUI re-renders never reset the game in progress.
    @State private var scene: GameScene = {
        let scene = GameScene(size: UIScreen.main.bounds.size)
        scene.scaleMode = .resizeFill
        return scene
    }()

    var body: some View {
        SpriteView(scene: scene)
            .ignoresSafeArea()
    }
}

#Preview {
    ContentView()
}
