import { Button, Card, Form } from 'antd'
import TextArea from 'antd/es/input/TextArea'

export const AddComment = () => {
  const [form] = Form.useForm()

  const handleSubmit = async (values: { content: string }) => {
    console.log(values)
  }

  return (
    <Card title="Добавить комментарий" style={{ marginBottom: 24 }}>
      <Form form={form} onFinish={handleSubmit} layout="vertical">
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
