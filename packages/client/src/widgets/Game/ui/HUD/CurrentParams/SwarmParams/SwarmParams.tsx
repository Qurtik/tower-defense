import React from 'react'
import { GameState } from '@/widgets/Game/types/gameState'
import { Carousel, Divider, Typography } from 'antd'
import {
  ChevronLeft,
  ChevronRight,
  Gauge,
  Heart,
  Rocket,
  TimerReset,
} from 'lucide-react'
import { getDeclension } from '@/shared/lib/utils/getDeclension'
import ParamsList from '@/widgets/Game/ui/HUD/CurrentParams/ParamsList/ParamsList'
import Imp from '../../../../sprites/imp.png'
import Wraith from '../../../../sprites/wraith.png'
import Vampire from '../../../../sprites/vampire.png'
import Berserker from '../../../../sprites/berserker.png'
import { EnemyType } from '@/widgets/Game/types/enemyTypes'
import styles from './SwarmParams.module.scss'
import { useTheme } from '@/shared/context/ThemeContext'
import { Themes } from '@/shared/constants/themes'

const enemiesData: Record<
  EnemyType,
  { name: string; image: string; feature?: string }
> = {
  imp: {
    name: 'Имп',
    image: Imp,
  },
  wraith: {
    name: 'Призрак',
    image: Wraith,
    feature: 'Невидим до своей атаки или обнаружения антистелсом',
  },
  vampire: {
    name: 'Вампир',
    image: Vampire,
    feature: 'Поглощает часть нанесенного урона',
  },
  berserker: {
    name: 'Берсеркер',
    image: Berserker,
    feature: 'Чем сильнее ранен — тем опаснее',
  },
}

const SwarmParams = ({ gameState }: { gameState: GameState }) => {
  const { theme } = useTheme()

  const commonData = [
    {
      icon: <TimerReset size={30} />,
      value: `${gameState.spawnTime / 1000} ${getDeclension(
        gameState.spawnTime / 1000,
        ['секунда', 'секунды', 'секунд']
      )}`,
      tooltip: 'Интервал вторжения врагов',
    },
  ]

  const enemyTypesData = [...gameState.currentEnemyTypes].map(enemyType => ({
    name: enemiesData[enemyType].name,
    image: enemiesData[enemyType].image,
    feature: enemiesData[enemyType].feature,
    data: [
      {
        icon: <Rocket size={30} />,
        value: `${
          gameState.enemiesParams[enemyType].currentDamage
        } ${getDeclension(gameState.enemiesParams[enemyType].currentDamage, [
          'единица',
          'единицы',
          'единиц',
        ])}`,
        tooltip: 'Урон врага',
      },
      {
        icon: <Heart size={30} />,
        value: `${
          gameState.enemiesParams[enemyType].currentHealth
        } ${getDeclension(gameState.enemiesParams[enemyType].currentHealth, [
          'единица',
          'единицы',
          'единиц',
        ])}`,
        tooltip: 'Здоровье врага',
      },
      {
        icon: <Gauge size={30} />,
        value: `${(
          gameState.enemiesParams[enemyType].currentSpeed * 100
        ).toFixed(0)} ${getDeclension(
          gameState.enemiesParams[enemyType].currentSpeed,
          ['км/сек', 'км/сек', 'км/сек']
        )}`,
        tooltip: 'Скорость врага',
      },
    ],
  }))

  const { Title, Text } = Typography

  return (
    <div>
      <Title level={5}>Эволюция роя:</Title>
      <ParamsList data={commonData} tooltipPlacement="right" />
      <Carousel
        className={styles.carousel}
        arrows={enemyTypesData.length > 1}
        dots={false}
        nextArrow={
          <ChevronRight color={theme === Themes.DARK ? '#ececec' : '#000'} />
        }
        prevArrow={
          <ChevronLeft color={theme === Themes.DARK ? '#ececec' : '#000'} />
        }>
        {enemyTypesData.map(enemy => (
          <div key={enemy.name}>
            <div className={styles.dataContainer} key={enemy.name}>
              <span className={styles.name}>{enemy.name}</span>
              <ParamsList data={enemy.data} tooltipPlacement="right" />
              <img
                className={styles.image}
                src={enemy.image}
                alt={enemy.name}></img>
              {enemy.feature && <Text>{enemy.feature}</Text>}
            </div>
          </div>
        ))}
      </Carousel>
    </div>
  )
}

export default SwarmParams
