import turretSprite from '../sprites/turret.png'
import { Enemy } from '@/widgets/Game/models/Enemy'
import { Bullet } from '@/widgets/Game/models/Bullet'

export class Turret {
  readonly ctx: CanvasRenderingContext2D
  readonly image: HTMLImageElement
  private position: { x: number; y: number }
  private rotation = 0
  private range = 300
  private damage = 3
  private timeBetweenShots = 2
  private lastShotTime: number
  private target: Enemy | null = null
  private size = 96
  private bullets: Bullet[] = []
  private radarAngle = 0
  private radarSpeed = 3 // Скорость вращения радара

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.position = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
    this.image = new Image()
    this.image.src = turretSprite
    this.lastShotTime = 0
  }

  public update(deltaTime: number, enemies: Enemy[]) {
    this.radarAngle += this.radarSpeed * deltaTime
    if (this.radarAngle > Math.PI * 2) this.radarAngle = 0

    this.updateBullets()
    this.lastShotTime -= deltaTime

    enemies.forEach(enemy => {
      const distance = Math.hypot(
        enemy.position.x - this.position.x,
        enemy.position.y - this.position.y
      )

      if (distance <= this.range) {
        this.drawEnemyHighlight(enemy)
      }
    })

    // Ищем новую цель, если текущая мертва или вне радиуса
    if (
      !this.target ||
      this.target.health <= 0 ||
      !this.isInRange(this.target)
    ) {
      this.findTarget(enemies)
    }

    // Поворачиваемся к цели
    if (this.target) {
      this.tryShoot()
    }
    this.draw()
  }

  private isInRange(enemy: Enemy): boolean {
    const dx = enemy.position.x - this.position.x
    const dy = enemy.position.y - this.position.y
    return Math.sqrt(dx * dx + dy * dy) <= this.range
  }

  private findTarget(enemies: Enemy[]) {
    // Ищем ближайшего живого врага в радиусе
    const validTargets = enemies.filter(e => e.health > 0 && this.isInRange(e))

    if (validTargets.length > 0) {
      // Сортируем по расстоянию и берем ближайшего
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

  private rotateToTarget() {
    if (!this.target) return

    const dx = this.target.position.x - this.position.x
    const dy = this.target.position.y - this.position.y
    this.rotation = Math.atan2(dy, dx)
  }

  private tryShoot() {
    if (!this.target) return

    if (this.lastShotTime <= 0) {
      this.rotateToTarget()
      this.shoot()
      this.lastShotTime = this.timeBetweenShots
    }
  }

  private shoot() {
    if (!this.target) return

    this.bullets.push(
      new Bullet(
        this.ctx,
        { x: this.position.x, y: this.position.y },
        this.target,
        this.damage
      )
    )
  }

  private updateBullets() {
    for (let i = this.bullets.length - 1; i >= 0; i--) {
      const bullet = this.bullets[i]
      bullet.update()

      // Удаляем снаряды, которые попали в цель или улетели слишком далеко
      if (bullet.shouldRemove) {
        this.bullets.splice(i, 1)
      }
    }
  }

  private drawRadar() {
    const center = this.position
    const outerRadius = this.range
    const innerRadius = outerRadius * 0.7

    // Основной круг радиуса
    this.ctx.beginPath()
    this.ctx.arc(center.x, center.y, outerRadius, 0, Math.PI * 2)
    this.ctx.strokeStyle = 'rgba(100, 255, 100, 0.1)'
    this.ctx.lineWidth = 1
    this.ctx.stroke()

    // Эффект "сканирования"
    this.ctx.beginPath()
    this.ctx.arc(
      center.x,
      center.y,
      outerRadius,
      this.radarAngle - 0.3,
      this.radarAngle + 0.3
    )
    this.ctx.lineTo(center.x, center.y)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(100, 255, 100, 0.1)'
    this.ctx.fill()

    // Центральные кольца
    for (let r = innerRadius; r <= outerRadius; r += outerRadius * 0.1) {
      this.ctx.beginPath()
      this.ctx.arc(center.x, center.y, r, 0, Math.PI * 2)
      this.ctx.strokeStyle = `rgba(100, 255, 100, ${
        0.1 - (r / outerRadius) * 0.05
      })`
      this.ctx.stroke()
    }
  }

  private drawEnemyHighlight(enemy: Enemy) {
    // Пульсирующий эффект
    const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 0.8

    // Круг подсветки
    this.ctx.beginPath()
    this.ctx.arc(
      enemy.position.x,
      enemy.position.y,
      20 * pulse, // Пульсирующий размер
      0,
      Math.PI * 2
    )

    // Разный цвет для текущей цели
    const isCurrentTarget = this.target === enemy
    this.ctx.strokeStyle = isCurrentTarget
      ? 'rgba(255, 0, 0, 0.5)'
      : 'rgba(255, 150, 50, 0.3)'

    this.ctx.lineWidth = 2
    this.ctx.stroke()
  }

  public draw() {
    // Рисуем турель
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

    this.drawRadar()

    // Рисуем снаряды
    this.bullets.forEach(bullet => bullet.draw())

    // Дебаг-рисование радиуса (можно убрать)
    // this.ctx.beginPath()
    // this.ctx.arc(this.position.x, this.position.y, this.range, 0, Math.PI * 2)
    // this.ctx.strokeStyle = 'rgba(255, 0, 0, 0.1)'
    // this.ctx.stroke()
  }
}
