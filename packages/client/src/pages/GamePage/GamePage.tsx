import { Card, List, Typography } from 'antd'
import styles from './GamePage.module.scss'
import { Briefing } from '@/widgets/Briefing'
import { TerminalButton } from '@/shared/ui/TerminalButton'
import { useState } from 'react'
import { GameCanvas } from '@/widgets/Game/ui/Game'

const instructions = [
  '► В начале раунда выбери ОДИН из 3 случайных апгрейдов',
  '► Используй ограниченные рероллы для замены вариантов',
  '► Каждая новая волна сильнее предыдущей',
  '► Цель: продержаться максимальное число волн',
]

export const GamePage = () => {
  const { Text } = Typography

  const [gameStarted, setGameStarted] = useState(false)

  if (gameStarted) {
    return <GameCanvas />
  }

  return (
    <div className={styles.wrapper}>
      <div className={styles.howToPlay}>
        <Card className={styles.terminalCard} style={{ height: '100%' }}>
          <List
            header={<Text>{'Краткий инструктаж'.toUpperCase()}</Text>}
            dataSource={instructions}
            renderItem={item => (
              <List.Item
                style={{ borderBottom: '1px dashed rgba(0, 255, 0, 0.3)' }}>
                <Text>{item}</Text>
              </List.Item>
            )}
          />
        </Card>
      </div>

      <div className={styles.briefing}>
        <Briefing />
      </div>

      <div className={styles.startButton}>
        <TerminalButton onClick={() => setGameStarted(true)} />
      </div>
    </div>
  )
}
