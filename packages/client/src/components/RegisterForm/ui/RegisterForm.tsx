import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert } from 'antd'
import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import style from './RegisterForm.module.scss'
import {
  AuthFormPlaceholders,
  IRegisterFormValues,
  RegisterFormField,
} from '../../../types/auth'
import { NavigationLink } from '../../NavigationLink'
import { ROUTES } from '../../../routes/RouteConfig'

const { Title, Text } = Typography

export const RegisterForm = () => {
  const [form] = Form.useForm<IRegisterFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const [focusedField, setFocusedField] = useState<RegisterFormField | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)

  const handleFocus = (field: RegisterFormField) => setFocusedField(field)
  const handleBlur = () => setFocusedField(null)

  const onFinish = (values: IRegisterFormValues) => {
    setLoading(true)
    setError(null)
    console.log('Received values:', values)
    //Симуляция запроса временно до подключения АПИ
    setTimeout(() => {
      setError('Ошибка регистрации')
      setLoading(false)
    }, 2000)
  }

  const getPlaceholder = (field: RegisterFormField): string => {
    if (focusedField === field) return ''

    const placeholderMap: Record<keyof IRegisterFormValues, string> = {
      username: AuthFormPlaceholders.USERNAME,
      email: AuthFormPlaceholders.EMAIL,
      first_name: AuthFormPlaceholders.FIRST_NAME,
      second_name: AuthFormPlaceholders.SECOND_NAME,
      phone: AuthFormPlaceholders.PHONE,
      password: AuthFormPlaceholders.PASSWORD,
      confirm_password: AuthFormPlaceholders.CONFIRM_PASSWORD,
    }

    return placeholderMap[field]
  }

  return (
    <Card className={style['register-form']}>
      <Title level={2} className={style['register-title']}>
        Регистрация
      </Title>

      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          className={style.error}
        />
      )}

      <Form form={form} name="register" onFinish={onFinish} layout="vertical">
        <Form.Item
          name="username"
          rules={[{ required: true, message: 'Введите имя пользователя!' }]}>
          <Input
            prefix={<UserOutlined />}
            placeholder={getPlaceholder('username')}
            onFocus={() => handleFocus('username')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              message: 'Введите корректный email!',
            },
          ]}>
          <Input
            prefix={<MailOutlined />}
            placeholder={getPlaceholder('email')}
            onFocus={() => handleFocus('email')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="first_name"
          rules={[{ required: true, message: 'Введите имя!' }]}>
          <Input
            placeholder={getPlaceholder('first_name')}
            onFocus={() => handleFocus('first_name')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="second_name"
          rules={[{ required: true, message: 'Введите фамилию!' }]}>
          <Input
            placeholder={getPlaceholder('second_name')}
            onFocus={() => handleFocus('second_name')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="phone"
          rules={[{ required: true, message: 'Введите номер телефона!' }]}>
          <Input
            prefix={<PhoneOutlined />}
            placeholder={getPlaceholder('phone')}
            onFocus={() => handleFocus('phone')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Введите пароль!' }]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={getPlaceholder('password')}
            onFocus={() => handleFocus('password')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item
          name="confirm_password"
          dependencies={['password']}
          rules={[
            { required: true, message: 'Повторите пароль!' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve()
                }
                return Promise.reject(new Error('Пароли не совпадают!'))
              },
            }),
          ]}>
          <Input.Password
            prefix={<LockOutlined />}
            placeholder={getPlaceholder('confirm_password')}
            onFocus={() => handleFocus('confirm_password')}
            onBlur={handleBlur}
          />
        </Form.Item>

        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            block
            loading={loading}
            disabled={loading}>
            {!loading && 'Зарегистрироваться'}
          </Button>

          <div className={style['button-link-login']}>
            <Text type="secondary">Уже есть аккаунт? </Text>
            <NavigationLink to={ROUTES.LOGIN}>Войти</NavigationLink>
          </div>
        </Form.Item>
      </Form>
    </Card>
  )
}
