import { Card, Typography } from 'antd'
import { useCallback, useEffect, useRef, useState } from 'react'

import { Game } from '@/widgets/Game/models/Game'
import { GameState } from '@/widgets/Game/types/gameState'
import { TerminalButton } from '@/shared/ui/TerminalButton'
import { HealthBar } from '@/widgets/Game/ui/HUD/HealthBar/HealthBar'
import UpgradeScreen from '@/widgets/Game/ui/HUD/UpgradeScreen/UpgradeScreen'
import { getRandomUpgrades } from '@/widgets/Game/lib/getRandomUpgrades'
import SystemParams from '@/widgets/Game/ui/HUD/CurrentParams/SystemParams/SystemParams'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'
import SwarmParams from '@/widgets/Game/ui/HUD/CurrentParams/SmarmParams/SwarmParams'
import CurrentWave from '@/widgets/Game/ui/HUD/CurrentWave/CurrentWave'
import WaveStats from '@/widgets/Game/ui/HUD/WaveCount/WaveStats'
import styles from './Game.module.scss'

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
}

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [currentGameState, setCurrentGameState] = useState<GameState>({
    ...initialGameState,
  })
  const [newGame, setNewGame] = useState<number>(1)
  const [availableUpgrades, setAvailableUpgrades] = useState<UpgradeData[]>([])

  const { Text } = Typography

  const handleStateUpdate = useCallback((state: GameState) => {
    setCurrentGameState(state)
  }, [])

  const startNewGame = () => {
    setCurrentGameState({ ...initialGameState })
    setNewGame(prev => ++prev)
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

  return (
    <div className={styles.wrapper}>
      <SystemParams gameState={currentGameState} />
      <div className={styles.canvasWrapper}>
        <HealthBar
          baseHealth={currentGameState.baseHealth}
          baseMaxHealth={currentGameState.baseMaxHealth}
          canvasWidth={900}
          events={currentGameState.baseDamageEvents}
        />
        {currentGameState.state === 'running' && (
          <CurrentWave gameState={currentGameState} />
        )}
        <canvas ref={canvasRef} />
        {currentGameState.state === 'running' && (
          <WaveStats gameState={currentGameState} />
        )}
        {currentGameState.state === 'paused' && gameRef.current?.gameState && (
          <UpgradeScreen
            gameState={currentGameState}
            upgrades={availableUpgrades}
            canReroll={currentGameState.rerollsLeft > 0}
            onSelect={upgrade => {
              if (gameRef.current) {
                upgrade.apply(gameRef.current.gameState)
                gameRef.current.start()
                setAvailableUpgrades([])
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
                if (gameRef.current && gameRef.current?.gameState.rerollsLeft) {
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
