import { GameState } from '@/widgets/Game/types/gameState'
import { UPGRADES } from '@/widgets/Game/data/upgrades'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'

export function getRandomUpgrades(
  count: number,
  gameState: GameState,
  excludeIds: string[] = []
): UpgradeData[] {
  const result: UpgradeData[] = []
  const pool = UPGRADES.filter(
    u => !excludeIds.includes(u.id) && (!u.condition || u.condition(gameState))
  )

  for (let i = 0; i < count; i++) {
    const totalChance = pool.reduce((sum, u) => sum + u.chance, 0)
    const rand = Math.random() * totalChance

    let cumulative = 0
    for (let j = 0; j < pool.length; j++) {
      cumulative += pool[j].chance
      if (rand <= cumulative) {
        result.push(pool[j])
        excludeIds.push(pool[j].id)
        pool.splice(j, 1)
        break
      }
    }
  }

  return result
}
