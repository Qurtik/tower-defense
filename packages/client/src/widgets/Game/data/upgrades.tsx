import {
  Dices,
  HeartPulse,
  Radar,
  Rocket,
  ScanEye,
  ScanHeart,
  Shield,
  TimerReset,
} from 'lucide-react'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'

export const UPGRADES: UpgradeData[] = [
  {
    id: 'railgun-small',
    title: 'Малый импульсный ускоритель',
    description: 'Урон +1',
    chance: 8,
    apply: gameState => {
      gameState.turretDamage = gameState.turretDamage + 1
    },
    icon: <Rocket size={40} />,
  },
  {
    id: 'railgun-medium',
    title: 'Большой импульсный ускоритель',
    description: 'Урон +3',
    chance: 4,
    apply: gameState => {
      gameState.turretDamage = gameState.turretDamage + 3
    },
    icon: <Rocket size={60} />,
  },
  {
    id: 'railgun-large',
    title: 'Плазменный гиперускоритель',
    description: 'Урон +5',
    chance: 1,
    apply: gameState => {
      gameState.turretDamage = gameState.turretDamage + 5
    },
    icon: <Rocket size={80} />,
  },
  {
    id: 'radius-small',
    title: 'Малый сенсорный усилитель',
    description: 'Радиус радара +20',
    chance: 10,
    apply: gameState => {
      gameState.radarRange = gameState.radarRange + 20
    },
    icon: <Radar size={40} />,
  },
  {
    id: 'radius-medium',
    title: 'Большой сенсорный усилитель',
    description: 'Радиус радара +40',
    chance: 6,
    apply: gameState => {
      gameState.radarRange = gameState.radarRange + 40
    },
    icon: <Radar size={60} />,
  },
  {
    id: 'radius-large',
    title: 'Квантовый сканер дальности',
    description: 'Радиус радара +60',
    chance: 2,
    apply: gameState => {
      gameState.radarRange = gameState.radarRange + 40
    },
    icon: <Radar size={80} />,
  },
  {
    id: 'health-small',
    title: 'Малый нанокомпозитный корпус',
    description: 'Максимальная броня +20, однократное восстановление брони +20',
    chance: 10,
    apply: gameState => {
      gameState.baseMaxHealth += 20
      gameState.baseHealth = gameState.baseHealth + 20
      if (gameState.baseHealth > gameState.baseMaxHealth) {
        gameState.baseHealth = gameState.baseMaxHealth
      }
    },
    icon: <Shield size={40} />,
  },
  {
    id: 'health-medium',
    title: 'Средний нанокомпозитный корпус',
    description: 'Максимальная броня +30, однократное восстановление брони +30',
    chance: 7,
    apply: gameState => {
      gameState.baseMaxHealth += 30
      gameState.baseHealth = gameState.baseHealth + 30
      if (gameState.baseHealth > gameState.baseMaxHealth) {
        gameState.baseHealth = gameState.baseMaxHealth
      }
    },
    icon: <Shield size={60} />,
  },
  {
    id: 'health-large',
    title: 'Большой нанокомпозитный корпус',
    description: 'Максимальная броня +40, однократное восстановление брони +40',
    chance: 4,
    apply: gameState => {
      gameState.baseMaxHealth += 40
      gameState.baseHealth = gameState.baseHealth + 40
      if (gameState.baseHealth > gameState.baseMaxHealth) {
        gameState.baseHealth = gameState.baseMaxHealth
      }
    },
    icon: <Shield size={80} />,
  },
  {
    id: 'health-super',
    title: 'Реактивная броня "Титан"',
    description:
      'Максимальная броня +50, однократное полное восстановление брони',
    chance: 1,
    apply: gameState => {
      gameState.baseMaxHealth += 50
      gameState.baseHealth = gameState.baseMaxHealth
    },
    icon: <Shield size={100} />,
  },
  {
    id: 'heal-delay-small',
    title: 'Малый регенерационный ускоритель',
    description: 'Частота регенерации брони -0.2 сек',
    chance: 8,
    apply: gameState => {
      gameState.healDelay = gameState.healDelay - 0.2
    },
    condition: gameState =>
      gameState.healDelay >= 1.2 && gameState.healAmount > 0,
    icon: <HeartPulse size={40} />,
  },
  {
    id: 'heal-delay-medium',
    title: 'Большой регенерационный ускоритель',
    description: 'Частота регенерации брони -0.3 сек',
    chance: 5,
    apply: gameState => {
      gameState.healDelay = gameState.healDelay - 0.3
    },
    condition: gameState =>
      gameState.healDelay >= 1.3 && gameState.healAmount > 0,
    icon: <HeartPulse size={60} />,
  },
  {
    id: 'heal-delay-large',
    title: 'Бионика мгновенного восстановления',
    description: 'Частота регенерации брони -0.4 сек',
    chance: 2,
    apply: gameState => {
      gameState.healDelay = gameState.healDelay - 0.4
    },
    condition: gameState =>
      gameState.healDelay >= 1.4 && gameState.healAmount > 0,
    icon: <HeartPulse size={80} />,
  },
  {
    id: 'heal-amount-small',
    title: 'Малый ремонтный дрон',
    description: 'Размер периодически регенерируемой брони +1',
    chance: 8,
    apply: gameState => {
      gameState.healAmount = gameState.healAmount + 1
    },
    icon: <ScanHeart size={40} />,
  },
  {
    id: 'heal-amount-medium',
    title: 'Большой ремонтный дрон',
    description: 'Размер периодически регенерируемой брони +2',
    chance: 4,
    apply: gameState => {
      gameState.healAmount = gameState.healAmount + 2
    },
    icon: <ScanHeart size={60} />,
  },
  {
    id: 'heal-amount-large',
    title: 'Автономный нанорегенератор',
    description: 'Размер периодически регенерируемой брони +3',
    chance: 1,
    apply: gameState => {
      gameState.healAmount = gameState.healAmount + 3
    },
    icon: <ScanHeart size={80} />,
  },
  {
    id: 'shot-delay-small',
    title: 'Малый охлаждающий контур',
    description: 'Задержка между выстрелами -0.1 сек',
    chance: 10,
    apply: gameState => {
      gameState.shotsDelay = gameState.shotsDelay - 0.1
    },
    condition: gameState => gameState.shotsDelay >= 0.6,
    icon: <TimerReset size={40} />,
  },
  {
    id: 'shot-delay-medium',
    title: 'Большой охлаждающий контур',
    description: 'Задержка между выстрелами -0.3 сек',
    chance: 6,
    apply: gameState => {
      gameState.shotsDelay = gameState.shotsDelay - 0.3
    },
    condition: gameState => gameState.shotsDelay >= 0.8,
    icon: <TimerReset size={60} />,
  },
  {
    id: 'shot-delay-large',
    title: 'Криогенная система перезарядки',
    description: 'Задержка между выстрелами -0.5 сек',
    chance: 2,
    apply: gameState => {
      gameState.shotsDelay = gameState.shotsDelay - 0.5
    },
    condition: gameState => gameState.shotsDelay >= 1,
    icon: <TimerReset size={80} />,
  },
  {
    id: 'rerolls',
    title: 'Аварийный перерасчёт',
    description: '+2 обновления случайных улучшений',
    chance: 8,
    apply: gameState => {
      gameState.rerollsLeft = 2
    },
    condition: gameState => gameState.rerollsLeft === 0,
    icon: <Dices size={40} />,
  },
  {
    id: 'anti-stealth-small',
    title: 'Малый детектор теней',
    description: 'Радиус антистелса +50% от радиуса радара',
    chance: 7,
    apply: gameState => {
      gameState.stealthDetectionRatio += 0.5
    },
    condition: gameState => gameState.stealthDetectionRatio < 0.51,
    icon: <ScanEye size={60} />,
  },
  {
    id: 'anti-stealth-large',
    title: 'Охотник за призраками',
    description: 'Радиус антистелса +100% от радиуса радара',
    chance: 2,
    apply: gameState => {
      gameState.stealthDetectionRatio = 1
    },
    condition: gameState => gameState.stealthDetectionRatio < 0.49,
    icon: <ScanEye size={80} />,
  },
]
