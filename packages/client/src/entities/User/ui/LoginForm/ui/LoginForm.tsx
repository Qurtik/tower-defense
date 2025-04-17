import { Alert, Button, Form, Input, Typography } from 'antd'
import { ILoginFormField, fields } from '../config/fields'
import { LoginFormField, LoginFormValues } from '@/shared/types/auth'

import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { authModel } from '@/entities/User'
import style from './LoginForm.module.scss'
import { useNavigate } from 'react-router'
import { useState } from 'react'
import { VALIDATION_RULES } from '@/shared/constants/validation'

const { Text } = Typography

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const [focusedField, setFocusedField] = useState<LoginFormField | null>(null)
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleFocus = (field: LoginFormField) => setFocusedField(field)
  const handleBlur = () => setFocusedField(null)

  const getFieldPlaceholder = (field: ILoginFormField) => {
    return field.name === focusedField ? '' : String(field.placeholder)
  }

  const onFinish = async (values: LoginFormValues) => {
    setLoading(true)
    setError(null)
    try {
      await authModel.login(values)
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
      className={style['login-form']}
      validateTrigger={['onBlur', 'onChange', 'onSubmit']}>
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
        <Form.Item
          key={field.name}
          name={field.name}
          rules={VALIDATION_RULES[field.name as keyof typeof VALIDATION_RULES]}>
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
