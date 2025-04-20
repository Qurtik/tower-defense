export interface GameState {
  baseHealth: number
  baseMaxHealth: number
  enemiesCount: number
  enemiesKilled: number
  baseDamageEvents: { value: number; type: 'damage' | 'heal' }[]
  state: 'running' | 'paused' | 'gameOver'
  rerollsLeft: number
  turretDamage: number
  radarRange: number
  shotsDelay: number
  healDelay: number
  healAmount: number
  enemiesParams: {
    vampire: {
      coreDamage: number
      coreSpeed: number
      coreHealth: number
      currentDamage: number
      currentSpeed: number
      currentHealth: number
    }
  }
  wave: number
  currentWaveEnemiesTotal: number
  currentWaveEnemiesSpawned: number
  currentWaveEnemiesKilled: number
  difficultyRatio: number
  spawnTime: number
}
