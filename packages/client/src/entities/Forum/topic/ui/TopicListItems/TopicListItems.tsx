import { getTopics, ITopic } from '../../api'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectUser } from '@/entities/User'
import { Card, List, Spin, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { formateDate } from '@/shared/lib/formateDate/formateDate'
import styles from './style.module.scss'
import { useNavigate } from 'react-router'

const { Text } = Typography

export const TopicListItems = () => {
  const [topics, setTopics] = useState<ITopic[]>([])
  const [loading, setLoading] = useState(true)
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  useEffect(() => {
    if (!user) return
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
  }, [user])

  const handleSelectTopic = (id: number) => {
    navigate(`/forum/${id}`)
  }

  return (
    <Spin spinning={loading}>
      <List
        itemLayout="vertical"
        dataSource={topics}
        renderItem={topic => (
          <List.Item key={topic.id}>
            <Card
              className={styles.cardHover}
              title={topic.title}
              onClick={() => handleSelectTopic(topic.id)}
              hoverable>
              <p>{topic.content.substring(0, 120)}...</p>
              <div className={styles['container-card-extra']}>
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
