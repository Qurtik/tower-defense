import { Base } from './Base'
import { WithAnimation } from '@/widgets/Game/models/WithAnimation'
import enemySprite from '../sprites/banshee.png'

export class Enemy extends WithAnimation {
  private target: Base
  private speed = 0.3
  public health = 5
  private damage = 5
  private isInvisible = false
  private isFrozen = false
  private canShoot = true
  private shootRange = 200
  private isAttacking = false
  private velocity: { x: number; y: number }

  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base
  ) {
    super(ctx, enemySprite, startPos, 34, 80)
    this.target = target
    this.velocity = { x: 0, y: 0 }
  }

  update() {
    this.draw()
    if (this.isFrozen) return

    const xDifference = this.target.center.x - this.position.x
    const yDifference = this.target.center.y - this.position.y
    const distance = Math.hypot(xDifference, yDifference)

    if (distance > this.height / 2 + this.target.size / 2) {
      this.move()
    }
  }

  public takeDamage(damage: number) {
    this.health -= damage
  }

  private move() {
    const angle = Math.atan2(
      this.target.center.y - this.position.y,
      this.target.center.x - this.position.x
    )

    this.velocity.x = Math.cos(angle) * this.speed
    this.velocity.y = Math.sin(angle) * this.speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw() {
    if (this.isInvisible) return

    const angle =
      Math.atan2(
        this.target.center.y - this.position.y,
        this.target.center.x - this.position.x
      ) +
      Math.PI / 2

    super.draw(angle)
  }
}
