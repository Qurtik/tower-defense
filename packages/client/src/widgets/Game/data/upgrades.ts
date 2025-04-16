import { GameState } from '@/widgets/Game/types/gameState'

export interface UpgradeData {
  id: string
  title: string
  description: string
  chance: number
  apply: (gameState: GameState) => void
  condition?: (gameState: GameState) => boolean
}

export const UPGRADES: UpgradeData[] = [
  {
    id: 'railgun-small',
    title: 'Малое усиление рельсотрона',
    description: 'Урон +3',
    chance: 10,
    apply: gameState => {
      gameState.turretDamage = gameState.turretDamage + 3
    },
  },
  {
    id: 'railgun-medium',
    title: 'Среднее усиление рельсотрона',
    description: 'Урон +4',
    chance: 7,
    apply: gameState => {
      gameState.turretDamage = gameState.turretDamage + 4
    },
  },
  {
    id: 'railgun-large',
    title: 'Большое усиление рельсотрона',
    description: 'Урон +5',
    chance: 5,
    apply: gameState => {
      gameState.turretDamage = gameState.turretDamage + 5
    },
  },
  {
    id: 'system-grace',
    title: 'Милость системы',
    description: 'Макс. здоровье +30, полное восстановление',
    chance: 6,
    apply: gameState => {
      gameState.baseMaxHealth += 30
      gameState.baseHealth = gameState.baseMaxHealth
    },
  },
  {
    id: 'radar-large',
    title: 'Апгрейд радара',
    description: 'Увеличить радиус радара на 30',
    chance: 10,
    apply: gameState => {
      gameState.radarRange = gameState.radarRange + 30
    },
  },
  {
    id: 'max-health',
    title: 'Укрепление обшивки',
    description: 'Макс. здоровье +20',
    chance: 8,
    apply: gameState => {
      gameState.baseMaxHealth += 20
    },
  },
]
