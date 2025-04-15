import { Card, List, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { getTopics, ITopic } from '../../api/mocks'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { formateDate } from '@/shared/lib/formateDate/formateDate'
import styles from './style.module.scss'

const { Text } = Typography

export const TopicListItems = () => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchTopics = async () => {
      try {
        const data = await getTopics()
        setTopics(data)
      } catch (error) {
        console.error('Ошибка получения топиков', error)
      } finally {
        setLoading(false)
      }
    }

    fetchTopics()
  }, [])

  return (
    <Spin spinning={loading}>
      <List
        itemLayout="vertical"
        dataSource={topics}
        renderItem={topic => (
          <List.Item>
            <Card
              title={topic.title}
              extra={
                <NavigationLink to={`/forum/${topic.id}`}>
                  Открыть
                </NavigationLink>
              }>
              <p>{topic.content.substring(0, 120)}...</p>
              <div className={styles['container-card-extra']}>
                <Text type="secondary">@{topic.author}</Text>
                <Text type="secondary">
                  Создано: {formateDate(topic.createdAt)}
                </Text>
              </div>
            </Card>
          </List.Item>
        )}
      />
    </Spin>
  )
}
