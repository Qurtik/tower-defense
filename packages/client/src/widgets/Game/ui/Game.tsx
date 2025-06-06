import { Card, Typography } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Game } from '@/widgets/Game/models/Game'
import { GameState } from '@/widgets/Game/types/gameState'
import { TerminalButton } from '@/shared/ui/TerminalButton'
import { HealthBar } from '@/widgets/Game/ui/HUD/HealthBar/HealthBar'
import UpgradeScreen from '@/widgets/Game/ui/HUD/UpgradeScreen/UpgradeScreen'
import {
  getRandomPerks,
  getRandomUpgrades,
} from '@/widgets/Game/lib/getRandomUpgrades'
import SystemParams from '@/widgets/Game/ui/HUD/CurrentParams/SystemParams/SystemParams'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'
import SwarmParams from '@/widgets/Game/ui/HUD/CurrentParams/SwarmParams/SwarmParams'
import CurrentWave from '@/widgets/Game/ui/HUD/CurrentWave/CurrentWave'
import WaveStats from '@/widgets/Game/ui/HUD/WaveCount/WaveStats'
import styles from './Game.module.scss'
import { leaderboardModel } from '@/entities/Progress/model'
import { selectUser } from '@/entities/User/model/slice'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { defaultPerks } from '@/widgets/Game/data/perks'
import { PerkData, PerkType } from '@/widgets/Game/types/perkData'
import { v4 as uuidv4 } from 'uuid'
import cloneDeep from '@/shared/lib/utils/cloneDeep'
import ActivePerksList from '@/widgets/Game/ui/HUD/ActivePerksList/ActivePerksList'
import { soundManager } from '@/widgets/Game/models/SoundManager'
import SoundController from '@/widgets/Game/ui/HUD/SoundController/SoundController'

export const initialGameState: GameState = {
  baseRadius: 48,
  baseHealth: 50,
  baseMaxHealth: 50,
  enemiesKilled: 0,
  baseDamageEvents: [],
  state: 'paused',
  rerollsLeft: 1,
  turretDamage: 5,
  radarRange: 150,
  stealthDetectionRatio: 0,
  shotsDelay: 2,
  healDelay: 3,
  healAmount: 0,
  enemiesParams: {
    imp: {
      coreSpeed: 0.4,
      coreHealth: 4,
      coreDamage: 3,
      currentSpeed: 0.4,
      currentHealth: 4,
      currentDamage: 3,
    },
    vampire: {
      coreSpeed: 0.3,
      coreHealth: 5,
      coreDamage: 4,
      currentSpeed: 0.3,
      currentHealth: 5,
      currentDamage: 4,
    },
    wraith: {
      coreSpeed: 0.3,
      coreHealth: 5,
      coreDamage: 5,
      currentSpeed: 0.3,
      currentHealth: 5,
      currentDamage: 5,
    },
    berserker: {
      coreSpeed: 0.4,
      coreHealth: 5,
      coreDamage: 4,
      currentSpeed: 0.3,
      currentHealth: 5,
      currentDamage: 4,
    },
  },
  wave: -1,
  currentWaveEnemiesTotal: 2,
  currentWaveEnemiesSpawned: 0,
  currentWaveEnemiesKilled: 0,
  difficultyRatio: 0.2,
  spawnTime: 3000,
  currentEnemyTypes: new Set(),
  activePerks: cloneDeep(defaultPerks) as Record<
    PerkType,
    Pick<PerkData, 'ratio' | 'timeLeft'>
  >,
  reinforcedStats: {
    turretDamage: 5,
    shotsDelay: 2,
    radarRange: 150,
  },
}

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [currentGameState, setCurrentGameState] = useState<GameState>({
    ...initialGameState,
  })
  const [newGame, setNewGame] = useState<number>(1)
  const [availableUpgrades, setAvailableUpgrades] = useState<UpgradeData[]>([])
  const [availablePerks, setAvailablePerks] = useState<
    { id: string; perk: PerkType }[]
  >([])
  const [upgradeStep, setUpgradeStep] = useState(1)
  const user = useAppSelector(selectUser)

  const { Text } = Typography

  const handleStateUpdate = useCallback((state: GameState) => {
    setCurrentGameState(state)
  }, [])

  const startNewGame = () => {
    setCurrentGameState({ ...initialGameState })
    setAvailablePerks([])
    setNewGame(prev => ++prev)
    soundManager.playBackgroundMusic()
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = 900
    canvas.height = 700
    gameRef.current = new Game(canvas, initialGameState, handleStateUpdate)

    return () => {
      gameRef.current?.stop()
    }
  }, [newGame])

  useEffect(() => {
    if (currentGameState.state === 'paused' && availableUpgrades.length === 0) {
      const newUpgrades = getRandomUpgrades(3, currentGameState)
      setAvailableUpgrades(newUpgrades)
    }
  }, [currentGameState.state])

  useEffect(() => {
    if (currentGameState.state === 'gameOver' && user) {
      leaderboardModel
        .sendUserResult({
          name: user.display_name || user.email,
          waves: currentGameState.wave,
          enemiesKilled: currentGameState.enemiesKilled,
        })
        .catch(err => {
          console.error(err)
        })
    }
  }, [currentGameState.state, user])

  return (
    <div className={styles.wrapper}>
      <SystemParams
        gameState={currentGameState}
        availablePerks={availablePerks}
        setAvailablePerks={setAvailablePerks}
      />
      <div className={styles.canvasWrapper}>
        <HealthBar
          baseHealth={currentGameState.baseHealth}
          baseMaxHealth={currentGameState.baseMaxHealth}
          canvasWidth={900}
          events={currentGameState.baseDamageEvents}
        />
        <ActivePerksList activePerks={currentGameState.activePerks} />
        <SoundController />
        {currentGameState.state === 'running' && (
          <CurrentWave gameState={currentGameState} />
        )}
        <canvas ref={canvasRef} />
        {currentGameState.state === 'running' && (
          <WaveStats gameState={currentGameState} />
        )}
        {currentGameState.state === 'paused' &&
          upgradeStep === 1 &&
          gameRef.current?.gameState && (
            <UpgradeScreen
              title="Выберите улучшение"
              gameState={currentGameState}
              upgrades={availableUpgrades}
              canReroll={currentGameState.rerollsLeft > 0}
              showRerollButton
              onSelect={upgrade => {
                if ('apply' in upgrade) {
                  if (gameRef.current) {
                    upgrade.apply(gameRef.current.gameState)
                    setUpgradeStep(2)
                    setAvailableUpgrades([])
                  }
                }
              }}
              onReroll={() => {
                if (currentGameState.rerollsLeft > 0) {
                  const newUpgrades = getRandomUpgrades(
                    3,
                    currentGameState,
                    availableUpgrades.map(u => u.id)
                  )

                  setAvailableUpgrades(newUpgrades)
                  if (
                    gameRef.current &&
                    gameRef.current?.gameState.rerollsLeft
                  ) {
                    gameRef.current.gameState.rerollsLeft -= 1
                    setCurrentGameState(prev => ({
                      ...prev,
                      rerollsLeft: --prev.rerollsLeft,
                    }))
                  }
                }
              }}
            />
          )}
        {currentGameState.state === 'paused' &&
          upgradeStep === 2 &&
          gameRef.current?.gameState && (
            <UpgradeScreen
              title="Выберите перк"
              gameState={currentGameState}
              upgrades={getRandomPerks()}
              canReroll={false}
              showRerollButton={false}
              onSelect={perk => {
                if (gameRef.current) {
                  setAvailablePerks(prev => [
                    ...prev,
                    {
                      id: uuidv4(),
                      perk: perk.id as PerkType,
                    },
                  ])
                  gameRef.current.start()
                  setUpgradeStep(1)
                  setAvailableUpgrades([])
                }
              }}
            />
          )}
        {currentGameState.state === 'gameOver' && (
          <Card className={styles.gameOver}>
            <Text style={{ fontSize: '24px' }}>
              {'Последний рубеж прорван'.toUpperCase()}
            </Text>
            <Text>{'[Рой не остановить]'.toUpperCase()}</Text>
            <TerminalButton
              promptText={'Повторить цикл?'.toUpperCase()}
              onClick={startNewGame}></TerminalButton>
          </Card>
        )}
      </div>
      <SwarmParams gameState={currentGameState} />
    </div>
  )
}
