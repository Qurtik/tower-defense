import React from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Tooltip, Typography } from 'antd'
import styles from './WaveStats.module.scss'

const WaveStats = ({ gameState }: { gameState: GameState }) => {
  const { Title } = Typography

  return (
    <div className={styles.wrapper}>
      <Tooltip
        title="Врагов в волне убито / Врагов в волне всего"
        placement="top"
        styles={{
          root: {
            whiteSpace: 'nowrap',
            maxWidth: 'none',
          },
        }}>
        <Title
          level={
            3
          }>{`${gameState.currentWaveEnemiesKilled} / ${gameState.currentWaveEnemiesTotal}`}</Title>
      </Tooltip>
    </div>
  )
}

export default WaveStats
