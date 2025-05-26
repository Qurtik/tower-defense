import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectUser } from '@/entities/User'
import { getTopicById, ITopic } from '@/entities/Forum/topic/api'
import {
  getCommentsByTopicId,
  addComment,
  IComment,
} from '@/entities/Forum/comment/api'
import { ContentTopic } from '@/entities/Forum/topic/ui'
import { Comments } from '@/entities/Forum/comment/ui'
import { AddComment } from '@/entities/Forum/comment/ui'
import { Skeleton, Typography } from 'antd'
import { useEffect, useState } from 'react'
import { useParams } from 'react-router'
import styles from './style.module.scss'

const { Title } = Typography

export const TopicDetailPage = () => {
  const { idTopic } = useParams<{ idTopic: string }>()
  const user = useAppSelector(selectUser)
  const [topic, setTopic] = useState<ITopic | null>(null)
  const [comments, setComments] = useState<IComment[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const fetchData = async () => {
    if (!user || !idTopic) return
    setIsLoading(true)
    try {
      const topicResponse = await getTopicById(Number(idTopic))
      const topicData = Array.isArray(topicResponse)
        ? topicResponse[0]?.topic
        : ''
      setTopic(topicData)
      const commentsData = await getCommentsByTopicId(Number(idTopic))
      setComments(commentsData)
    } catch (e) {
      console.error('Ошибка загрузки данных темы или комментариев', e)
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [idTopic, user])

  const handleAddComment = async (content: string) => {
    if (!user || !idTopic) return
    try {
      await addComment(Number(idTopic), content)
      await fetchData()
    } catch (e) {
      console.error('Ошибка добавления комментария', e)
    }
  }

  return (
    <div className={styles.container}>
      {isLoading ? (
        <Skeleton active paragraph={{ rows: 4 }} />
      ) : (
        <>
          {topic && <ContentTopic contentTopic={topic} />}
          <Title level={4}>Комментарии ({comments?.length})</Title>
          <Comments comments={comments} />
          <AddComment onSubmit={handleAddComment} />
        </>
      )}
    </div>
  )
}
