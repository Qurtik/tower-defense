import React from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Divider, Typography } from 'antd'
import {
  HeartPulse,
  Radar,
  Rocket,
  ScanHeart,
  Shield,
  TimerReset,
} from 'lucide-react'
import { getDeclension } from '@/shared/lib/utils/getDeclension'
import ParamsList from '@/widgets/Game/ui/HUD/CurrentParams/ParamsList/ParamsList'
import AvailablePerks from '@/widgets/Game/ui/HUD/CurrentParams/AvailablePerks/AvailablePerks'
import { PerkType } from '@/widgets/Game/types/perkData'

interface SystemParamsProps {
  gameState: GameState
  availablePerks: { id: string; perk: PerkType }[]
  setAvailablePerks: React.Dispatch<
    React.SetStateAction<{ id: string; perk: PerkType }[]>
  >
}

const SystemParams = ({
  gameState,
  availablePerks,
  setAvailablePerks,
}: SystemParamsProps) => {
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
      value: `${gameState.healDelay.toFixed(2)} ${getDeclension(
        gameState.healDelay,
        ['секунда', 'секунды', 'секунд']
      )}`,
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
      value: `${gameState.shotsDelay.toFixed(2)} ${getDeclension(
        gameState.shotsDelay,
        ['секунда', 'секунды', 'секунд']
      )}`,
      tooltip: 'Задержка между выстрелами',
    },
  ]

  const { Title } = Typography

  return (
    <div>
      <Title level={5}>Боевой протокол:</Title>
      <ParamsList data={data} tooltipPlacement="left" />
      <Divider />
      <AvailablePerks
        perks={availablePerks}
        gameState={gameState}
        setAvailablePerks={setAvailablePerks}
      />
    </div>
  )
}

export default SystemParams
