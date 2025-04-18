import { useCallback, useEffect, useRef, useState } from 'react'
import { Game } from '@/widgets/Game/models/Game'
import styles from './Game.module.scss'
import { Card, Typography } from 'antd'
import { GameState } from '@/widgets/Game/types/gameState'
import { TerminalButton } from '@/shared/ui/TerminalButton'
import { HealthBar } from '@/widgets/Game/ui/HUD/HealthBar/HealthBar'
import UpgradeScreen from '@/widgets/Game/ui/HUD/UpgradeScreen/UpgradeScreen'
import { getRandomUpgrades } from '@/widgets/Game/lib/getRandomUpgrades'
import SystemParams from '@/widgets/Game/ui/HUD/CurrentParams/SystemParams'
import { UpgradeData } from '@/widgets/Game/types/upgradeData'
import SwarmParams from '@/widgets/Game/ui/HUD/CurrentParams/SwarmParams'
import CurrentWave from '@/widgets/Game/ui/HUD/CurrentWave/CurrentWave'
import WaveStats from '@/widgets/Game/ui/HUD/WaveCount/WaveStats'

const initialGameState: GameState = {
  baseHealth: 50,
  baseMaxHealth: 50,
  enemiesCount: 0,
  enemiesKilled: 0,
  baseDamageEvents: [],
  state: 'paused',
  rerollsLeft: 1,
  turretDamage: 5,
  radarRange: 150,
  shotsDelay: 2,
  healDelay: 3,
  healAmount: 0,
  enemiesParams: {
    vampire: {
      coreSpeed: 0.4,
      coreHealth: 5,
      coreDamage: 4,
      currentSpeed: 0.4,
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
