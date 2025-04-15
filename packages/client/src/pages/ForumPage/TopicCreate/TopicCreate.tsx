import { FormCreateTopic } from '@/entities/Forum/topic/ui'
import styles from './style.module.scss'
import Title from 'antd/es/typography/Title'

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
