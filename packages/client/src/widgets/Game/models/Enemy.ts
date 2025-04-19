import { Base } from './Base'
import { WithAnimation } from '@/widgets/Game/models/WithAnimation'
import enemySprite from '../sprites/banshee.png'
import { GameState } from '@/widgets/Game/types/gameState'

export class Enemy extends WithAnimation {
  private readonly target: Base
  private readonly speed: number
  public health: number
  private readonly damage: number
  private readonly isInvisible = false
  private readonly isFrozen = false
  private readonly shootRange = 200
  private readonly velocity: { x: number; y: number }
  private lastAttackTime: number
  private timeBetweenAttacks = 2
  private readonly gameState: GameState

  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState
  ) {
    super(ctx, enemySprite, startPos, 34, 80)
    this.target = target
    this.velocity = { x: 0, y: 0 }
    this.lastAttackTime = 0
    this.gameState = gameState
    this.speed = gameState.enemiesParams.vampire.currentSpeed
    this.damage = gameState.enemiesParams.vampire.currentDamage
    this.health = gameState.enemiesParams.vampire.currentHealth
  }

  update(deltaTime: number) {
    this.draw()
    this.lastAttackTime -= deltaTime
    if (this.isFrozen) return

    const xDifference = this.target.center.x - this.position.x
    const yDifference = this.target.center.y - this.position.y
    const distance = Math.hypot(xDifference, yDifference)

    if (distance > this.height / 2 + this.target.size / 2) {
      this.move()
    } else {
      this.tryAttack()
    }
  }

  public takeDamage(damage: number) {
    this.health -= damage

    if (this.health <= 0) {
      this.gameState.enemiesKilled++
    }
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

  // определение возможости атаки, если с момента последней атаки прошло не меньше this.timeBetweenAttacks секунд
  private tryAttack() {
    if (!this.target) return

    if (this.lastAttackTime <= 0) {
      this.attack()
      this.lastAttackTime = this.timeBetweenAttacks
    }
  }

  private attack() {
    if (!this.target) return

    this.gameState.baseHealth -= this.damage
    if (this.gameState.baseHealth < 0) {
      this.gameState.baseHealth = 0
    }
    this.gameState.baseDamageEvents.push({ value: this.damage, type: 'damage' })
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
