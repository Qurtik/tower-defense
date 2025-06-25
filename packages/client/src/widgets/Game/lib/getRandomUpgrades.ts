import { GameState } from '@/widgets/Game/types/gameState'
import { UPGRADES } from '@/widgets/Game/data/upgrades'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'
import { PERKS } from '@/widgets/Game/data/perks'

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

export function getRandomPerks() {
  const shuffled = [...Object.values(PERKS)]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled.slice(0, 3)
}
