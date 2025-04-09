import baseSprite from '../sprites/base.png'

export class Base {
  private ctx: CanvasRenderingContext2D
  readonly image: HTMLImageElement
  private position: { x: number; y: number }
  private size = 128

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.position = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
    this.image = new Image()
    this.image.src = baseSprite
  }

  draw() {
    this.ctx.drawImage(
      this.image,
      this.position.x - this.size / 2,
      this.position.y - this.size / 2,
      this.size,
      this.size
    )
  }
}
