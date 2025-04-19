import turretSprite from '../sprites/turret.png'
import { Enemy } from '@/widgets/Game/models/Enemy'
import { Bullet } from '@/widgets/Game/models/Bullet'
import { GameState } from '@/widgets/Game/types/gameState'
import { Radar } from '@/widgets/Game/models/Radar'

export class Turret {
  private readonly ctx: CanvasRenderingContext2D
  private readonly image: HTMLImageElement
  private readonly position: { x: number; y: number }
  private rotation = 0
  private lastShotTime: number
  private target: Enemy | null = null
  private readonly size = 96
  private readonly bullets: Bullet[] = []
  private readonly gameState: GameState
  private readonly radar: Radar

  constructor(ctx: CanvasRenderingContext2D, gameState: GameState) {
    this.ctx = ctx
    this.position = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
    this.image = new Image()
    this.image.src = turretSprite
    this.lastShotTime = 0
    this.gameState = gameState
    this.radar = new Radar(ctx, gameState)
  }

  public update(deltaTime: number, enemies: Enemy[]) {
    this.updateBullets()
    this.lastShotTime -= deltaTime

    if (
      !this.target ||
      this.target.health <= 0 ||
      !this.isInRange(this.target)
    ) {
      this.findTarget(enemies)
    }

    this.radar.update(deltaTime, this.target, enemies)

    if (this.target) {
      this.tryShoot()
    }
    this.draw()
  }

  // определеине нахохдения врага в радиусе поражения
  private isInRange(enemy: Enemy): boolean {
    const dx = enemy.position.x - this.position.x
    const dy = enemy.position.y - this.position.y
    return Math.sqrt(dx * dx + dy * dy) <= this.gameState.radarRange
  }

  // поиск новой цели, если предыдущей не было или она уничтожена
  private findTarget(enemies: Enemy[]) {
    const validTargets = enemies.filter(e => e.health > 0 && this.isInRange(e))

    if (validTargets.length > 0) {
      // сортируем всех врагов в радиусе поражения по расстоянию и берем ближайшего
      validTargets.sort((a, b) => {
        const distA = Math.hypot(
          a.position.x - this.position.x,
          a.position.y - this.position.y
        )
        const distB = Math.hypot(
          b.position.x - this.position.x,
          b.position.y - this.position.y
        )
        return distA - distB
      })
      this.target = validTargets[0]
    } else {
      this.target = null
    }
  }

  //  поворот туррели к цели
  private rotateToTarget() {
    if (!this.target) return

    const dx = this.target.position.x - this.position.x
    const dy = this.target.position.y - this.position.y
    this.rotation = Math.atan2(dy, dx)
  }

  // определение возможости атаки, если с момента последней атаки прошло не меньше this.timeBetweenShots секунд
  private tryShoot() {
    if (!this.target) return

    if (this.lastShotTime <= 0) {
      this.rotateToTarget()
      this.shoot()
      this.lastShotTime = this.gameState.shotsDelay
    }
  }

  private shoot() {
    if (!this.target) return

    this.bullets.push(
      new Bullet(
        this.ctx,
        { x: this.position.x, y: this.position.y },
        this.target,
        this.gameState.turretDamage
      )
    )
  }

  private updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i]
      bullet.update()

      if (bullet.shouldRemove) {
        this.bullets.splice(i, 1)
      }
    }
  }

  public draw() {
    this.ctx.save()
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(this.rotation)
    this.ctx.drawImage(
      this.image,
      -this.size / 4,
      -this.size / 2,
      this.size,
      this.size
    )
    this.ctx.restore()

    this.bullets.forEach(bullet => bullet.draw())
  }
}
