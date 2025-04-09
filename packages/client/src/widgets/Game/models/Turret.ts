import turretSprite from '../sprites/turret.png'

export class Turret {
  private ctx: CanvasRenderingContext2D
  readonly image: HTMLImageElement
  private position: { x: number; y: number }
  private rotation = 0
  private rotationSpeed: number = Math.PI / 2
  private size = 128

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.position = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
    this.image = new Image()
    this.image.src = turretSprite
  }

  update(deltaTime: number) {
    this.rotation += this.rotationSpeed * deltaTime
  }

  draw() {
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
  }
}
