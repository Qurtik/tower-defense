import { List, Tooltip, Typography } from 'antd'
import { IComment } from '../../api'
import { formateDate } from '@/shared/lib/formateDate/formateDate'
import EmojiSection from '@/entities/Forum/comment/ui/EmojiSection/EmojiSection'

import styles from './style.module.scss'

const { Text, Paragraph } = Typography

type CommentsProps = {
  comments: IComment[]
}

export const Comments: React.FC<CommentsProps> = ({ comments }) => {
  return (
    <List
      itemLayout="vertical"
      dataSource={comments}
      renderItem={comment => (
        <List.Item
          key={comment.id}
          className={styles.item}
          actions={[
            <Tooltip
              title={formateDate(comment.createdAt)}
              key={`time-${comment.id}`}>
              <span>{formateDate(comment.createdAt)}</span>
            </Tooltip>,
            <EmojiSection key={comment.id} />,
          ]}>
          <List.Item.Meta
            title={
              <Text strong>
                {comment.user?.display_name || comment.user.email}
              </Text>
            }
            description={
              <Paragraph style={{ marginBottom: 0 }}>
                {comment.content}
              </Paragraph>
            }
          />
        </List.Item>
      )}
    />
  )
}
