import React, { useState } from 'react'
import styles from './TerminalButton.module.scss'

interface TerminalButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  promptText?: string
}

export const TerminalButton: React.FC<TerminalButtonProps> = ({
  promptText = 'EXECUTE PROTOCOL?',
  ...buttonProps
}) => {
  const [isConfirmed, setIsConfirmed] = useState(false)

  return (
    <button
      className={styles.terminalButton}
      onMouseEnter={() => setIsConfirmed(true)}
      onMouseLeave={() => setIsConfirmed(false)}
      {...buttonProps}>
      <span className={styles.promptPrefix}>`&gt;`_</span>
      {promptText} [
      <span className={styles.confirmationStatus}>
        {isConfirmed ? 'Y' : 'N'}
      </span>
      ]<span className={styles.blinkingCursor}></span>
    </button>
  )
}
