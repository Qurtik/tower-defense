import { FormCreateTopic } from '@/entities/Forum/topic/ui'
import styles from './style.module.scss'
import { Typography } from 'antd'

const { Title } = Typography

export const TopicCreatePage = () => {
  return (
    <div className={styles.container}>
      <Title level={2} className={styles['container-title']}>
        Создание новой темы
      </Title>
      <FormCreateTopic />
    </div>
  )
}
