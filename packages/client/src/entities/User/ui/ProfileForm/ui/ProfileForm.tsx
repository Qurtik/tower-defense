import { Button, Card, Form, Input, Row, Col, message } from 'antd'
import { useCallback, useEffect, useState } from 'react'

import { useUserModel } from '@/entities/User'

import { ChangePassword } from './ChangePassword'
import { ChangeAvatar } from './ChangeAvatar'
import { LogoutBtn } from './Logout'
import {
  validateName,
  validateLogin,
  validateEmail,
} from '@/shared/utils/validation'

export const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false)

  const [loadingComponents, setLoadingComponents] = useState<
    Record<string, boolean>
  >({})

  const registerComponent = useCallback((id: string) => {
    setLoadingComponents(prev => ({ ...prev, [id]: false }))
  }, [])

  const unregisterComponent = useCallback((id: string) => {
    setLoadingComponents(prev => {
      const newState = { ...prev }
      delete newState[id]
      return newState
    })
  }, [])

  const handleComponentLoaded = useCallback((id: string) => {
    setLoadingComponents(prev => ({ ...prev, [id]: true }))
  }, [])

  const isLoading = Object.values(loadingComponents).some(status => !status)

  const [form] = Form.useForm()

  useEffect(() => {
    registerComponent('ProfileForm')
    useUserModel.login({ login: 'Testzzzxxx', password: '123123123' })
    useUserModel
      .getUserInfo()
      .then(response => {
        setProfile(response)
        form.setFieldsValue(response)
      })
      .finally(() => {
        handleComponentLoaded('ProfileForm')
      })
  }, [])

  const defaultProfile = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
  }

  const [profile, setProfile] = useState({ ...defaultProfile })

  const ProfileField: React.FC<{
    label: string
    name: string
    isEditing: boolean
    rules?: any[]
  }> = ({ label, name, isEditing, rules }) => {
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
      loading={isLoading}
      style={{
        maxWidth: 900,
        margin: '0 auto',
      }}
      actions={[
        isEditing ? (
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
        ) : (
          <LogoutBtn text="Выйти" />
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
          <ChangeAvatar
            onMount={registerComponent}
            onLoad={handleComponentLoaded}
            onUnmount={unregisterComponent}
          />
        </div>

        <Form
          form={form}
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            width: '300px',
          }}
          layout="vertical">
          <ProfileField
            label="Имя"
            name="first_name"
            isEditing={isEditing}
            rules={[
              {
                validator: (_, value) => validateName(value),
              },
            ]}
          />
          <ProfileField
            label="Фамилия"
            name="second_name"
            isEditing={isEditing}
            rules={[
              {
                validator: (_, value) => validateName(value),
              },
            ]}
          />
          <ProfileField
            label="Никнейм"
            name="login"
            isEditing={isEditing}
            rules={[
              {
                validator: (_, value) => validateLogin(value),
              },
            ]}
          />
          <ProfileField
            label="Email"
            name="email"
            isEditing={isEditing}
            rules={[
              {
                validator: (_, value) => validateEmail(value),
              },
            ]}
          />
          <div>
            Пароль: <ChangePassword />
          </div>
        </Form>
      </div>
    </Card>
  )
}
