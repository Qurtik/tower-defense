import { EnemyType } from '@/widgets/Game/types/enemyTypes'

export interface GameState {
  baseRadius: number
  baseHealth: number
  baseMaxHealth: number
  enemiesKilled: number
  baseDamageEvents: { value: number; type: 'damage' | 'heal' }[]
  state: 'running' | 'paused' | 'gameOver'
  rerollsLeft: number
  turretDamage: number
  radarRange: number
  stealthDetectionRatio: number
  shotsDelay: number
  healDelay: number
  healAmount: number
  enemiesParams: Record<EnemyType, EnemyState>
  wave: number
  currentWaveEnemiesTotal: number
  currentWaveEnemiesSpawned: number
  currentWaveEnemiesKilled: number
  difficultyRatio: number
  spawnTime: number
  currentEnemyTypes: Set<EnemyType>
}

interface EnemyState {
  coreDamage: number
  coreSpeed: number
  coreHealth: number
  currentDamage: number
  currentSpeed: number
  currentHealth: number
}
