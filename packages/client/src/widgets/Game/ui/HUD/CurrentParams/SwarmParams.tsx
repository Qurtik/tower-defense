import React from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Typography } from 'antd'
import { Gauge, Heart, Rocket, TimerReset } from 'lucide-react'
import { getDeclension } from '@/shared/lib/utils/getDeclension'
import ParamsList from '@/widgets/Game/ui/HUD/CurrentParams/ParamsList'

const SwarmParams = ({ gameState }: { gameState: GameState }) => {
  const data = [
    {
      icon: <Rocket size={30} />,
      value: `${gameState.enemiesParams.vampire.currentDamage} ${getDeclension(
        gameState.enemiesParams.vampire.currentDamage,
        ['единица', 'единицы', 'единиц']
      )}`,
      tooltip: 'Урон врага',
    },
    {
      icon: <Heart size={30} />,
      value: `${gameState.enemiesParams.vampire.currentHealth} ${getDeclension(
        gameState.enemiesParams.vampire.currentHealth,
        ['единица', 'единицы', 'единиц']
      )}`,
      tooltip: 'Здоровье врага',
    },
    {
      icon: <Gauge size={30} />,
      value: `${(gameState.enemiesParams.vampire.currentSpeed * 100).toFixed(
        0
      )} ${getDeclension(gameState.enemiesParams.vampire.currentSpeed, [
        'км/сек',
        'км/сек',
        'км/сек',
      ])}`,
      tooltip: 'Скорость врага',
    },
    {
      icon: <TimerReset size={30} />,
      value: `${gameState.spawnTime / 1000} ${getDeclension(
        gameState.spawnTime / 1000,
        ['секунда', 'секунды', 'секунд']
      )}`,
      tooltip: 'Интервал вторжения врага',
    },
  ]

  const { Title } = Typography

  return (
    <div>
      <Title level={5}>Эволюция роя:</Title>
      <ParamsList data={data} />
    </div>
  )
}

export default SwarmParams
