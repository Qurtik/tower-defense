import { useEffect, useRef, useState } from 'react'
import { Game } from '@/widgets/Game/models/Game'
import styles from './Game.module.scss'
import { Typography } from 'antd'

export const GameCanvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const gameRef = useRef<Game | null>(null)
  const [countdown, setCountdown] = useState<number | null>(3)
  const { Text } = Typography

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    canvas.width = 900
    canvas.height = 700
    gameRef.current = new Game(canvas)

    gameRef.current?.start()

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev === null || prev <= 0) {
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
  }, [])

  return (
    <div className={styles.wrapper}>
      <canvas ref={canvasRef} />
      {countdown !== null && (
        <div className={styles.countdown}>
          <Text style={{ fontSize: '64px' }}>
            {countdown > 0 ? countdown : 'GO!'}
          </Text>
        </div>
      )}
    </div>
  )
}
