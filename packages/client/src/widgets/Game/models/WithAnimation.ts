export abstract class WithAnimation {
  public readonly position: { x: number; y: number }
  public readonly ctx: CanvasRenderingContext2D
  private readonly image: HTMLImageElement
  public readonly width: number
  public readonly height: number
  public frames = {
    max: 1,
    current: 0,
    elapsed: 0,
    hold: 3,
  }

  protected constructor(
    ctx: CanvasRenderingContext2D,
    imageSrc: string,
    position: { x: number; y: number },
    width: number,
    height: number,
    frames = { max: 1, hold: 3 }
  ) {
    this.ctx = ctx
    this.position = position
    this.width = width
    this.height = height
    this.image = new Image()
    this.image.src = imageSrc
    this.frames.max = frames.max
    this.frames.hold = frames.hold
  }

  // смена спрайта через каждые this.frames.hold кадров для плавности анимации
  protected animate() {
    this.frames.elapsed++
    if (this.frames.elapsed % this.frames.hold === 0) {
      this.frames.current++
      if (this.frames.current >= this.frames.max) {
        this.frames.current = 0
      }
    }
  }

  protected draw(rotation = 0, offsetX = 0, offsetY = 0, opacity = 1) {
    const cropWidth = this.image.width / this.frames.max
    const crop = {
      position: {
        x: cropWidth * this.frames.current,
        y: 0,
      },
      width: cropWidth,
      height: this.image.height,
    }

    this.ctx.save()
    this.ctx.translate(this.position.x, this.position.y)
    this.ctx.rotate(rotation)
    this.ctx.globalAlpha = opacity

    // вырезаем нужный спрайт анимации из png
    this.ctx.drawImage(
      this.image,
      crop.position.x,
      crop.position.y,
      crop.width,
      crop.height,
      -this.width / 2 + offsetX,
      -this.height / 2 + offsetY,
      this.width,
      this.height
    )

    this.ctx.restore()
  }

  abstract update(deltaTime?: number): void
}
