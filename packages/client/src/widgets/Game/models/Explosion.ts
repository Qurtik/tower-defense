import { WithAnimation } from '@/widgets/Game/models/WithAnimation'
import ExplosionSprite from '../sprites/explosion.png'

export class Explosion extends WithAnimation {
  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number }
  ) {
    super(ctx, ExplosionSprite, startPos, 64, 64, { max: 16, hold: 6 })
  }

  update() {
    this.animate()
    this.draw()
  }
}
