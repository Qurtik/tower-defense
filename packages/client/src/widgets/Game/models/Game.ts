import { Base } from '@/widgets/Game/models/Base'
import { Turret } from '@/widgets/Game/models/Turret'

export class Game {
  private canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  private base: Base
  private turret: Turret
  private lastTime = 0
  private animationId = 0

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.base = new Base(this.ctx)
    this.turret = new Turret(this.ctx)
  }

  start() {
    this.lastTime = performance.now()
    this.gameLoop()
  }

  private gameLoop() {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.turret.update(deltaTime)
    this.base.draw()
    this.turret.draw()

    this.animationId = requestAnimationFrame(() => this.gameLoop())
  }

  stop() {
    cancelAnimationFrame(this.animationId)
  }
}
