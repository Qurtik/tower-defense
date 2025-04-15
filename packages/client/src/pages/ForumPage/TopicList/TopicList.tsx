import { Card, Space, Typography } from 'antd'
import styles from './style.module.scss'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { TopicListItems } from '@/entities/Forum/topic/ui'

const { Title } = Typography

export const TopicListPage = () => {
  return (
    <div className={styles.container}>
      <Space
        className={styles['container-topic-list']}
        direction="vertical"
        size="large">
        <Card>
          <div className={styles.header}>
            <Title>Форум</Title>
            <NavigationLink to={ROUTES.TOPIC_CREATE}>
              Создать топик
            </NavigationLink>
          </div>
        </Card>

        <TopicListItems />
      </Space>
    </div>
  )
}
