import { useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import style from './LoginForm.module.scss'
import { LoginFormField, LoginFormValues } from '@/shared/types/auth'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router'
import { fields, ILoginFormField } from '../config/fields'
import { useAppDispatch } from '@/shared/hooks/hooksRedux/hooksRedux'
import { login } from '@/entities/User/model/thunks'

const { Text } = Typography

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const [focusedField, setFocusedField] = useState<LoginFormField | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleFocus = (field: LoginFormField) => setFocusedField(field)

  const handleBlur = () => setFocusedField(null)

  const getFieldPlaceholder = (field: ILoginFormField) => {
    return field.name === focusedField ? '' : field.placeholder
  }

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    setError(null)
    try {
      await dispatch(login(values))
      navigate('/')
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message)
      }
    } finally {
      setLoading(false)
    }
  }

  return (
    <Form
      form={form}
      name="login"
      onFinish={onFinish}
      layout="vertical"
      className={style['login-form']}>
      {error && (
        <Alert
          message={error}
          type="error"
          showIcon
          closable
          onClose={() => setError(null)}
          className={style['error']}
        />
      )}

      {fields.map(field => (
        <Form.Item key={field.name} name={field.name} rules={field.rules}>
          {field.type === 'password' ? (
            <Input.Password
              prefix={field.getPrefix ? field.getPrefix() : null}
              placeholder={getFieldPlaceholder(field)}
              onFocus={() => handleFocus(field.name)}
              onBlur={handleBlur}
            />
          ) : (
            <Input
              prefix={field.getPrefix ? field.getPrefix() : null}
              placeholder={getFieldPlaceholder(field)}
              onFocus={() => handleFocus(field.name)}
              onBlur={handleBlur}
            />
          )}
        </Form.Item>
      ))}

      <Form.Item>
        <Button
          type="primary"
          htmlType="submit"
          block
          loading={loading}
          disabled={loading}>
          {!loading && 'Авторизоваться'}
        </Button>
        <div className={style['button-link-register']}>
          <Text type="secondary">Еще нет регистрации?! </Text>
          <NavigationLink to={ROUTES.REGISTER}>Регистрация</NavigationLink>
        </div>
      </Form.Item>
    </Form>
  )
}
