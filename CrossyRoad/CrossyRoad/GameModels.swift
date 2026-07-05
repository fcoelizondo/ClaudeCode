import SpriteKit

enum GameConstants {
    static let tileSize: CGFloat = 60
    static let moveDuration: TimeInterval = 0.12
    static let hopHeight: CGFloat = 14
    static let minRoadSpeed: CGFloat = 70
    static let maxRoadSpeed: CGFloat = 190
    static let minWaterSpeed: CGFloat = 40
    static let maxWaterSpeed: CGFloat = 110
    static let safeStartRows = 3
}

enum LaneType {
    case grass
    case road(direction: CGFloat, speed: CGFloat)
    case water(direction: CGFloat, speed: CGFloat)
}

enum GameState {
    case ready
    case playing
    case gameOver
}

enum DeathReason {
    case hit
    case drowned
}

/// A single horizontal row of the world. Lives inside `worldNode` and only ever
/// offsets vertically; every child (cars, logs, decorations) shares the same
/// x-coordinate space as the player, which keeps collision math simple.
final class Lane {
    let rowIndex: Int
    let type: LaneType
    let node: SKNode
    var obstacles: [SKSpriteNode] = []
    var blockedColumns: Set<Int> = []
    /// Half-width (in points) of each obstacle, used for overlap tests.
    var obstacleHalfWidth: CGFloat = GameConstants.tileSize / 2

    init(rowIndex: Int, type: LaneType) {
        self.rowIndex = rowIndex
        self.type = type
        self.node = SKNode()
        self.node.position = CGPoint(x: 0, y: CGFloat(rowIndex) * GameConstants.tileSize)
    }

    /// Returns the obstacle (car or log) whose span currently contains `x`, if any.
    func obstacle(coveringX x: CGFloat) -> SKSpriteNode? {
        obstacles.first { abs($0.position.x - x) < (obstacleHalfWidth + PlayerNode.collisionHalfWidth) }
    }
}

/// Procedurally builds lanes as the player advances, keeping the game
/// beatable (safe starting strip, never too many hazardous rows in a row).
struct LaneGenerator {
    private(set) var recentDifficultRun = 0

    mutating func makeLane(for rowIndex: Int, columnRange: ClosedRange<Int>) -> Lane {
        if rowIndex < GameConstants.safeStartRows {
            return Lane(rowIndex: rowIndex, type: .grass)
        }

        let difficulty = min(1.0, CGFloat(rowIndex) / 140.0)
        let type: LaneType
        if recentDifficultRun >= 3 {
            type = .grass
        } else {
            let roll = Double.random(in: 0...1)
            switch roll {
            case 0..<0.38:
                type = .grass
            case 0.38..<0.72:
                let dir: CGFloat = Bool.random() ? 1 : -1
                let speed = GameConstants.minRoadSpeed + (GameConstants.maxRoadSpeed - GameConstants.minRoadSpeed) * difficulty * CGFloat.random(in: 0.5...1.0)
                type = .road(direction: dir, speed: speed)
            default:
                let dir: CGFloat = Bool.random() ? 1 : -1
                let speed = GameConstants.minWaterSpeed + (GameConstants.maxWaterSpeed - GameConstants.minWaterSpeed) * difficulty * CGFloat.random(in: 0.5...1.0)
                type = .water(direction: dir, speed: speed)
            }
        }

        switch type {
        case .grass:
            recentDifficultRun = 0
        default:
            recentDifficultRun += 1
        }

        let lane = Lane(rowIndex: rowIndex, type: type)
        populate(lane: lane, columnRange: columnRange, difficulty: difficulty)
        return lane
    }

    private func populate(lane: Lane, columnRange: ClosedRange<Int>, difficulty: CGFloat) {
        let tile = GameConstants.tileSize
        switch lane.type {
        case .grass:
            let treeCount = Int.random(in: 0...2)
            var used: Set<Int> = []
            for _ in 0..<treeCount {
                if let col = columnRange.filter({ !used.contains($0) }).randomElement() {
                    used.insert(col)
                    lane.blockedColumns.insert(col)
                    let tree = makeTree()
                    tree.position = CGPoint(x: CGFloat(col) * tile, y: 0)
                    lane.node.addChild(tree)
                }
            }
        case .road(let direction, let speed):
            let carWidth: CGFloat = tile * 0.82
            lane.obstacleHalfWidth = carWidth / 2
            let gap = CGFloat.random(in: 1.6...2.6) * tile
            let spacing = carWidth + gap
            let count = 6
            let loopWidth = spacing * CGFloat(count)
            let colors: [SKColor] = [.systemRed, .systemBlue, .systemOrange, .systemYellow, .systemPurple]
            let startOffset = CGFloat.random(in: 0..<spacing)
            for i in 0..<count {
                let car = makeCar(width: carWidth, height: tile * 0.62, color: colors.randomElement()!, facing: direction)
                car.position = CGPoint(x: -loopWidth / 2 + CGFloat(i) * spacing + startOffset, y: 0)
                lane.node.addChild(car)
                lane.obstacles.append(car)
            }
            lane.node.userData = NSMutableDictionary(dictionary: [
                "loopWidth": loopWidth, "direction": direction, "speed": speed,
            ])
        case .water(let direction, let speed):
            let logLength = Int.random(in: 2...4)
            let logWidth = tile * CGFloat(logLength) - tile * 0.12
            lane.obstacleHalfWidth = logWidth / 2
            let gap = CGFloat.random(in: 1.0...1.8) * tile
            let spacing = logWidth + gap
            let count = 5
            let loopWidth = spacing * CGFloat(count)
            let startOffset = CGFloat.random(in: 0..<spacing)
            for i in 0..<count {
                let log = makeLog(width: logWidth, height: tile * 0.7)
                log.position = CGPoint(x: -loopWidth / 2 + CGFloat(i) * spacing + startOffset, y: 0)
                lane.node.addChild(log)
                lane.obstacles.append(log)
            }
            lane.node.userData = NSMutableDictionary(dictionary: [
                "loopWidth": loopWidth, "direction": direction, "speed": speed,
            ])

            let water = SKSpriteNode(color: SKColor(red: 0.20, green: 0.47, blue: 0.85, alpha: 1.0),
                                      size: CGSize(width: tile * CGFloat(columnRange.count + 4), height: tile))
            water.zPosition = -1
            lane.node.addChild(water)
        }

        if case .grass = lane.type {
            let grass = SKSpriteNode(color: SKColor(red: 0.36, green: 0.72, blue: 0.32, alpha: 1.0),
                                      size: CGSize(width: tile * CGFloat(columnRange.count + 4), height: tile))
            grass.zPosition = -1
            lane.node.addChild(grass)
        } else if case .road = lane.type {
            let road = SKSpriteNode(color: SKColor(white: 0.22, alpha: 1.0),
                                     size: CGSize(width: tile * CGFloat(columnRange.count + 4), height: tile))
            road.zPosition = -1
            lane.node.addChild(road)
            for col in columnRange {
                let dash = SKSpriteNode(color: .white, size: CGSize(width: tile * 0.35, height: 4))
                dash.position = CGPoint(x: CGFloat(col) * tile, y: 0)
                dash.zPosition = -0.5
                dash.alpha = 0.6
                road.addChild(dash)
            }
        }
    }

    private func makeTree() -> SKNode {
        let node = SKNode()
        let trunk = SKSpriteNode(color: SKColor(red: 0.42, green: 0.28, blue: 0.16, alpha: 1.0),
                                  size: CGSize(width: 10, height: 16))
        trunk.position = CGPoint(x: 0, y: -8)
        let canopy = SKShapeNode(circleOfRadius: 18)
        canopy.fillColor = SKColor(red: 0.15, green: 0.45, blue: 0.18, alpha: 1.0)
        canopy.strokeColor = .clear
        canopy.position = CGPoint(x: 0, y: 14)
        node.addChild(trunk)
        node.addChild(canopy)
        node.zPosition = 2
        return node
    }

    private func makeCar(width: CGFloat, height: CGFloat, color: SKColor, facing: CGFloat) -> SKSpriteNode {
        let car = SKSpriteNode(color: color, size: CGSize(width: width, height: height))
        car.zPosition = 3
        let cabin = SKSpriteNode(color: SKColor(white: 0.85, alpha: 0.9),
                                  size: CGSize(width: width * 0.4, height: height * 0.7))
        cabin.position = CGPoint(x: width * (facing > 0 ? 0.12 : -0.12), y: 0)
        car.addChild(cabin)
        return car
    }

    private func makeLog(width: CGFloat, height: CGFloat) -> SKSpriteNode {
        let log = SKSpriteNode(color: SKColor(red: 0.55, green: 0.36, blue: 0.20, alpha: 1.0),
                                size: CGSize(width: width, height: height))
        log.zPosition = 1
        for i in 0..<3 {
            let ring = SKShapeNode(circleOfRadius: height * 0.18)
            ring.strokeColor = SKColor(red: 0.38, green: 0.24, blue: 0.12, alpha: 0.8)
            ring.fillColor = .clear
            ring.lineWidth = 1.5
            ring.position = CGPoint(x: -width / 2 + width * (CGFloat(i) + 0.5) / 3, y: 0)
            log.addChild(ring)
        }
        return log
    }
}
