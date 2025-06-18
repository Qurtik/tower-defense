import BerserkerSprite from '../sprites/berserker.png'
import ImpSprite from '../sprites/imp.png'
import VampireSprite from '../sprites/vampire.png'
import WraithSprite from '../sprites/wraith.png'
import BulletSprite from '../sprites/shot.png'
import ExplosionSprite from '../sprites/explosion.png'
import { WithAnimation } from '@/widgets/Game/models/WithAnimation'

const sprites = [
  BerserkerSprite,
  ImpSprite,
  VampireSprite,
  WraithSprite,
  BulletSprite,
  ExplosionSprite,
]

export const preloadImages = async () => {
  await Promise.all(sprites.map(src => WithAnimation.preloadImage(src)))
}
