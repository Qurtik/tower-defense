import {
  getCommentsByTopicId,
  IComment,
} from '@/entities/Forum/comment/api/mocks'
import { AddComment } from '@/entities/Forum/comment/ui'
import { Comments } from '@/entities/Forum/comment/ui'
import { getTopicById, ITopic } from '@/entities/Forum/topic/api/mocks'
import { Skeleton, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './style.module.scss'
import { ContentTopic } from '@/entities/Forum/topic/ui'

const { Title } = Typography

export const TopicDetailPage = () => {
  const { idTopic } = useParams()
  const [contentTopic, setContentTopic] = useState<ITopic | null>()
  const [comments, setComments] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchTopic = async (id: string) => {
      try {
        const contentTopic = await getTopicById(id)
        setContentTopic(contentTopic)
        const contentComments = await getCommentsByTopicId(id)
        setComments(contentComments)
      } catch (error) {
        console.error('Ошибка получения топика', error)
      } finally {
        setIsLoading(false)
      }
    }

    if (idTopic) {
      setIsLoading(true)
      fetchTopic(idTopic)
    }
  }, [idTopic])

  return (
    <div className={styles.container}>
      {contentTopic ? (
        <ContentTopic contentTopic={contentTopic} />
      ) : (
        <Skeleton active paragraph={{ rows: 4 }} />
      )}

      {isLoading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          <Title level={4}>Комментарии ({comments?.length})</Title>
          <Comments comments={comments} />
          <AddComment />
        </>
      )}
    </div>
  )
}
