import { Enemy } from '@/widgets/Game/models/Enemy'
import { Base } from '../Base'
import { GameState } from '@/widgets/Game/types/gameState'
import WraithSprite from '../../sprites/wraith.png'

export class Wraith extends Enemy {
  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState
  ) {
    super(ctx, startPos, target, gameState, WraithSprite, 33, 68)
    this.speed = gameState.enemiesParams.wraith.currentSpeed
    this.damage = gameState.enemiesParams.wraith.currentDamage
    this.health = gameState.enemiesParams.wraith.currentHealth
    this.isInvisible = true
  }
}
