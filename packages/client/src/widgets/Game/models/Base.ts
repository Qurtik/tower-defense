import baseSprite from '../sprites/base.png'
import { GameState } from '@/widgets/Game/types/gameState'

export class Base {
  private readonly ctx: CanvasRenderingContext2D
  private readonly image: HTMLImageElement
  public size = 96
  public center = { x: 0, y: 0 }
  private readonly gameState: GameState
  private lastRegenTime: number

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
  }

  public update(deltaTime: number): void {
    this.lastRegenTime -= deltaTime
    this.tryTryHeal()
    this.draw()
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
  }
}
