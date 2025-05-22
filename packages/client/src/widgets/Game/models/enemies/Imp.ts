import { Enemy } from '@/widgets/Game/models/Enemy'
import { Base } from '../Base'
import { GameState } from '@/widgets/Game/types/gameState'
import ImpSprite from '../../sprites/imp.png'

export class Imp extends Enemy {
  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState
  ) {
    super(ctx, startPos, target, gameState, ImpSprite, 20, 34)
    this.speed = gameState.enemiesParams.imp.currentSpeed
    this.damage = gameState.enemiesParams.imp.currentDamage
    this.health = gameState.enemiesParams.imp.currentHealth
  }
}
