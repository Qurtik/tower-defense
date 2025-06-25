import React from 'react'
import styles from './CurrentWave.module.scss'
import { GameState } from '@/widgets/Game/types/gameState'
import { Typography } from 'antd'

const CurrentWave = ({ gameState }: { gameState: GameState }) => {
  const { Title } = Typography

  return (
    <div className={styles.wrapper}>
      <Title level={2}>{`Волна ${gameState.wave + 1}`}</Title>
    </div>
  )
}

export default CurrentWave
