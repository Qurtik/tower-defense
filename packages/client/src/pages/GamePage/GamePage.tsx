import { Button, Typography } from 'antd'

export const GamePage = () => {
  const { Paragraph, Title } = Typography

  return (
    <div>
      <Button type={'default'} size={'large'}>
        Начать миссию
      </Button>
      <Button type={'text'} size={'middle'}>
        Редактировать
      </Button>
      <Title level={1}>Заголовок</Title>
      <Paragraph>Параграф</Paragraph>
    </div>
  )
}
