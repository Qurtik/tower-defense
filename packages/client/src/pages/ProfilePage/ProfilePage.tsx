import { Button, Card, Form, Input, Row, Col, message } from 'antd'
import { useEffect, useState } from 'react'

import { useUserModel } from '@/entities/User'
import { ChangePassword } from '@/features/change-password'
import { ChangeAvatar } from '@/features/change-avatar'

export const ProfilePage = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()

  useEffect(() => {
    useUserModel.login({ login: 'Testzzzxxx', password: '123123123' })
    useUserModel.getUserInfo().then(response => {
      console.log('GetUserInfo:', response)
      setProfile(response)
      form.setFieldsValue(response)
    })
  }, [])

  const [profile, setProfile] = useState({
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  })

  const ProfileField: React.FC<{
    label: string
    name: string
    isEditing: boolean
    rules?: any[]
    //  onChange?: (name: string, value: string) => void
  }> = ({ label, name, /*value,*/ isEditing, rules /*onChange*/ }) => {
    return (
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col style={{ paddingTop: 2 }}>
          <strong>{label}:</strong>
        </Col>
        <Col>
          {isEditing ? (
            <Form.Item name={name} rules={rules} style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          ) : (
            <span>{form.getFieldValue([name])}</span>
          )}
        </Col>
      </Row>
    )
  }

  // Обработчик сохранения
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await useUserModel.userChangeProfile(values)

      setProfile(prev => ({ ...prev, ...values }))
      setIsEditing(false)
      message.success('Данные успешно сохранены')
    } catch (error) {
      message.error('Ошибка при сохранении')
    }
  }

  return (
    <Card
      title="Профиль пользователя"
      style={{
        maxWidth: 900,
        margin: '0 auto',
      }}
      actions={[
        isEditing && (
          <>
            <Button type="primary" onClick={handleSave}>
              Сохранить
            </Button>
            <Button
              style={{ marginLeft: 16 }}
              onClick={() => setIsEditing(false)}>
              Отмена
            </Button>
          </>
        ),
      ]}
      extra={
        !isEditing && (
          <Button onClick={() => setIsEditing(true)}>Редактировать</Button>
        )
      }>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-evenly',
        }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <ChangeAvatar />
        </div>

        <Form
          form={form}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
          }}
          layout="vertical">
          {/* Поле Имя */}
          <ProfileField
            label="Имя"
            name="first_name"
            isEditing={isEditing}
            // rules={[
            //   { required: true, message: 'Пожалуйста, введите имя!' },
            //   { min: 3, message: 'Имя должно быть не менее 3 символов!' },
            // ]}
          />
          {/* Поле Фамилия */}
          <ProfileField
            label="Фамилия"
            name="second_name"
            isEditing={isEditing}
            // rules={[
            //   {
            //     required: true,
            //   },
            // ]}
          />
          {/* Поле login */}
          <ProfileField
            label="Никнейм"
            name="login"
            isEditing={isEditing}
            // rules={[
            //   {
            //     required: true,
            //     min: 3,
            //     max: 20,
            //     message: 'Введите корректный Никнейм! От 3 до 20 символов',
            //   },
            // ]}
          />
          {/* Поле email */}
          <ProfileField
            label="Email"
            name="email"
            isEditing={isEditing}
            // rules={[
            //   {
            //     required: true,
            //     type: 'email',
            //     message: 'Введите корректный email!',
            //   },
            // ]}
          />
          <div>
            Пароль: <ChangePassword />
          </div>
        </Form>
      </div>
    </Card>
  )
}
