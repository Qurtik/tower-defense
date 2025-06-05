import { PerkData, Perks, PerkType } from '@/widgets/Game/types/perkData'
import {
  Ban,
  Bomb,
  Heart,
  HeartPlus,
  Radar,
  Rocket,
  ShieldPlus,
  Snail,
  TimerReset,
} from 'lucide-react'
import React from 'react'
import { SoundManager } from '@/widgets/Game/models/SoundManager'

const perksValues: Record<PerkType, Pick<PerkData, 'ratio' | 'timeLeft'>> = {
  [Perks.baseHeal]: {
    ratio: 1,
    timeLeft: 1,
  },
  [Perks.massDamage]: {
    ratio: 1,
    timeLeft: 1,
  },
  [Perks.turretDamage]: {
    ratio: 1.5,
    timeLeft: 10,
  },
  [Perks.turretDelay]: {
    ratio: 0.5,
    timeLeft: 10,
  },
  [Perks.turretVampire]: {
    ratio: 0.5,
    timeLeft: 10,
  },
  [Perks.enemyDamage]: {
    ratio: 0.5,
    timeLeft: 10,
  },
  [Perks.enemySpeed]: {
    ratio: 0.5,
    timeLeft: 10,
  },
  [Perks.radarRange]: {
    ratio: 1.5,
    timeLeft: 10,
  },
  [Perks.stopSpawn]: {
    ratio: 1,
    timeLeft: 10,
  },
}

export const defaultPerks: Record<
  PerkType,
  Pick<PerkData, 'ratio' | 'timeLeft'>
> = {
  [Perks.baseHeal]: {
    ratio: perksValues[Perks.baseHeal].ratio,
    timeLeft: 0,
  },
  [Perks.massDamage]: {
    ratio: perksValues[Perks.massDamage].ratio,
    timeLeft: 0,
  },
  [Perks.turretDamage]: {
    ratio: perksValues[Perks.turretDamage].ratio,
    timeLeft: 0,
  },
  [Perks.turretDelay]: {
    ratio: perksValues[Perks.turretDelay].ratio,
    timeLeft: 0,
  },
  [Perks.turretVampire]: {
    ratio: perksValues[Perks.turretVampire].ratio,
    timeLeft: 0,
  },
  [Perks.enemyDamage]: {
    ratio: perksValues[Perks.enemyDamage].ratio,
    timeLeft: 0,
  },
  [Perks.enemySpeed]: {
    ratio: perksValues[Perks.enemySpeed].ratio,
    timeLeft: 0,
  },
  [Perks.radarRange]: {
    ratio: perksValues[Perks.radarRange].ratio,
    timeLeft: 0,
  },
  [Perks.stopSpawn]: {
    ratio: perksValues[Perks.stopSpawn].ratio,
    timeLeft: 0,
  },
}

const iconSize = 35

export const PERKS: Record<PerkType, PerkData> = {
  [Perks.massDamage]: {
    id: Perks.massDamage,
    icon: <Bomb size={iconSize} color="red" />,
    title: 'Орбитальный удар',
    description: 'Нанесите урон равный урону туррели всем врагам на карте',
    ratio: perksValues.MASS_DAMAGE.ratio,
    timeLeft: perksValues.MASS_DAMAGE.timeLeft,
    effect: (enemies, gameState) => {
      SoundManager.getInstance().play('massBlast')
      enemies.forEach(e => e.takeDamage(gameState.reinforcedStats.turretDamage))
    },
  },
  [Perks.baseHeal]: {
    id: Perks.baseHeal,
    icon: <Heart size={iconSize} color="green" />,
    title: 'Регенерационный импульс',
    description: 'Полностью восстановите броню базы',
    ratio: perksValues.BASE_HEAL.ratio,
    timeLeft: perksValues.BASE_HEAL.timeLeft,
    effect: (enemies, gameState) => {
      gameState.baseHealth = gameState.baseMaxHealth
    },
  },
  [Perks.turretDamage]: {
    id: Perks.turretDamage,
    icon: <Rocket size={iconSize} color="green" />,
    title: 'Плазменный разгон',
    description: `Увеличьте урон туррели на ${
      (perksValues.TURRET_DAMAGE.ratio - 1) * 100
    }% на ${perksValues.TURRET_DAMAGE.timeLeft} секунд`,
    ratio: perksValues.TURRET_DAMAGE.timeLeft,
    timeLeft: perksValues.TURRET_DAMAGE.timeLeft,
    property: 'turretDamage',
  },
  [Perks.turretDelay]: {
    id: Perks.turretDelay,
    icon: <TimerReset size={iconSize} color="green" />,
    title: 'Импульсный ускоритель',
    description: `Уменьшите задержку между выстрелами на ${
      perksValues.TURRET_DELAY.ratio * 100
    }% на ${perksValues.TURRET_DELAY.timeLeft} секунд`,
    ratio: perksValues.TURRET_DELAY.ratio,
    timeLeft: perksValues.TURRET_DELAY.timeLeft,
  },
  [Perks.turretVampire]: {
    id: Perks.turretVampire,
    icon: <HeartPlus size={iconSize} color="green" />,
    title: 'Энергопоглощение',
    description: `Поглощайте ${
      perksValues.TURRET_VAMPIRE.ratio * 100
    }% от нанесенного врагам урона на ${
      perksValues.TURRET_VAMPIRE.timeLeft
    } секунд`,
    ratio: perksValues.TURRET_VAMPIRE.ratio,
    timeLeft: perksValues.TURRET_VAMPIRE.timeLeft,
  },
  [Perks.enemySpeed]: {
    id: Perks.enemySpeed,
    icon: <Snail size={iconSize} color="red" />,
    title: 'Тормозное поле',
    description: `Уменьшите скорость врагов на ${
      perksValues.ENEMY_SPEED.ratio * 100
    }% на ${perksValues.ENEMY_SPEED.timeLeft} секунд`,
    ratio: perksValues.ENEMY_SPEED.ratio,
    timeLeft: perksValues.ENEMY_SPEED.timeLeft,
  },
  [Perks.enemyDamage]: {
    id: Perks.enemyDamage,
    icon: <ShieldPlus size={iconSize} color="green" />,
    title: 'Абсорбционный барьер',
    description: `Уменьшите получаемый урон на ${
      perksValues.ENEMY_DAMAGE.ratio * 100
    }% на ${perksValues.ENEMY_DAMAGE.timeLeft} секунд`,
    ratio: perksValues.ENEMY_DAMAGE.ratio,
    timeLeft: perksValues.ENEMY_DAMAGE.timeLeft,
  },
  [Perks.radarRange]: {
    id: Perks.radarRange,
    icon: <Radar size={iconSize} color="green" />,
    title: 'Орбитальное зрение',
    description: `Увеличьте радиус радара на ${
      (perksValues.RADAR_RANGE.ratio - 1) * 100
    }% на ${perksValues.RADAR_RANGE.timeLeft} секунд`,
    ratio: perksValues.RADAR_RANGE.ratio,
    timeLeft: perksValues.RADAR_RANGE.timeLeft,
    property: 'radarRange',
  },
  [Perks.stopSpawn]: {
    id: Perks.stopSpawn,
    icon: <Ban size={iconSize} color="red" />,
    title: 'Стазис вторжения',
    description: `Остановите спаун врагов на ${perksValues.STOP_SPAWN.timeLeft} секунд`,
    ratio: perksValues.STOP_SPAWN.timeLeft,
    timeLeft: perksValues.STOP_SPAWN.timeLeft,
  },
}
