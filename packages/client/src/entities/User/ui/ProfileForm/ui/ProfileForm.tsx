import { Button, Card, Form, Input, Row, Col, message } from 'antd'
import { useEffect, useState } from 'react'

import { ChangeAvatar } from './ChangeAvatar'
import { LogoutBtn } from './Logout'
import { updateProfile } from '@/entities/User/model/thunks'
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/hooksRedux/hooksRedux'
import { Rule } from 'antd/es/form'
import { VALIDATION_RULES } from '@/shared/constants/validation'
import { ChangePassword } from './ChangePassword'
import { selectAuthLoading, selectUser } from '@/entities/User/model/slice'

export const ProfileForm = () => {
  const [isEditing, setIsEditing] = useState(false)
  const [form] = Form.useForm()
  const dispatch = useAppDispatch()
  const profile = useAppSelector(selectUser)
  const isLoading = useAppSelector(selectAuthLoading)

  useEffect(() => {
    if (profile) {
      form.setFieldsValue(profile)
    }
  }, [profile, form])

  const ProfileField: React.FC<{
    label: string
    name: string
    isEditing: boolean
    rules?: Rule[]
  }> = ({ label, name, isEditing, rules }) => {
    return (
      <Row align="middle" style={{ marginBottom: 16 }}>
        <Col style={{ paddingTop: 2 }}>
          <strong>{label}:</strong>
        </Col>
        <Col>
          {isEditing ? (
            <Form.Item
              name={name}
              rules={VALIDATION_RULES[name as keyof typeof VALIDATION_RULES]}
              style={{ margin: 0 }}>
              <Input />
            </Form.Item>
          ) : (
            <span>{profile?.[name as keyof typeof profile]}</span>
          )}
        </Col>
      </Row>
    )
  }

  // Обработчик сохранения
  const handleSave = async () => {
    try {
      const values = await form.validateFields()
      await dispatch(updateProfile(values)).unwrap()
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
          <ChangeAvatar />
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
          <ProfileField label="Логин" name="login" isEditing={isEditing} />
          <ProfileField
            label="Никнейм"
            name="display_name"
            isEditing={isEditing}
          />
          <ProfileField label="Имя" name="first_name" isEditing={isEditing} />
          <ProfileField
            label="Фамилия"
            name="second_name"
            isEditing={isEditing}
          />
          <ProfileField label="Email" name="email" isEditing={isEditing} />
          <div>
            Пароль: <ChangePassword />
          </div>
        </Form>
      </div>
    </Card>
  )
}
