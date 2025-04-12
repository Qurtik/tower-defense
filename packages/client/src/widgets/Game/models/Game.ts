import { Base } from '@/widgets/Game/models/Base'
import { Turret } from '@/widgets/Game/models/Turret'
import { Enemy } from '@/widgets/Game/models/Enemy'

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

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.base = new Base(this.ctx)
    this.turret = new Turret(this.ctx)
  }

  start() {
    this.lastTime = performance.now()
    this.gameLoop()
  }

  private spawnEnemy() {
    const side = Math.floor(Math.random() * 4) // 0-3 (стороны света)
    const startPosition = { x: 0, y: 0 }

    const padding = 50 // Отступ от края

    switch (side) {
      case 0: // Верх
        startPosition.x = Math.random() * this.canvas.width
        startPosition.y = -padding
        break
      case 1: // Право
        startPosition.x = this.canvas.width + padding
        startPosition.y = Math.random() * this.canvas.height
        break
      case 2: // Низ
        startPosition.x = Math.random() * this.canvas.width
        startPosition.y = this.canvas.height + padding
        break
      case 3: // Лево
        startPosition.x = -padding
        startPosition.y = Math.random() * this.canvas.height
        break
    }

    this.enemies.push(new Enemy(this.ctx, startPosition, this.base))
  }

  private gameLoop() {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.turret.update(deltaTime, this.enemies)
    this.base.draw()
    this.turret.draw()

    if (performance.now() - this.lastEnemySpawn > this.spawnTime) {
      this.spawnEnemy()
      this.lastEnemySpawn = performance.now()
    }

    // Обновление и отрисовка врагов
    this.enemies.forEach(enemy => enemy.update())

    // Удаление "мертвых" врагов
    this.enemies = this.enemies.filter(enemy => enemy.health > 0)

    this.animationId = requestAnimationFrame(() => this.gameLoop())
  }

  stop() {
    cancelAnimationFrame(this.animationId)
  }
}
