import { GameState } from '@/widgets/Game/types/gameState'

export class WavesManager {
  private readonly gameState: GameState

  constructor(gameState: GameState) {
    this.gameState = gameState
  }

  startNextWave() {
    this.gameState.wave++
    if (this.gameState.wave > 0) {
      if (this.gameState.spawnTime > 1000) {
        this.gameState.spawnTime -= 100
      }
      this.gameState.currentWaveEnemiesTotal += 2
      this.gameState.currentWaveEnemiesSpawned = 0
      this.gameState.currentWaveEnemiesKilled = 0
    }
    this.upgradeSwarm()
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
}
