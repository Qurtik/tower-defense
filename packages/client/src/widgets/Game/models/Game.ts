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
  readonly gameState: GameState
  private prevGameState: GameState
  public onStateUpdate: (state: GameState) => void
  private endWaveCountdown = 10
  private lastRegenTime: number

  constructor(
    canvas: HTMLCanvasElement,
    initialState: GameState,
    onStateUpdate: (state: GameState) => void
  ) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.base = new Base(this.ctx)
    this.gameState = { ...initialState }
    this.prevGameState = { ...initialState }
    this.turret = new Turret(this.ctx, this.gameState)
    this.onStateUpdate = onStateUpdate
    this.lastRegenTime = initialState.healDelay
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

    this.lastRegenTime -= deltaTime
    this.tryTryHeal()

    this.turret.update(deltaTime, this.enemies)
    this.base.draw()
    this.turret.draw()

    // спавн нового врага через каждые this.spawnTime миллисекунд
    if (
      currentTime - this.lastEnemySpawn > this.gameState.spawnTime &&
      this.gameState.currentWaveEnemiesTotal >
        this.gameState.currentWaveEnemiesSpawned
    ) {
      this.spawnEnemy()
      this.gameState.currentWaveEnemiesSpawned++

      this.gameState.enemiesCount++

      this.lastEnemySpawn = performance.now()
    }

    this.enemies.forEach(enemy => enemy.update(deltaTime))

    // удаление мертвых врагов
    const newEnemies = this.enemies.filter(enemy => enemy.health > 0)
    this.gameState.currentWaveEnemiesKilled =
      this.gameState.currentWaveEnemiesKilled +
      this.enemies.length -
      newEnemies.length
    this.enemies = newEnemies

    // обновление внешнего стейта игры, если какая-то характеристика поменялась
    if (!isEqual(this.gameState, this.prevGameState)) {
      this.onStateUpdate({ ...this.gameState })
      this.gameState.baseDamageEvents = []
      this.prevGameState = { ...this.gameState }
    }

    if (
      this.gameState.currentWaveEnemiesTotal ===
      this.gameState.currentWaveEnemiesKilled
    ) {
      this.gameState.state = 'paused'
    }

    if (this.gameState.baseHealth <= 0) {
      this.gameState.state = 'gameOver'
    }

    // остановка игры при окончании раунда или game over при полном остчете до конца
    if (this.endWaveCountdown === 0) {
      this.stop()
    } else {
      this.animationId = requestAnimationFrame(() => this.gameLoop())
    }

    // начало отсчета конца раунда/игры для отображаения оставшихся кадров анимации
    if (
      this.gameState.state === 'paused' ||
      this.gameState.state === 'gameOver'
    ) {
      this.endWaveCountdown--
    }
  }

  tryTryHeal() {
    if (
      this.lastRegenTime <= 0 &&
      this.gameState.healAmount > 0 &&
      this.gameState.baseHealth < this.gameState.baseMaxHealth
    ) {
      this.gameState.baseHealth += this.gameState.healAmount
      if (this.gameState.baseHealth > this.gameState.baseMaxHealth) {
        this.gameState.baseHealth = this.gameState.baseMaxHealth
      }
      this.gameState.baseDamageEvents.push({
        value: this.gameState.healAmount,
        type: 'heal',
      })
      this.lastRegenTime = this.gameState.healDelay
    }
  }

  start() {
    this.gameState.wave++
    if (this.gameState.wave > 0) {
      if (this.gameState.spawnTime > 1000) {
        this.gameState.spawnTime -= 100
      }
      this.endWaveCountdown = 10
      this.gameState.currentWaveEnemiesTotal += 2
      this.gameState.currentWaveEnemiesSpawned = 0
      this.gameState.currentWaveEnemiesKilled = 0
    }
    this.upgradeSwarm()
    this.gameState.state = 'running'
    this.lastTime = performance.now()
    this.gameLoop()
  }

  upgradeSwarm() {
    this.gameState.enemiesParams.vampire.currentHealth = Math.round(
      this.gameState.enemiesParams.vampire.coreHealth +
        this.gameState.enemiesParams.vampire.coreHealth *
          this.gameState.difficultyRatio *
          this.gameState.wave *
          1.5
    )
    this.gameState.enemiesParams.vampire.currentSpeed =
      this.gameState.enemiesParams.vampire.coreSpeed +
      this.gameState.enemiesParams.vampire.coreSpeed *
        this.gameState.difficultyRatio *
        this.gameState.wave
    this.gameState.enemiesParams.vampire.currentDamage = Math.round(
      this.gameState.enemiesParams.vampire.coreDamage +
        this.gameState.enemiesParams.vampire.coreDamage *
          this.gameState.difficultyRatio *
          this.gameState.wave
    )
  }

  stop() {
    cancelAnimationFrame(this.animationId)
  }
}
