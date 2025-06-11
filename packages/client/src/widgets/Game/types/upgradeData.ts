import { GameState } from '@/widgets/Game/types/gameState'
import { ReactNode } from 'react'

export interface UpgradeData {
  id: string
  title: string
  description: string
  icon: ReactNode
  chance: number
  apply: (gameState: GameState) => void
  condition?: (gameState: GameState) => boolean
}
