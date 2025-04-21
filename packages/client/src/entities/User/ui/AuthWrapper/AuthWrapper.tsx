import { Card, Typography } from 'antd'
import styles from './AuthWrapper.module.scss'
import { ReactNode } from 'react'
import { ThemeSwitcher } from '@/features/ThemeSwitcher'
import { FullscreenToggleButton } from '@/features/Fullscreen'

const { Title } = Typography

interface Props {
  title: string
  children?: ReactNode
}

const AuthWrapper = ({ title, children }: Props) => {
  return (
    <Card className={styles.wrapper}>
      <div className={styles.btnWrapper}>
        <ThemeSwitcher />
        <FullscreenToggleButton />
      </div>
      <Title level={2} className={styles.title}>
        {title}
      </Title>
      {children}
    </Card>
  )
}

export default AuthWrapper
