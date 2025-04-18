import baseSprite from '../sprites/base.png'

export class Base {
  readonly ctx: CanvasRenderingContext2D
  readonly image: HTMLImageElement
  public size = 96
  public center = { x: 0, y: 0 }

  constructor(ctx: CanvasRenderingContext2D) {
    this.ctx = ctx
    this.center = {
      x: ctx.canvas.width / 2,
      y: ctx.canvas.height / 2,
    }
    this.image = new Image()
    this.image.src = baseSprite
  }

  public draw() {
    this.ctx.drawImage(
      this.image,
      this.center.x - this.size / 2,
      this.center.y - this.size / 2,
      this.size,
      this.size
    )
  }
}
