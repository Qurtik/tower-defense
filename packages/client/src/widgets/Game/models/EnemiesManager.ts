import { Enemy } from '@/widgets/Game/models/Enemy'
import { Base } from '@/widgets/Game/models/Base'
import { GameState } from '@/widgets/Game/types/gameState'
import { Imp } from '@/widgets/Game/models/enemies/Imp'
import { Vampire } from '@/widgets/Game/models/enemies/Vampire'
import { Wraith } from '@/widgets/Game/models/enemies/Wraith'
import { Berserker } from '@/widgets/Game/models/enemies/Berserker'
import { EnemyType } from '@/widgets/Game/types/enemyTypes'
import { Explosion } from '@/widgets/Game/models/Explosion'

export class EnemiesManager {
  private lastSpawnTime = 0
  public enemies: Enemy[] = []
  private readonly canvas: HTMLCanvasElement
  private readonly base: Base
  private readonly ctx: CanvasRenderingContext2D
  private readonly gameState: GameState
  private currentWaveRecipe: EnemyType[] = []
  private spawnIndex = 0
  private enemyConstructors = {
    imp: Imp,
    wraith: Wraith,
    vampire: Vampire,
    berserker: Berserker,
  }
  private explosions: Explosion[] = []

  constructor(
    canvas: HTMLCanvasElement,
    base: Base,
    ctx: CanvasRenderingContext2D,
    gameState: GameState
  ) {
    this.canvas = canvas
    this.base = base
    this.ctx = ctx
    this.gameState = gameState
  }

  public update(currentTime: number, deltaTime: number): void {
    if (
      currentTime - this.lastSpawnTime > this.gameState.spawnTime &&
      this.gameState.currentWaveEnemiesTotal >
        this.gameState.currentWaveEnemiesSpawned
    ) {
      if (!this.gameState.activePerks.STOP_SPAWN.timeLeft) {
        this.spawnEnemy()
        this.gameState.currentWaveEnemiesSpawned++
        this.lastSpawnTime = performance.now()
      }
    }

    this.enemies.forEach(enemy => enemy.update(deltaTime))

    // удаление мертвых врагов
    const newEnemies = this.enemies.filter(enemy => enemy.health > 0)
    this.gameState.currentWaveEnemiesKilled =
      this.gameState.currentWaveEnemiesKilled +
      this.enemies.length -
      newEnemies.length
    this.enemies = newEnemies
    for (let i = this.explosions.length - 1; i >= 0; i--) {
      const explosion = this.explosions[i]
      explosion.update()
      if (explosion.frames.current >= explosion.frames.max - 1) {
        this.explosions.splice(i, 1)
      }
    }
  }

  public setWaveRecipe(recipe: EnemyType[]) {
    this.currentWaveRecipe = recipe
    this.spawnIndex = 0
    this.explosions = []
  }

  private spawnEnemy() {
    const startPosition = this.calculateSpawnPosition()
    const enemyType = this.currentWaveRecipe[this.spawnIndex]
    const EnemyConstructor = this.enemyConstructors[enemyType]

    this.enemies.push(
      new EnemyConstructor(
        this.ctx,
        startPosition,
        this.base,
        this.gameState,
        this.explosions
      )
    )

    this.spawnIndex++
  }

  // случайное опредение стороны спавна
  private calculateSpawnPosition() {
    const side = Math.floor(Math.random() * 4)
    const startPosition = { x: 0, y: 0 }

    const padding = 50 // Отступ от края

    // случайное определение клетки на стороне спавна
    switch (side) {
      case 0:
        startPosition.x = Math.random() * this.canvas.width
        startPosition.y = -padding
        break
      case 1:
        startPosition.x = this.canvas.width + padding
        startPosition.y = Math.random() * this.canvas.height
        break
      case 2:
        startPosition.x = Math.random() * this.canvas.width
        startPosition.y = this.canvas.height + padding
        break
      case 3:
        startPosition.x = -padding
        startPosition.y = Math.random() * this.canvas.height
        break
    }

    return startPosition
  }
}
