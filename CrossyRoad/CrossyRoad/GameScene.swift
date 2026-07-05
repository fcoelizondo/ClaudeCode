import SpriteKit

final class GameScene: SKScene {

    // MARK: - World

    private let worldNode = SKNode()
    private let cameraNode = SKCameraNode()
    private let hudNode = SKNode()
    private var overlayNode: SKNode?

    private var laneGenerator = LaneGenerator()
    private var lanesByRow: [Int: Lane] = [:]
    private var minColumn = -4
    private var maxColumn = 4
    private let rowsAheadBuffer = 14
    private let rowsBehindKeep = 6

    // MARK: - Player state

    private let player = PlayerNode()
    private var currentRow = 0
    private var currentColumn = 0
    private var isMoving = false
    private var furthestRow = 0

    // MARK: - Game state

    private var state: GameState = .ready
    private var lastUpdateTime: TimeInterval = 0
    private var cameraTargetY: CGFloat = 0

    // MARK: - HUD

    private let scoreLabel = SKLabelNode(fontNamed: "AvenirNext-Bold")
    private let bestLabel = SKLabelNode(fontNamed: "AvenirNext-Medium")

    private static let bestScoreKey = "com.crossyroad.bestScore"

    // MARK: - Setup

    override func didMove(to view: SKView) {
        backgroundColor = SKColor(red: 0.55, green: 0.78, blue: 0.95, alpha: 1.0)
        anchorPoint = CGPoint(x: 0.5, y: 0.5)

        let columnsVisible = max(7, Int(size.width / GameConstants.tileSize) | 1)
        minColumn = -(columnsVisible / 2)
        maxColumn = columnsVisible / 2

        addChild(worldNode)
        camera = cameraNode
        addChild(cameraNode)
        cameraNode.addChild(hudNode)

        setupHUD()
        setupGesture(in: view)
        startNewGame()
    }

    private func setupGesture(in view: SKView) {
        let up = UISwipeGestureRecognizer(target: self, action: #selector(handleSwipeUp))
        up.direction = .up
        let left = UISwipeGestureRecognizer(target: self, action: #selector(handleSwipeLeft))
        left.direction = .left
        let right = UISwipeGestureRecognizer(target: self, action: #selector(handleSwipeRight))
        right.direction = .right
        let tap = UITapGestureRecognizer(target: self, action: #selector(handleTap(_:)))
        view.addGestureRecognizer(up)
        view.addGestureRecognizer(left)
        view.addGestureRecognizer(right)
        view.addGestureRecognizer(tap)
    }

    private func setupHUD() {
        scoreLabel.fontSize = 34
        scoreLabel.fontColor = .white
        scoreLabel.verticalAlignmentMode = .top
        scoreLabel.horizontalAlignmentMode = .center
        hudNode.addChild(scoreLabel)

        bestLabel.fontSize = 16
        bestLabel.fontColor = SKColor(white: 1.0, alpha: 0.85)
        bestLabel.verticalAlignmentMode = .top
        bestLabel.horizontalAlignmentMode = .center
        hudNode.addChild(bestLabel)

        layoutHUD()
    }

    private func layoutHUD() {
        scoreLabel.position = CGPoint(x: 0, y: size.height / 2 - 24)
        bestLabel.position = CGPoint(x: 0, y: size.height / 2 - 62)
    }

    override func didChangeSize(_ oldSize: CGSize) {
        layoutHUD()
    }

    // MARK: - Game lifecycle

    private func startNewGame() {
        worldNode.removeAllChildren()
        lanesByRow.removeAll()
        overlayNode?.removeFromParent()
        overlayNode = nil

        currentRow = 0
        currentColumn = 0
        furthestRow = 0
        isMoving = false
        laneGenerator = LaneGenerator()

        for row in 0...(rowsAheadBuffer) {
            spawnLane(at: row)
        }

        player.position = CGPoint(x: 0, y: 0)
        player.setScale(1)
        player.alpha = 1
        player.zRotation = 0
        worldNode.addChild(player)

        cameraNode.position = CGPoint(x: 0, y: size.height * 0.22)
        cameraTargetY = cameraNode.position.y

        updateScoreLabel()
        state = .ready
        showReadyOverlay()
    }

    private func spawnLane(at row: Int) {
        guard lanesByRow[row] == nil else { return }
        let lane = laneGenerator.makeLane(for: row, columnRange: minColumn...maxColumn)
        worldNode.addChild(lane.node)
        lanesByRow[row] = lane
    }

    private func recycleLanes() {
        let neededUpTo = currentRow + rowsAheadBuffer
        for row in (currentRow + 1)...neededUpTo where lanesByRow[row] == nil {
            spawnLane(at: row)
        }
        let cutoff = currentRow - rowsBehindKeep
        for (row, lane) in lanesByRow where row < cutoff {
            lane.node.removeFromParent()
            lanesByRow.removeValue(forKey: row)
        }
    }

    // MARK: - Input

    @objc private func handleSwipeUp() { attemptMove(dColumn: 0, dRow: 1) }
    @objc private func handleSwipeLeft() { attemptMove(dColumn: -1, dRow: 0) }
    @objc private func handleSwipeRight() { attemptMove(dColumn: 1, dRow: 0) }

    @objc private func handleTap(_ recognizer: UITapGestureRecognizer) {
        switch state {
        case .ready:
            state = .playing
            overlayNode?.removeFromParent()
            overlayNode = nil
        case .playing:
            // A plain tap also advances forward, as a fallback to the swipe gestures.
            attemptMove(dColumn: 0, dRow: 1)
        case .gameOver:
            guard let view = self.view,
                  let overlay = overlayNode,
                  let button = overlay.childNode(withName: "restartButton") else { return }
            let scenePoint = convertPoint(fromView: recognizer.location(in: view))
            let localPoint = convert(scenePoint, to: overlay)
            if button.contains(localPoint) {
                startNewGame()
            }
        }
    }

    private func attemptMove(dColumn: Int, dRow: Int) {
        guard dRow >= 0 else { return } // moving backward is never allowed
        if state == .ready {
            state = .playing
            overlayNode?.removeFromParent()
            overlayNode = nil
        }
        guard state == .playing, !isMoving else { return }

        let targetColumn = currentColumn + dColumn
        let targetRow = currentRow + dRow

        guard targetColumn >= minColumn, targetColumn <= maxColumn else { return }
        guard let lane = lanesByRow[targetRow] else { return }

        if case .grass = lane.type, lane.blockedColumns.contains(targetColumn) {
            player.playBump()
            return
        }

        isMoving = true
        currentColumn = targetColumn
        currentRow = targetRow

        if dColumn != 0 {
            player.xScale = dColumn > 0 ? abs(player.xScale) : -abs(player.xScale)
        }

        if targetRow > furthestRow {
            furthestRow = targetRow
            updateScoreLabel()
        }

        let destination = CGPoint(x: CGFloat(targetColumn) * GameConstants.tileSize,
                                   y: CGFloat(targetRow) * GameConstants.tileSize)
        let move = SKAction.move(to: destination, duration: GameConstants.moveDuration)
        player.playHop()
        player.run(move) { [weak self] in
            self?.isMoving = false
            self?.handleLanding(on: lane)
        }
    }

    private func handleLanding(on lane: Lane) {
        guard state == .playing else { return }
        switch lane.type {
        case .water:
            if lane.obstacle(coveringX: player.position.x) == nil {
                triggerGameOver(reason: .drowned)
            }
        case .road:
            if lane.obstacle(coveringX: player.position.x) != nil {
                triggerGameOver(reason: .hit)
            }
        case .grass:
            break
        }
    }

    // MARK: - Update loop

    override func update(_ currentTime: TimeInterval) {
        defer { lastUpdateTime = currentTime }
        guard lastUpdateTime > 0 else { return }
        let dt = min(currentTime - lastUpdateTime, 1.0 / 30.0)

        guard state != .ready else { return }

        for lane in lanesByRow.values {
            guard let direction = lane.node.userData?["direction"] as? CGFloat,
                  let speed = lane.node.userData?["speed"] as? CGFloat,
                  let loopWidth = lane.node.userData?["loopWidth"] as? CGFloat else { continue }

            let delta = direction * speed * CGFloat(dt)
            let halfLoop = loopWidth / 2

            for obstacle in lane.obstacles {
                obstacle.position.x += delta
                if obstacle.position.x > halfLoop { obstacle.position.x -= loopWidth }
                if obstacle.position.x < -halfLoop { obstacle.position.x += loopWidth }
            }

            guard state == .playing else { continue }

            if case .road = lane.type, lane.rowIndex == currentRow, !isMoving {
                if lane.obstacle(coveringX: player.position.x) != nil {
                    triggerGameOver(reason: .hit)
                }
            } else if case .water = lane.type, lane.rowIndex == currentRow, !isMoving {
                if lane.obstacle(coveringX: player.position.x) != nil {
                    player.position.x += delta
                } else {
                    triggerGameOver(reason: .drowned)
                }
            }
        }

        if state == .playing {
            recycleLanes()
            cameraTargetY = max(cameraTargetY, player.position.y + size.height * 0.22)
            cameraNode.position.y += (cameraTargetY - cameraNode.position.y) * min(1, CGFloat(dt) * 6)
        }
    }

    // MARK: - Game over / scoring

    private func triggerGameOver(reason: DeathReason) {
        guard state == .playing else { return }
        state = .gameOver
        player.playDeath(reason: reason)

        let best = max(UserDefaults.standard.integer(forKey: Self.bestScoreKey), furthestRow)
        UserDefaults.standard.set(best, forKey: Self.bestScoreKey)

        run(.sequence([.wait(forDuration: 0.4), .run { [weak self] in self?.showGameOverOverlay(best: best) }]))
    }

    private func updateScoreLabel() {
        scoreLabel.text = "\(furthestRow)"
        let best = UserDefaults.standard.integer(forKey: Self.bestScoreKey)
        bestLabel.text = "BEST \(max(best, furthestRow))"
    }

    // MARK: - Overlays

    private func showReadyOverlay() {
        let overlay = SKNode()
        overlay.zPosition = 100

        let panel = SKShapeNode(rectOf: CGSize(width: min(size.width * 0.8, 300), height: 140), cornerRadius: 18)
        panel.fillColor = SKColor(white: 0, alpha: 0.55)
        panel.strokeColor = .clear
        overlay.addChild(panel)

        let title = SKLabelNode(fontNamed: "AvenirNext-Bold")
        title.text = "CROSSY ROAD"
        title.fontSize = 26
        title.fontColor = .white
        title.position = CGPoint(x: 0, y: 24)
        overlay.addChild(title)

        let subtitle = SKLabelNode(fontNamed: "AvenirNext-Medium")
        subtitle.text = "Swipe or tap to hop forward"
        subtitle.fontSize = 16
        subtitle.fontColor = SKColor(white: 1, alpha: 0.85)
        subtitle.position = CGPoint(x: 0, y: -8)
        overlay.addChild(subtitle)

        let subtitle2 = SKLabelNode(fontNamed: "AvenirNext-Medium")
        subtitle2.text = "Swipe left / right to dodge"
        subtitle2.fontSize = 16
        subtitle2.fontColor = SKColor(white: 1, alpha: 0.85)
        subtitle2.position = CGPoint(x: 0, y: -32)
        overlay.addChild(subtitle2)

        hudNode.addChild(overlay)
        overlayNode = overlay
    }

    private func showGameOverOverlay(best: Int) {
        let overlay = SKNode()
        overlay.zPosition = 100

        let panel = SKShapeNode(rectOf: CGSize(width: min(size.width * 0.8, 300), height: 220), cornerRadius: 18)
        panel.fillColor = SKColor(white: 0, alpha: 0.6)
        panel.strokeColor = .clear
        overlay.addChild(panel)

        let title = SKLabelNode(fontNamed: "AvenirNext-Bold")
        title.text = "GAME OVER"
        title.fontSize = 28
        title.fontColor = .white
        title.position = CGPoint(x: 0, y: 70)
        overlay.addChild(title)

        let scoreText = SKLabelNode(fontNamed: "AvenirNext-Medium")
        scoreText.text = "Score: \(furthestRow)"
        scoreText.fontSize = 20
        scoreText.fontColor = .white
        scoreText.position = CGPoint(x: 0, y: 30)
        overlay.addChild(scoreText)

        let bestText = SKLabelNode(fontNamed: "AvenirNext-Medium")
        bestText.text = "Best: \(best)"
        bestText.fontSize = 20
        bestText.fontColor = SKColor(white: 1, alpha: 0.85)
        bestText.position = CGPoint(x: 0, y: 2)
        overlay.addChild(bestText)

        let button = SKShapeNode(rectOf: CGSize(width: 180, height: 48), cornerRadius: 12)
        button.name = "restartButton"
        button.fillColor = SKColor(red: 0.30, green: 0.68, blue: 0.35, alpha: 1.0)
        button.strokeColor = .clear
        button.position = CGPoint(x: 0, y: -50)
        overlay.addChild(button)

        let buttonLabel = SKLabelNode(fontNamed: "AvenirNext-Bold")
        buttonLabel.text = "TAP TO RESTART"
        buttonLabel.fontSize = 16
        buttonLabel.fontColor = .white
        buttonLabel.verticalAlignmentMode = .center
        buttonLabel.position = CGPoint(x: 0, y: -50)
        overlay.addChild(buttonLabel)

        hudNode.addChild(overlay)
        overlayNode = overlay
    }
}
