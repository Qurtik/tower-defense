import { useEffect, useRef, useState } from 'react'
import styles from './HealthBar.module.scss'
import classNames from 'classnames'
import { Typography } from 'antd'

interface DamageFloatingText {
  id: number
  value: number
  x: number
  y: number
  opacity: number
  direction: 'left' | 'right'
}

interface HealthBarProps {
  baseHealth: number
  baseMaxHealth: number
  canvasWidth: number
  events: { value: number; type: 'damage' | 'heal' }[]
}

let uniqueId = 0

const MAX_HEALTH_FOR_BAR = 300

export const HealthBar = ({
  baseHealth,
  baseMaxHealth,
  canvasWidth,
  events,
}: HealthBarProps) => {
  const [floatingTexts, setFloatingTexts] = useState<DamageFloatingText[]>([])
  const requestRef = useRef<number>()

  const { Text } = Typography

  const healthRatio =
    Math.min(baseMaxHealth, MAX_HEALTH_FOR_BAR) / MAX_HEALTH_FOR_BAR
  const barWidth = canvasWidth * healthRatio
  const barHeight = 15
  const filledWidth = (baseHealth / baseMaxHealth) * barWidth

  useEffect(() => {
    if (events.length === 0) return

    const newTexts = events.map(event => {
      return {
        id: uniqueId++,
        value: event.value,
        x: event.type === 'damage' ? -20 : barWidth + 10,
        y: 0,
        opacity: 1,
        direction:
          event.type === 'damage'
            ? 'left'
            : ('right' as DamageFloatingText['direction']),
      }
    })

    setFloatingTexts(prev => [...prev, ...newTexts])
  }, [events, barWidth])

  useEffect(() => {
    const animate = () => {
      setFloatingTexts(prev =>
        prev
          .map(text => ({
            ...text,
            x: text.direction === 'left' ? text.x - 1.5 : text.x + 1.5,
            opacity: text.opacity - 0.015,
          }))
          .filter(text => text.opacity > 0)
      )
      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(requestRef.current!)
  }, [])

  return (
    <div
      className={styles.healthBarWrapper}
      style={{ width: barWidth, height: barHeight }}>
      <div className={styles.healthBar}>
        <div
          className={styles.filled}
          style={{ width: `${filledWidth}px`, height: '100%' }}
        />
      </div>

      <Text
        className={styles.hpValue}
        style={{
          left: `${Math.max(0, Math.min(filledWidth - 12, barWidth - 24))}px`,
        }}>
        {baseHealth}
      </Text>

      {floatingTexts.map(text => (
        <div
          key={text.id}
          className={classNames(styles.floatingText, styles[text.direction])}
          style={{
            left: `${text.x}px`,
            top: `${barHeight / 2 + text.y}px`,
            opacity: text.opacity,
          }}>
          {text.direction === 'left' ? `-${text.value}` : `+${text.value}`}
        </div>
      ))}
    </div>
  )
}
