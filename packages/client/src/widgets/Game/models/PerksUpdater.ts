import cloneDeep from '@/shared/lib/utils/cloneDeep'
import { defaultPerks, PERKS } from '@/widgets/Game/data/perks'
import { PerkData, PerkType } from '@/widgets/Game/types/perkData'
import { GameState } from '@/widgets/Game/types/gameState'
import { EnemiesManager } from '@/widgets/Game/models/EnemiesManager'

export class PerksUpdater {
  private readonly gameState: GameState
  private readonly enemiesManager: EnemiesManager
  private perkTimer = 0

  constructor(gameState: GameState, enemiesManager: EnemiesManager) {
    this.gameState = gameState
    this.enemiesManager = enemiesManager
  }

  public clearActivePerks() {
    this.gameState.activePerks = cloneDeep(defaultPerks) as Record<
      PerkType,
      Pick<PerkData, 'ratio' | 'timeLeft'>
    >
    for (const key in this.gameState.reinforcedStats) {
      const perkKey = key as keyof typeof this.gameState.reinforcedStats
      this.gameState.reinforcedStats[perkKey] = this.gameState[perkKey]
    }
    this.perkTimer = 0
  }

  public update(deltaTime: number) {
    if (Object.values(this.gameState.activePerks).some(p => p.timeLeft)) {
      this.perkTimer += deltaTime
    }

    const stateToUpdate = {
      ...this.gameState.activePerks,
    }
    for (const perk in this.gameState.activePerks) {
      const perkKey = perk as keyof typeof this.gameState.activePerks
      const instantEffect = PERKS[perkKey].effect
      const isActivated = stateToUpdate[perkKey].timeLeft
      if (instantEffect && isActivated) {
        instantEffect(this.enemiesManager.enemies, this.gameState)
        stateToUpdate[perkKey] = {
          ...stateToUpdate[perkKey],
          timeLeft: 0,
        }
        this.gameState.activePerks = stateToUpdate
      }
    }
    if (this.perkTimer < 1) {
      return
    }
    for (const perk in this.gameState.activePerks) {
      const perkKey = perk as keyof typeof this.gameState.activePerks
      stateToUpdate[perkKey] = {
        ...stateToUpdate[perkKey],
        timeLeft:
          stateToUpdate[perkKey].timeLeft > 0
            ? stateToUpdate[perkKey].timeLeft - this.perkTimer
            : 0,
      }
      const dependentProperty = PERKS[perkKey].property
      if (dependentProperty) {
        if (stateToUpdate[perkKey].timeLeft > 0) {
          this.gameState.reinforcedStats[dependentProperty] =
            this.gameState[dependentProperty] * stateToUpdate[perkKey].ratio
        } else {
          this.gameState.reinforcedStats[dependentProperty] =
            this.gameState[dependentProperty]
        }
      }
    }
    this.gameState.activePerks = stateToUpdate
    this.perkTimer = 0
  }
}
