import React, { ReactNode } from 'react'
import { Card } from 'antd'
import styles from './Upgrade.module.scss'

interface UpgradeProps {
  title: string
  description: string
  onClick: () => void
  selected: boolean
  icon: ReactNode
}

const Upgrade = ({
  title,
  description,
  onClick,
  selected,
  icon,
}: UpgradeProps) => {
  return (
    <Card
      className={`${styles.upgrade} ${selected ? styles.selected : ''}`}
      onClick={onClick}>
      <div className={styles.wrapper}>
        <div className={styles.title}>{title}</div>
        <div className={styles.description}>{description}</div>
        <div className={styles.iconWrapper}>{icon}</div>
      </div>
    </Card>
  )
}

export default Upgrade
