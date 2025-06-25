import { ROUTES } from '@/shared/constants/routes'
import { createTopic } from '../../api'
import { Form, Input, Button } from 'antd'
import { useAppSelector } from '@/shared/hooks/hooksRedux/hooksRedux'
import { selectUser } from '@/entities/User'
import { useNavigate } from 'react-router'
import styles from './styles.module.scss'

interface ITopicData {
  title: string
  content: string
}

export const FormCreateTopic = () => {
  const [form] = Form.useForm<ITopicData>()
  const user = useAppSelector(selectUser)
  const navigate = useNavigate()

  const handleSubmit = async (values: ITopicData) => {
    if (!user) return
    try {
      await createTopic(values.title, values.content)
      navigate(ROUTES.FORUM)
    } catch (error) {
      console.error('Error creating topic:', error)
    }
  }
  return (
    <Form form={form} onFinish={handleSubmit} layout="vertical">
      <Form.Item
        name="title"
        label="Название темы"
        rules={[{ required: true, message: 'Введите название темы!' }]}>
        <Input placeholder="Название темы" />
      </Form.Item>
      <Form.Item
        name="content"
        label="Сообщение"
        rules={[{ required: true, message: 'Введите сообщение !' }]}>
        <Input.TextArea rows={6} placeholder="Сообщение" />
      </Form.Item>
      <Form.Item>
        <div className={styles['container-button']}>
          <Button type="primary" htmlType="submit">
            Создать топик
          </Button>
        </div>
      </Form.Item>
    </Form>
  )
}
