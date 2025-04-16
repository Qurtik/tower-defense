import { Base } from '@/widgets/Game/models/Base'
import { Turret } from '@/widgets/Game/models/Turret'
import { Enemy } from '@/widgets/Game/models/Enemy'
import { GameState } from '@/widgets/Game/types/gameState'
import isEqual from '@/shared/lib/utils/isEqual'

export class Game {
  readonly canvas: HTMLCanvasElement
  readonly ctx: CanvasRenderingContext2D
  readonly base: Base
  readonly turret: Turret
  private lastTime = 0
  private animationId = 0
  private enemies: Enemy[] = []
  private lastEnemySpawn = 0
  private spawnTime = 3000
  private gameState: GameState
  private prevGameState: GameState
  public onStateUpdate: (state: GameState) => void

  constructor(
    canvas: HTMLCanvasElement,
    initialState: GameState,
    onStateUpdate: (state: GameState) => void
  ) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.base = new Base(this.ctx, initialState.baseMaxHealth)
    this.turret = new Turret(this.ctx)
    this.gameState = { ...initialState }
    this.prevGameState = { ...initialState }
    this.onStateUpdate = onStateUpdate
  }

  start() {
    this.lastTime = performance.now()
    this.gameLoop()
  }

  // спавн нового врага
  private spawnEnemy() {
    // случайное опредение стороны спавна
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

    this.enemies.push(
      new Enemy(this.ctx, startPosition, this.base, this.gameState)
    )
  }

  private gameLoop() {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.turret.update(deltaTime, this.enemies)
    this.base.draw()
    this.turret.draw()

    // спавн нового врага через каждые this.spawnTime миллисекунд
    if (currentTime - this.lastEnemySpawn > this.spawnTime) {
      this.spawnEnemy()

      this.gameState.enemiesCount++

      this.lastEnemySpawn = performance.now()
    }

    this.enemies.forEach(enemy => enemy.update(deltaTime))

    // удаление мертвых врагов
    this.enemies = this.enemies.filter(enemy => enemy.health > 0)

    // обновление внешнего стейта игры, если какая-то характеристика поменялась
    if (!isEqual(this.gameState, this.prevGameState)) {
      this.onStateUpdate({ ...this.gameState })
      this.prevGameState = { ...this.prevGameState }
    }

    // game over
    if (this.gameState.baseHealth <= 0) {
      this.stop()
    } else {
      this.animationId = requestAnimationFrame(() => this.gameLoop())
    }
  }

  stop() {
    cancelAnimationFrame(this.animationId)
  }
}
