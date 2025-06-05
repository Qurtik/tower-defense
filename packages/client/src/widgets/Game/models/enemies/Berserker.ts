import { Enemy } from '@/widgets/Game/models/Enemy'
import { Base } from '../Base'
import { GameState } from '@/widgets/Game/types/gameState'
import BerserkerSprite from '../../sprites/berserker.png'
import { Explosion } from '@/widgets/Game/models/Explosion'

export class Berserker extends Enemy {
  private readonly maxHealth: number

  constructor(
    ctx: CanvasRenderingContext2D,
    startPos: { x: number; y: number },
    target: Base,
    gameState: GameState,
    explosions: Explosion[]
  ) {
    super(ctx, startPos, target, gameState, BerserkerSprite, 35, 86, explosions)
    this.speed = gameState.enemiesParams.berserker.currentSpeed
    this.damage = gameState.enemiesParams.berserker.currentDamage
    this.health = gameState.enemiesParams.berserker.currentHealth
    this.maxHealth = gameState.enemiesParams.berserker.currentHealth
  }

  takeDamage(damage: number) {
    super.takeDamage(damage)
    console.log(this.health)
    const powerUp = (this.maxHealth - this.health) / this.maxHealth
    this.speed = this.speed + this.speed * powerUp
    this.damage = this.damage + Math.round(this.damage * powerUp)
  }
}
