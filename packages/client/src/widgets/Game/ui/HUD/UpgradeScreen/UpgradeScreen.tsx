import React, { useState } from 'react'
import { Button, Card, Typography } from 'antd'
import styles from './UpgradeScreen.module.scss'
import Upgrade from '@/widgets/Game/ui/HUD/UpgradeScreen/Upgrade/Upgrade'
import { UpgradeData } from '@/widgets/Game/data/upgrades'
import { GameState } from '@/widgets/Game/types/gameState'

interface Props {
  onSelect: (upgrade: UpgradeData) => void
  onReroll: () => void
  upgrades: UpgradeData[]
  gameState: GameState
  canReroll: boolean
}

const UpgradeScreen = ({
  onSelect,
  onReroll,
  upgrades,
  gameState,
  canReroll,
}: Props) => {
  const { Title } = Typography
  const [selected, setSelected] = useState<string | null>(null)

  const handleReroll = () => {
    setSelected(null)
    onReroll()
  }

  return (
    <Card className={styles.upgradeScreen}>
      <Title level={3}>Выберите улучшение</Title>
      <div className={styles.upgradesContainer}>
        {upgrades.map(upgrade => (
          <Upgrade
            key={upgrade.id}
            title={upgrade.title}
            description={upgrade.description}
            onClick={() => setSelected(upgrade.id)}
            selected={selected === upgrade.id}
          />
        ))}
      </div>
      <div className={styles.buttonBar}>
        <Button onClick={handleReroll} disabled={!canReroll}>
          Reroll ({gameState.rerollsLeft})
        </Button>
        <Button
          type="primary"
          disabled={!selected}
          onClick={() => {
            const chosen = upgrades.find(u => u.id === selected)
            if (chosen) onSelect(chosen)
          }}>
          Выбрать
        </Button>
      </div>
    </Card>
  )
}

export default UpgradeScreen
