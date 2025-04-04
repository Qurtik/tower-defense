import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert } from 'antd'
import style from './RegisterForm.module.scss'
import { IRegisterFormValues, RegisterFormField } from '@/shared/types/auth'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { fields, IFormField } from '../config/fields'

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

  const getFieldPlaceholder = (field: IFormField) => {
    return field.name === focusedField ? '' : field.placeholder
  }

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
