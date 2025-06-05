import styles from './GamePage.module.scss'
import { Briefing } from '@/widgets/Briefing'
import { TerminalButton } from '@/shared/ui/TerminalButton'
import { useState } from 'react'
import { GameCanvas } from '@/widgets/Game'
import { Tutorial } from '@/widgets/Tutorial'
export const GamePage = () => {
  const [gameStarted, setGameStarted] = useState(false)

  if (gameStarted) {
    return <GameCanvas />
  }

  return (
    <div className={styles.app}>
      <div className={styles.wrapper}>
        <div className={styles.howToPlay}>
          <Tutorial />
        </div>

        <div className={styles.briefing}>
          <Briefing />
        </div>

        <div className={styles.startButton}>
          <TerminalButton onClick={() => setGameStarted(true)} />
        </div>
      </div>
    </div>
  )
}
