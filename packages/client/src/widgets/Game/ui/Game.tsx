import { useCallback, useEffect, useRef, useState } from 'react'
import { Game } from '@/widgets/Game/models/Game'
import styles from './Game.module.scss'
import { Card, Typography } from 'antd'
import { GameState } from '@/widgets/Game/types/gameState'
import GameUI from '@/widgets/Game/ui/GameUI/GameUI'
import { TerminalButton } from '@/shared/ui/TerminalButton'
import { HealthBar } from '@/widgets/Game/ui/HUD/HealthBar/HealthBar'
import UpgradeScreen from '@/widgets/Game/ui/HUD/UpgradeScreen/UpgradeScreen'
import { getRandomUpgrades } from '@/widgets/Game/lib/getRandomUpgrades'
import { UpgradeData } from '@/widgets/Game/data/upgrades'

const initialGameState: GameState = {
  baseHealth: 30,
  baseMaxHealth: 50,
  enemiesCount: 0,
  enemiesKilled: 0,
  baseDamageEvents: [],
  state: 'paused',
  rerollsLeft: 1,
  turretDamage: 5,
  radarRange: 150,
}

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [countdown, setCountdown] = useState<number | null>(3)
  const [currentGameState, setCurrentGameState] =
    useState<GameState>(initialGameState)
  const [newGame, setNewGame] = useState<number>(1)
  const [availableUpgrades, setAvailableUpgrades] = useState<UpgradeData[]>([])

  const { Text } = Typography

  const handleStateUpdate = useCallback((state: GameState) => {
    setCurrentGameState(state)
  }, [])

  const startNewGame = () => {
    setCountdown(3)
    setCurrentGameState(initialGameState)
    setNewGame(prev => ++prev)
  }

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = 900
    canvas.height = 700
    gameRef.current = new Game(canvas, initialGameState, handleStateUpdate)

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 0) {
          // gameRef.current?.start()
          clearInterval(timer)
          return null
        }
        return prev - 1
      })
    }, 1000)

    return () => {
      clearInterval(timer)
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
      <GameUI gameState={currentGameState} />
      <div className={styles.canvasWrapper}>
        <HealthBar
          baseHealth={currentGameState.baseHealth}
          baseMaxHealth={currentGameState.baseMaxHealth}
          canvasWidth={900}
          events={currentGameState.baseDamageEvents}
        />
        <canvas ref={canvasRef} />
        {currentGameState.state === 'paused' && (
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
                setCurrentGameState(prev => ({
                  ...prev,
                  rerollsLeft: prev.rerollsLeft - 1,
                }))
              }
            }}
          />
        )}
        {countdown !== null && (
          <div className={styles.countdown}>
            <Text style={{ fontSize: '78px' }}>
              {countdown > 0 ? countdown : 'GO!'}
            </Text>
          </div>
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
    </div>
  )
}
