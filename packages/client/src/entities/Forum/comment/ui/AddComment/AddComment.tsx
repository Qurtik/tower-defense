import { Button, Card, Form, Input } from 'antd'

const { TextArea } = Input

type AddCommentProps = {
  onSubmit: (content: string) => Promise<void>
}

export const AddComment: React.FC<AddCommentProps> = ({ onSubmit }) => {
  const [form] = Form.useForm()

  const handleFinish = async (values: { content: string }) => {
    await onSubmit(values.content)
    form.resetFields()
  }

  return (
    <Card title="Добавить комментарий" style={{ marginBottom: 24 }}>
      <Form form={form} onFinish={handleFinish} layout="vertical">
        <Form.Item
          name="content"
          rules={[
            { required: true, message: 'Сообщение не может быть пустым!' },
          ]}>
          <TextArea
            rows={4}
            placeholder="Напишите ваш комментарий..."
            style={{ flex: 1 }}
          />
        </Form.Item>
        <Button type="primary" htmlType="submit">
          Отправить
        </Button>
      </Form>
    </Card>
  )
}
