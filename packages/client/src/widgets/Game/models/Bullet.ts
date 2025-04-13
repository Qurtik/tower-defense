import { Enemy } from './Enemy'
import { WithAnimation } from '@/widgets/Game/models/WithAnimation'
import bulletSprite from '../sprites/shot.png'

export class Bullet extends WithAnimation {
  private target: Enemy
  readonly damage: number
  private speed = 10
  public shouldRemove = false
  private angle = 0
  private velocity: { x: number; y: number }

  constructor(
    ctx: CanvasRenderingContext2D,
    position: { x: number; y: number },
    target: Enemy,
    damage: number
  ) {
    super(ctx, bulletSprite, position, 48, 48, { max: 2, hold: 4 })
    this.target = target
    this.damage = damage
    this.velocity = {
      x: 0,
      y: 0,
    }
    this.calculateAngle()
  }

  // опредение угла поворота снаряда к цели
  private calculateAngle() {
    const dx = this.target.position.x - this.position.x
    const dy = this.target.position.y - this.position.y
    this.angle = Math.atan2(dy, dx) // Угол к цели в радианах
  }

  update() {
    if (this.shouldRemove) return

    this.animate()
    this.calculateAngle()

    const dx = this.target.position.x - this.position.x
    const dy = this.target.position.y - this.position.y
    const distance = Math.sqrt(dx * dx + dy * dy)

    if (distance < 10) {
      this.target.takeDamage(this.damage)
      this.shouldRemove = true
      return
    }

    this.move()
  }

  private move() {
    this.velocity.x = Math.cos(this.angle) * this.speed
    this.velocity.y = Math.sin(this.angle) * this.speed

    this.position.x += this.velocity.x
    this.position.y += this.velocity.y
  }

  draw() {
    if (this.shouldRemove) return
    super.draw(this.angle + Math.PI / 2)
  }
}
