import React from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Typography } from 'antd'
import {
  HeartPulse,
  Radar,
  Rocket,
  ScanHeart,
  Shield,
  TimerReset,
} from 'lucide-react'
import { getDeclension } from '@/shared/lib/utils/getDeclension'
import ParamsList from '@/widgets/Game/ui/HUD/CurrentParams/ParamsList'

const SystemParams = ({ gameState }: { gameState: GameState }) => {
  const data = [
    {
      icon: <Rocket size={30} />,
      value: `${gameState.turretDamage} ${getDeclension(
        gameState.turretDamage,
        ['единица', 'единицы', 'единиц']
      )}`,
      tooltip: 'Урон турели',
    },
    {
      icon: <Radar size={30} />,
      value: `${gameState.radarRange} ${getDeclension(gameState.radarRange, [
        'километр',
        'километра',
        'километров',
      ])}`,
      tooltip: 'Радиус радара',
    },
    {
      icon: <Shield size={30} />,
      value: `${gameState.baseMaxHealth} ${getDeclension(
        gameState.baseMaxHealth,
        ['единица', 'единицы', 'единиц']
      )}`,
      tooltip: 'Максимальная броня',
    },
    {
      icon: <HeartPulse size={30} />,
      value: `${gameState.healDelay} ${getDeclension(gameState.healDelay, [
        'секунда',
        'секунды',
        'секунд',
      ])}`,
      tooltip: 'Частота регенерации брони',
    },
    {
      icon: <ScanHeart size={30} />,
      value: `${gameState.healAmount} ${getDeclension(gameState.healAmount, [
        'единица',
        'единицы',
        'единиц',
      ])}`,
      tooltip: 'Размер периодически регенерируемой брони',
    },
    {
      icon: <TimerReset size={30} />,
      value: `${gameState.shotsDelay} ${getDeclension(gameState.shotsDelay, [
        'секунда',
        'секунды',
        'секунд',
      ])}`,
      tooltip: 'Задержка между выстрелами',
    },
  ]

  const { Title } = Typography

  return (
    <div>
      <Title level={5}>Боевой протокол:</Title>
      <ParamsList data={data} />
    </div>
  )
}

export default SystemParams
