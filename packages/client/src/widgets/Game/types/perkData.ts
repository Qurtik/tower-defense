import { ReactNode } from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Enemy } from '@/widgets/Game/models/Enemy'

export interface PerkData {
  id: PerkType
  title: string
  description: string
  icon: ReactNode
  ratio: number
  timeLeft: number
  property?: keyof GameState['reinforcedStats']
  effect?: (enemies: Enemy[], gameState: GameState) => void
}

export const Perks = {
  enemySpeed: 'ENEMY_SPEED', // !
  enemyDamage: 'ENEMY_DAMAGE', // !
  turretDamage: 'TURRET_DAMAGE', //
  turretVampire: 'TURRET_VAMPIRE', //
  baseHeal: 'BASE_HEAL', //
  radarRange: 'RADAR_RANGE', // !
  turretDelay: 'TURRET_DELAY',
  stopSpawn: 'STOP_SPAWN', //
  massDamage: 'MASS_DAMAGE', //
} as const

export type PerkType = typeof Perks[keyof typeof Perks]
