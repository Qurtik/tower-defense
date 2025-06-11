import React, { useState } from 'react'
import { Button, Card, Typography } from 'antd'
import styles from './UpgradeScreen.module.scss'
import Upgrade from '@/widgets/Game/ui/HUD/UpgradeScreen/Upgrade/Upgrade'
import { GameState } from '@/widgets/Game/types/gameState'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'
import { PerkData } from '@/widgets/Game/types/perkData'

interface Props {
  onSelect: (upgrade: UpgradeData | PerkData) => void
  onReroll?: () => void
  upgrades: (UpgradeData | PerkData)[]
  gameState: GameState
  canReroll: boolean
  showRerollButton: boolean
  title: string
}

const UpgradeScreen = ({
  onSelect,
  onReroll,
  upgrades,
  gameState,
  canReroll,
  showRerollButton,
  title,
}: Props) => {
  const { Title } = Typography
  const [selected, setSelected] = useState<string | null>(null)

  const handleReroll = () => {
    setSelected(null)
    onReroll && onReroll()
  }

  return (
    <Card className={styles.upgradeScreen}>
      <Title level={3}>{title}</Title>
      <div className={styles.upgradesContainer}>
        {upgrades.map(upgrade => (
          <Upgrade
            key={upgrade.id}
            title={upgrade.title}
            description={upgrade.description}
            onClick={() => setSelected(upgrade.id)}
            selected={selected === upgrade.id}
            icon={upgrade.icon}
          />
        ))}
      </div>
      <div className={styles.buttonBar}>
        {showRerollButton ? (
          <Button onClick={handleReroll} disabled={!canReroll}>
            Обновить ({gameState.rerollsLeft})
          </Button>
        ) : (
          <div></div>
        )}
        <Button
          type="primary"
          disabled={!selected}
          onClick={() => {
            const chosen = upgrades.find(u => u.id === selected)
            if (chosen) {
              onSelect(chosen)
            }
          }}>
          Выбрать
        </Button>
      </div>
    </Card>
  )
}

export default UpgradeScreen
