import { Base } from '@/widgets/Game/models/Base'
import { Turret } from '@/widgets/Game/models/Turret'
import { GameState } from '@/widgets/Game/types/gameState'
import isEqual from '@/shared/lib/utils/isEqual'
import { EnemiesManager } from '@/widgets/Game/models/EnemiesManager'
import { WavesManager } from '@/widgets/Game/models/WavesManager'

export class Game {
  private readonly canvas: HTMLCanvasElement
  private readonly ctx: CanvasRenderingContext2D
  private readonly base: Base
  private readonly turret: Turret
  private lastTime = 0
  private animationId = 0
  readonly gameState: GameState
  private prevGameState: GameState
  public onStateUpdate: (state: GameState) => void
  private endWaveCountdown = 10
  private readonly enemiesManager: EnemiesManager
  private readonly wavesManager: WavesManager

  constructor(
    canvas: HTMLCanvasElement,
    initialState: GameState,
    onStateUpdate: (state: GameState) => void
  ) {
    this.canvas = canvas
    this.ctx = canvas.getContext('2d')!
    this.gameState = { ...initialState }
    this.prevGameState = { ...initialState }
    this.onStateUpdate = onStateUpdate
    this.base = new Base(this.ctx, this.gameState)
    this.turret = new Turret(this.ctx, this.gameState)
    this.enemiesManager = new EnemiesManager(
      canvas,
      this.base,
      this.ctx,
      this.gameState
    )
    this.wavesManager = new WavesManager(this.gameState)
  }

  private gameLoop() {
    const currentTime = performance.now()
    const deltaTime = (currentTime - this.lastTime) / 1000
    this.lastTime = currentTime

    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    this.base.update(deltaTime)
    this.turret.update(deltaTime, this.enemiesManager.enemies)
    this.enemiesManager.update(currentTime, deltaTime)

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

  start() {
    const newWaveRecipe = this.wavesManager.startNextWave()
    this.gameState.currentEnemyTypes = new Set(newWaveRecipe)
    this.enemiesManager.setWaveRecipe(newWaveRecipe)
    this.endWaveCountdown = 10
    this.gameState.state = 'running'
    this.lastTime = performance.now()
    this.gameLoop()
  }

  stop() {
    cancelAnimationFrame(this.animationId)
  }
}
