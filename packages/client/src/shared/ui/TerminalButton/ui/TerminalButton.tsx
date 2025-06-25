import React, { useState } from 'react'
import styles from './TerminalButton.module.scss'

interface TerminalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  promptText?: string
}

export const TerminalButton = ({
  promptText = 'Выполнить протокол?'.toUpperCase(),
  ...rest
}: TerminalButtonProps) => {
  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <button
      className={styles.terminalButton}
      onMouseEnter={() => setIsConfirmed(true)}
      onMouseLeave={() => setIsConfirmed(false)}
      {...rest}>
      <span className={styles.promptPrefix}>`&gt;`_</span>
      {promptText} [
      <span className={styles.confirmationStatus}>
        {isConfirmed ? 'Да' : 'Нет'}
      </span>
      ]<span className={styles.blinkingCursor}></span>
    </button>
  )
}
