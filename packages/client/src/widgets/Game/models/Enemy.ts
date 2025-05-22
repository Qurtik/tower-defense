import { Base } from './Base'
import { WithAnimation } from '@/widgets/Game/models/WithAnimation'
import { GameState } from '@/widgets/Game/types/gameState'

export class Enemy extends WithAnimation {
  protected readonly target: Base
  protected speed = 0
  public health = 0
  protected damage = 0
  public isInvisible = false
  public isFrozen = false
  private readonly shootRange = 200
  private readonly velocity: { x: number; y: number }
  private lastAttackTime: number
  private timeBetweenAttacks = 2
  private readonly gameState: GameState

  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState,
    sprite: string,
    spriteWidth: number,
    spriteHeight: number
  ) {
    super(ctx, sprite, startPos, spriteWidth, spriteHeight)
    this.target = target
    this.velocity = { x: 0, y: 0 }
    this.lastAttackTime = 0
    this.gameState = gameState
  }

  update(deltaTime: number) {
    this.draw()
    this.lastAttackTime -= deltaTime
    if (this.isFrozen) return

    const xDifference = this.target.center.x - this.position.x
    const yDifference = this.target.center.y - this.position.y
    const distance = Math.hypot(xDifference, yDifference)

    if (
      this.isInvisible &&
      distance <=
        (this.gameState.radarRange - this.gameState.baseRadius) *
          this.gameState.stealthDetectionRatio +
          this.gameState.baseRadius
    ) {
      this.isInvisible = false
    }

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

  protected attack() {
    if (!this.target) return

    this.gameState.baseHealth -= this.damage
    if (this.gameState.baseHealth < 0) {
      this.gameState.baseHealth = 0
    }

    if (this.isInvisible) {
      this.isInvisible = false
    }

    this.gameState.baseDamageEvents.push({ value: this.damage, type: 'damage' })
  }

  draw() {
    const angle =
      Math.atan2(
        this.target.center.y - this.position.y,
        this.target.center.x - this.position.x
      ) +
      Math.PI / 2

    const opacity = this.isInvisible ? 0.2 : 1

    super.draw(angle, 0, 0, opacity)
  }
}
