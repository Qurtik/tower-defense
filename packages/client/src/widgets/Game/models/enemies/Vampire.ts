import { Enemy } from '@/widgets/Game/models/Enemy'
import { Base } from '../Base'
import { GameState } from '@/widgets/Game/types/gameState'
import VampireSprite from '../../sprites/vampire.png'
import { Explosion } from '@/widgets/Game/models/Explosion'

export class Vampire extends Enemy {
  private readonly maxHealth: number

  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState,
    explosions: Explosion[]
  ) {
    super(ctx, startPos, target, gameState, VampireSprite, 33, 56, explosions)
    this.speed = gameState.enemiesParams.vampire.currentSpeed
    this.damage = gameState.enemiesParams.vampire.currentDamage
    this.health = gameState.enemiesParams.vampire.currentHealth
    this.maxHealth = gameState.enemiesParams.vampire.currentHealth
  }

  protected attack() {
    super.attack()
    this.health += Math.round(this.damage * 0.2)
    if (this.health > this.maxHealth) {
      this.health = this.maxHealth
    }
    console.log(this.health)
  }
}
