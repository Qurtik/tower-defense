import React from 'react'
import { Card } from 'antd'
import styles from './Upgrade.module.scss'

interface UpgradeProps {
  title: string
  description: string
  onClick: () => void
  selected: boolean
}

const Upgrade = ({ title, description, onClick, selected }: UpgradeProps) => {
  return (
    <Card
      className={`${styles.upgrade} ${selected ? styles.selected : ''}`}
      onClick={onClick}>
      <div className={styles.title}>{title}</div>
      <div className={styles.description}>{description}</div>
    </Card>
  )
}

export default Upgrade
