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
}
