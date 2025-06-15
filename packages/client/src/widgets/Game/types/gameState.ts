import { EnemyType } from '@/widgets/Game/types/enemyTypes'
import { PerkData, PerkType } from '@/widgets/Game/types/perkData'

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
  activePerks: Record<PerkType, Pick<PerkData, 'ratio' | 'timeLeft'>>
  reinforcedStats: ReinforcedStats
}

interface ReinforcedStats {
  turretDamage: number
  shotsDelay: number
  radarRange: number
}

interface EnemyState {
  coreDamage: number
  coreSpeed: number
  coreHealth: number
  currentDamage: number
  currentSpeed: number
  currentHealth: number
}
