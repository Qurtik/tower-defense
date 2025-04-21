import { formateDate } from '@/shared/lib/formateDate/formateDate'
import { Card, Space, Typography } from 'antd'
import { ITopic } from '../../api/mocks'
import styles from './styles.module.scss'

const { Title, Text, Paragraph } = Typography

type ContentTopicProps = {
  contentTopic: ITopic
}
export const ContentTopic: React.FC<ContentTopicProps> = ({ contentTopic }) => {
  return (
    <Card
      title={<Title level={4}>{contentTopic?.title}</Title>}
      style={{ marginBottom: 24 }}>
      <Space direction="vertical" size="middle" style={{ width: '100%' }}>
        <div className={styles['container-author']}>
          <Text strong style={{ marginLeft: 12 }}>
            {contentTopic?.author}
          </Text>
        </div>

        <Paragraph>{contentTopic?.content}</Paragraph>
        <Text type="secondary">{formateDate(contentTopic?.createdAt)}</Text>
      </Space>
    </Card>
  )
}
