import SpriteKit

/// A small blocky "chicken" avatar built entirely from primitives, so the
/// project needs no external art assets.
final class PlayerNode: SKNode {
    private let body: SKShapeNode
    private let head: SKShapeNode

    override init() {
        let bodySize = CGSize(width: 30, height: 30)
        body = SKShapeNode(rectOf: bodySize, cornerRadius: 8)
        body.fillColor = .white
        body.strokeColor = SKColor(white: 0.8, alpha: 1.0)
        body.lineWidth = 1.5
        body.position = CGPoint(x: 0, y: 10)

        head = SKShapeNode(rectOf: CGSize(width: 20, height: 18), cornerRadius: 6)
        head.fillColor = .white
        head.strokeColor = SKColor(white: 0.8, alpha: 1.0)
        head.lineWidth = 1.5
        head.position = CGPoint(x: 0, y: 24)

        super.init()

        let beak = SKShapeNode(rectOf: CGSize(width: 8, height: 6), cornerRadius: 1)
        beak.fillColor = .orange
        beak.strokeColor = .clear
        beak.position = CGPoint(x: 0, y: 22)
        beak.zPosition = 1

        let leftEye = SKShapeNode(circleOfRadius: 1.6)
        leftEye.fillColor = .black
        leftEye.strokeColor = .clear
        leftEye.position = CGPoint(x: -5, y: 26)

        let rightEye = SKShapeNode(circleOfRadius: 1.6)
        rightEye.fillColor = .black
        rightEye.strokeColor = .clear
        rightEye.position = CGPoint(x: 5, y: 26)

        let comb = SKShapeNode(rectOf: CGSize(width: 6, height: 6), cornerRadius: 2)
        comb.fillColor = .systemRed
        comb.strokeColor = .clear
        comb.position = CGPoint(x: 0, y: 34)

        addChild(body)
        addChild(head)
        addChild(comb)
        addChild(beak)
        addChild(leftEye)
        addChild(rightEye)

        let shadow = SKShapeNode(ellipseOf: CGSize(width: 26, height: 10))
        shadow.fillColor = SKColor(white: 0, alpha: 0.25)
        shadow.strokeColor = .clear
        shadow.position = CGPoint(x: 0, y: -2)
        shadow.zPosition = -1
        addChild(shadow)

        zPosition = 10
    }

    required init?(coder aDecoder: NSCoder) {
        fatalError("init(coder:) has not been implemented")
    }

    /// Half-width used for AABB-style overlap checks against cars/logs.
    static let collisionHalfWidth: CGFloat = 12

    func playHop() {
        removeAction(forKey: "hop")
        let up = SKAction.moveBy(x: 0, y: GameConstants.hopHeight, duration: GameConstants.moveDuration / 2)
        up.timingMode = .easeOut
        let down = up.reversed()
        down.timingMode = .easeIn
        let squashDown = SKAction.scaleY(to: 0.85, duration: 0.04)
        let squashUp = SKAction.scaleY(to: 1.0, duration: 0.08)
        let hop = SKAction.sequence([squashDown, .group([up, squashUp]), down])
        run(hop, withKey: "hop")
    }

    func playBump() {
        let left = SKAction.moveBy(x: -4, y: 0, duration: 0.04)
        let right = SKAction.moveBy(x: 8, y: 0, duration: 0.08)
        let back = SKAction.moveBy(x: -4, y: 0, duration: 0.04)
        run(.sequence([left, right, back]))
    }

    func playDeath(reason: DeathReason) {
        removeAllActions()
        switch reason {
        case .hit:
            let spin = SKAction.rotate(byAngle: .pi * 4, duration: 0.5)
            let shrink = SKAction.scale(to: 0.1, duration: 0.5)
            run(.group([spin, shrink]))
        case .drowned:
            let sink = SKAction.moveBy(x: 0, y: -20, duration: 0.5)
            let fade = SKAction.fadeOut(withDuration: 0.5)
            run(.group([sink, fade]))
        }
    }
}
