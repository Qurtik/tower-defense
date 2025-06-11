import React from 'react'
import { Button, Flex, Tooltip } from 'antd'
import styles from './AvailablePerks.module.scss'
import { PerkType } from '@/widgets/Game/types/perkData'
import { PERKS } from '@/widgets/Game/data/perks'
import { GameState } from '@/widgets/Game/types/gameState'

interface AvailableMPerksProps {
  perks: {
    id: string
    perk: PerkType
  }[]
  gameState: GameState
  setAvailablePerks: React.Dispatch<
    React.SetStateAction<{ id: string; perk: PerkType }[]>
  >
}

const AvailablePerks = ({
  perks,
  gameState,
  setAvailablePerks,
}: AvailableMPerksProps) => {
  const handleClick = (perk: PerkType, id: string) => {
    gameState.activePerks[perk].timeLeft += PERKS[perk].timeLeft
    const dependentProperty = PERKS[perk].property
    if (dependentProperty) {
      gameState.reinforcedStats[dependentProperty] =
        gameState[dependentProperty] * gameState.activePerks[perk].ratio
    }
    setAvailablePerks(prev => prev.filter(perk => perk.id !== id))
  }

  return (
    <Flex wrap="wrap" gap={10} className={styles.wrapper}>
      {perks.map(({ id, perk }) => (
        <Button
          disabled={gameState.state !== 'running'}
          key={id}
          type="text"
          style={{ padding: 0 }}
          onClick={() => handleClick(perk, id)}>
          <Tooltip title={PERKS[perk].description}>{PERKS[perk].icon}</Tooltip>
        </Button>
      ))}
    </Flex>
  )
}

export default AvailablePerks
