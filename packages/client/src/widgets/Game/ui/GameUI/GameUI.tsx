import React from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Statistic, Typography } from 'antd'
import styles from './GameUI.module.scss'

const GameUi = ({ gameState }: { gameState: GameState }) => {
  return (
    <div className={styles.ui}>
      <Statistic
        title="HP базы"
        value={gameState.baseHealth}
        suffix={`/ ${gameState.baseMaxHealth}`}
      />
      <Statistic title="Количество врагов" value={gameState.enemiesCount} />
      <Statistic title="Врагов убито" value={gameState.enemiesKilled} />
    </div>
  )
}

export default GameUi
