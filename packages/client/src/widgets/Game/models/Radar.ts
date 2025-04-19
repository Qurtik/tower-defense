import { Enemy } from '@/widgets/Game/models/Enemy'
import { GameState } from '@/widgets/Game/types/gameState'

export class Radar {
  private angle = 0
  private readonly pulseSpeed = 3
  readonly ctx: CanvasRenderingContext2D
  private gameState: GameState
  private target: Enemy | null = null
  readonly position: { x: number; y: number }

  constructor(ctx: CanvasRenderingContext2D, gameState: GameState) {
    this.ctx = ctx
    this.gameState = gameState
    this.position = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
  }

  public update(deltaTime: number, target: Enemy | null, enemies: Enemy[]) {
    this.angle += this.pulseSpeed * deltaTime
    if (this.angle > Math.PI * 2) this.angle = 0
    this.target = target

    enemies.forEach(enemy => {
      const distance = Math.hypot(
        enemy.position.x - this.position.x,
        enemy.position.y - this.position.y
      )

      if (distance <= this.gameState.radarRange) {
        this.drawEnemyHighlight(enemy)
      }
    })

    this.drawRadar()
  }

  private drawRadar() {
    const center = this.position
    const outerRadius = this.gameState.radarRange
    const innerRadius = outerRadius * 0.7

    this.ctx.beginPath()
    this.ctx.arc(center.x, center.y, outerRadius, 0, Math.PI * 2)
    this.ctx.strokeStyle = 'rgba(100, 255, 100, 0.1)'
    this.ctx.lineWidth = 1
    this.ctx.stroke()

    this.ctx.beginPath()
    this.ctx.arc(
      center.x,
      center.y,
      outerRadius,
      this.angle - 0.3,
      this.angle + 0.3
    )
    this.ctx.lineTo(center.x, center.y)
    this.ctx.closePath()
    this.ctx.fillStyle = 'rgba(100, 255, 100, 0.1)'
    this.ctx.fill()

    for (let r = innerRadius; r <= outerRadius; r += outerRadius * 0.1) {
      this.ctx.beginPath()
      this.ctx.arc(center.x, center.y, r, 0, Math.PI * 2)
      this.ctx.strokeStyle = `rgba(100, 255, 100, ${
        0.1 - (r / outerRadius) * 0.05
      })`
      this.ctx.stroke()
    }
  }

  public drawEnemyHighlight(enemy: Enemy) {
    const pulse = Math.sin(Date.now() * 0.005) * 0.2 + 0.8

    this.ctx.beginPath()
    this.ctx.arc(enemy.position.x, enemy.position.y, 20 * pulse, 0, Math.PI * 2)

    const isCurrentTarget = this.target === enemy
    this.ctx.strokeStyle = isCurrentTarget
      ? 'rgba(255, 0, 0, 0.5)'
      : 'rgba(255, 150, 50, 0.3)'

    this.ctx.lineWidth = 2
    this.ctx.stroke()
  }
}
