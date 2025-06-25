import React from 'react'
import { PerkData, PerkType } from '@/widgets/Game/types/perkData'
import { Flex, Typography } from 'antd'
import { PERKS } from '@/widgets/Game/data/perks'
import styles from './ActivePerksList.module.scss'

interface ActivePerksListProps {
  activePerks: Record<PerkType, Pick<PerkData, 'ratio' | 'timeLeft'>>
}

const ActivePerksList = ({ activePerks }: ActivePerksListProps) => {
  const timeLeftPerks = Object.entries(activePerks)
    .map(([perk, data]) => ({
      id: perk,
      icon: PERKS[perk as PerkType].icon,
      timeLeft: Math.ceil(data.timeLeft),
      shouldShow: !PERKS[perk as PerkType].effect,
    }))
    .filter(p => p.timeLeft > 0 && p.shouldShow)

  return (
    <Flex vertical gap={5} className={styles.wrapper}>
      {timeLeftPerks.map(perk => (
        <Flex key={perk.id} gap={2} align="center">
          {perk.icon}
          <Typography.Text>{perk.timeLeft}</Typography.Text>
        </Flex>
      ))}
    </Flex>
  )
}

export default ActivePerksList
