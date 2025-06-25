import { GameState } from '@/widgets/Game/types/gameState'
import { EnemyType } from '@/widgets/Game/types/enemyTypes'

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

    return this.generateWaveRecipe(
      this.gameState.wave,
      this.gameState.currentWaveEnemiesTotal
    )
  }

  private generateWaveRecipe(
    waveNumber: number,
    totalEnemies: number
  ): EnemyType[] {
    let waveRecipe: EnemyType[] = []

    if (waveNumber <= 1) {
      waveRecipe = Array(totalEnemies).fill('imp')
    } else if (waveNumber <= 3) {
      const third = Math.ceil(totalEnemies / 3)
      waveRecipe = [
        ...Array(third).fill('wraith'),
        ...Array(totalEnemies - third).fill('imp'),
      ]
    } else if (waveNumber <= 5) {
      const half = Math.ceil(totalEnemies / 2)
      waveRecipe = [
        ...Array(half).fill('imp'),
        ...Array(totalEnemies - half).fill('wraith'),
      ]
    } else if (waveNumber <= 7) {
      const third = Math.ceil(totalEnemies / 3)
      waveRecipe = [
        ...Array(third).fill('imp'),
        ...Array(third).fill('vampire'),
        ...Array(totalEnemies - 2 * third).fill('wraith'),
      ]
    } else {
      const quarter = Math.ceil(totalEnemies / 4)
      waveRecipe = [
        ...Array(quarter).fill('imp'),
        ...Array(quarter).fill('vampire'),
        ...Array(quarter).fill('wraith'),
        ...Array(totalEnemies - 3 * quarter).fill('berserker'),
      ]
    }

    this.shuffleArray(waveRecipe)

    return waveRecipe
  }

  private shuffleArray(array: EnemyType[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1))
      ;[array[i], array[j]] = [array[j], array[i]]
    }
  }

  upgradeSwarm() {
    const enemyTypes = Object.keys(this.gameState.enemiesParams) as Array<
      keyof typeof this.gameState.enemiesParams
    >

    enemyTypes.forEach(enemyType => {
      const enemyParams = this.gameState.enemiesParams[enemyType]
      const { coreHealth, coreSpeed, coreDamage } = enemyParams
      const { wave, difficultyRatio } = this.gameState

      enemyParams.currentHealth = Math.round(
        coreHealth + coreHealth * difficultyRatio * wave * 1.5
      )

      enemyParams.currentSpeed = coreSpeed + coreSpeed * difficultyRatio * wave

      enemyParams.currentDamage = Math.round(
        coreDamage + coreDamage * difficultyRatio * wave
      )
    })
  }
}
