import { Base } from './Base'
import { WithAnimation } from '@/widgets/Game/models/WithAnimation'
import { GameState } from '@/widgets/Game/types/gameState'
import { Explosion } from '@/widgets/Game/models/Explosion'
import { SoundManager } from '@/widgets/Game/models/SoundManager'

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
  public explosions: Explosion[]
  private isFlashing = false
  private flashDuration = 0.3
  private flashTimer = 0
  private flashInterval = 0.1

  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState,
    sprite: string,
    spriteWidth: number,
    spriteHeight: number,
    explosions: Explosion[]
  ) {
    super(ctx, sprite, startPos, spriteWidth, spriteHeight)
    this.target = target
    this.velocity = { x: 0, y: 0 }
    this.lastAttackTime = 0
    this.gameState = gameState
    this.explosions = explosions
  }

  update(deltaTime: number) {
    this.draw()

    if (this.isFlashing) {
      this.flashTimer -= deltaTime
      if (this.flashTimer <= 0) {
        this.isFlashing = false
      }
    }

    this.lastAttackTime -= deltaTime
    if (this.isFrozen) return

    const xDifference = this.target.center.x - this.position.x
    const yDifference = this.target.center.y - this.position.y
    const distance = Math.hypot(xDifference, yDifference)

    if (
      this.isInvisible &&
      distance <=
        (this.gameState.reinforcedStats.radarRange -
          this.gameState.baseRadius) *
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
    this.isFlashing = true
    this.flashTimer = this.flashDuration
    this.health -= damage

    const isVampirePerkActive =
      this.gameState.activePerks.TURRET_VAMPIRE.timeLeft > 0

    if (isVampirePerkActive) {
      this.gameState.baseHealth +=
        damage * this.gameState.activePerks.TURRET_VAMPIRE.ratio
      if (this.gameState.baseHealth > this.gameState.baseMaxHealth) {
        this.gameState.baseHealth = this.gameState.baseMaxHealth
      } else {
        this.gameState.baseDamageEvents.push({
          value: damage * this.gameState.activePerks.TURRET_VAMPIRE.ratio,
          type: 'heal',
        })
      }
    }

    if (this.health <= 0) {
      this.gameState.enemiesKilled++
      SoundManager.getInstance().play('explosion')
      this.explosions.push(new Explosion(this.ctx, this.position))
    }
  }

  private move() {
    const angle = Math.atan2(
      this.target.center.y - this.position.y,
      this.target.center.x - this.position.x
    )

    const perkRatio = this.gameState.activePerks.ENEMY_SPEED.timeLeft
      ? this.gameState.activePerks.ENEMY_SPEED.ratio
      : 1

    this.velocity.x = Math.cos(angle) * (this.speed * perkRatio)
    this.velocity.y = Math.sin(angle) * (this.speed * perkRatio)

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

    const perkRatio = this.gameState.activePerks.ENEMY_DAMAGE.timeLeft
      ? this.gameState.activePerks.ENEMY_DAMAGE.ratio
      : 1

    this.gameState.baseHealth -= this.damage * perkRatio
    if (this.gameState.baseHealth < 0) {
      this.gameState.baseHealth = 0
    }

    if (this.isInvisible) {
      this.isInvisible = false
    }

    this.gameState.baseDamageEvents.push({
      value: this.damage * perkRatio,
      type: 'damage',
    })
  }

  draw() {
    const angle =
      Math.atan2(
        this.target.center.y - this.position.y,
        this.target.center.x - this.position.x
      ) +
      Math.PI / 2

    let opacity = this.isInvisible ? 0.2 : 1

    if (this.isFlashing) {
      const flashPhase = Math.floor(this.flashTimer / this.flashInterval) % 2
      opacity = flashPhase === 0 ? 0.5 : 1
    }

    super.draw(angle, 0, 0, opacity)
  }
}
