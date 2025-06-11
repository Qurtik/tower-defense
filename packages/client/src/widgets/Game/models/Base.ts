import baseSprite from '../sprites/base.png'
import { GameState } from '@/widgets/Game/types/gameState'

export class Base {
  private readonly ctx: CanvasRenderingContext2D
  private readonly image: HTMLImageElement
  public size = 96
  public center = { x: 0, y: 0 }
  private readonly gameState: GameState
  private lastRegenTime: number
  private isDamaging = false
  private damageEffectTimer = 0
  private readonly damageEffectDuration = 0.3

  constructor(ctx: CanvasRenderingContext2D, gameState: GameState) {
    this.ctx = ctx
    this.center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
    this.image = new Image()
    this.image.src = baseSprite
    this.gameState = gameState
    this.lastRegenTime = gameState.healDelay
    this.size = this.gameState.baseRadius * 2
  }

  public update(deltaTime: number): void {
    if (this.isDamaging) {
      this.damageEffectTimer -= deltaTime
      if (this.damageEffectTimer <= 0) {
        this.isDamaging = false
      }
    }

    this.lastRegenTime -= deltaTime
    this.tryTryHeal()
    this.draw()
  }

  public takeDamage(damage: number) {
    this.isDamaging = true
    this.damageEffectTimer = this.damageEffectDuration

    const perkRatio = this.gameState.activePerks.ENEMY_DAMAGE.timeLeft
      ? this.gameState.activePerks.ENEMY_DAMAGE.ratio
      : 1

    this.gameState.baseHealth -= damage * perkRatio
    if (this.gameState.baseHealth < 0) {
      this.gameState.baseHealth = 0
    }

    this.gameState.baseDamageEvents.push({
      value: damage * perkRatio,
      type: 'damage',
    })
  }

  private tryTryHeal() {
    if (
      this.lastRegenTime <= 0 &&
      this.gameState.healAmount > 0 &&
      this.gameState.baseHealth < this.gameState.baseMaxHealth
    ) {
      this.gameState.baseHealth += this.gameState.healAmount
      if (this.gameState.baseHealth > this.gameState.baseMaxHealth) {
        this.gameState.baseHealth = this.gameState.baseMaxHealth
      }
      this.gameState.baseDamageEvents.push({
        value: this.gameState.healAmount,
        type: 'heal',
      })
      this.lastRegenTime = this.gameState.healDelay
    }
  }

  private draw() {
    this.tryTryHeal()
    this.ctx.drawImage(
      this.image,
      this.center.x - this.size / 2,
      this.center.y - this.size / 2,
      this.size,
      this.size
    )

    if (this.isDamaging) {
      this.drawFlashEffect()
    }
  }

  private drawFlashEffect() {
    this.ctx.save()
    this.ctx.globalCompositeOperation = 'source-atop'

    this.ctx.fillStyle = `rgba(255, 50, 50, 0.5)`

    this.ctx.beginPath()
    this.ctx.arc(this.center.x, this.center.y, this.size / 2, 0, Math.PI * 2)
    this.ctx.fill()

    this.ctx.restore()
  }
}
