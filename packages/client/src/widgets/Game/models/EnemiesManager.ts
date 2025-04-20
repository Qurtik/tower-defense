import { Enemy } from '@/widgets/Game/models/Enemy'
import { Base } from '@/widgets/Game/models/Base'
import { GameState } from '@/widgets/Game/types/gameState'

export class EnemiesManager {
  private lastSpawnTime = 0
  public enemies: Enemy[] = []
  private readonly canvas: HTMLCanvasElement
  private readonly base: Base
  private readonly ctx: CanvasRenderingContext2D
  private readonly gameState: GameState

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
      this.spawnEnemy()
      this.gameState.currentWaveEnemiesSpawned++

      this.gameState.enemiesCount++

      this.lastSpawnTime = performance.now()
    }

    this.enemies.forEach(enemy => enemy.update(deltaTime))

    // удаление мертвых врагов
    const newEnemies = this.enemies.filter(enemy => enemy.health > 0)
    this.gameState.currentWaveEnemiesKilled =
      this.gameState.currentWaveEnemiesKilled +
      this.enemies.length -
      newEnemies.length
    this.enemies = newEnemies
  }

  private spawnEnemy() {
    const startPosition = this.calculateSpawnPosition()

    this.enemies.push(
      new Enemy(this.ctx, startPosition, this.base, this.gameState)
    )
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
