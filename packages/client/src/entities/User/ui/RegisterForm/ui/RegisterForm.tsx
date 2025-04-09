import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert } from 'antd'
import style from './RegisterForm.module.scss'
import { IRegisterFormValues, RegisterFormField } from '@/shared/types/auth'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router'
import { authModel } from '@/entities/user/model'
import { fields, IFormField } from '../config/fields'
import {
  validateName,
  validateLogin,
  validateEmail,
  validatePassword,
  validatePhone,
} from '@/shared/utils/validation'

const { Title, Text } = Typography

export const RegisterForm = () => {
  const [form] = Form.useForm<IRegisterFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const [focusedField, setFocusedField] = useState<RegisterFormField | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()

  const handleFocus = (field: RegisterFormField) => setFocusedField(field)

  const handleBlur = async (field: string) => {
    try {
      await form.validateFields([field])
    } catch (error) {
      console.log('Validation error on blur:', error)
    }
    setFocusedField(null)
  }

  const getFieldPlaceholder = (field: IFormField) => {
    return field.name === focusedField ? '' : field.placeholder
  }

  const onFinish = async (values: IRegisterFormValues) => {
    setLoading(true)
    setError(null)
    try {
      await authModel.register(values)
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
          <Form.Item
            key={field.name}
            name={field.name}
            rules={[
              field.name === 'first_name' || field.name === 'second_name'
                ? {
                    validator: (_, value) => validateName(value),
                  }
                : field.name === 'login'
                ? {
                    validator: (_, value) => validateLogin(value),
                  }
                : field.name === 'email'
                ? {
                    validator: (_, value) => validateEmail(value),
                  }
                : field.name === 'phone'
                ? {
                    validator: (_, value) => validatePhone(value),
                  }
                : field.name === 'password'
                ? {
                    validator: (_, value) => validatePassword(value),
                  }
                : field.name === 'confirm_password'
                ? {
                    validator: (_, value) => {
                      if (value !== form.getFieldValue('password')) {
                        return Promise.reject(new Error('Пароли не совпадают'))
                      }
                      return Promise.resolve()
                    },
                  }
                : {},
            ]}>
            {field.type === 'password' ? (
              <Input.Password
                prefix={field.getPrefix ? field.getPrefix() : null}
                placeholder={getFieldPlaceholder(field)}
                onFocus={() => handleFocus(field.name)}
                onBlur={() => handleBlur(field.name)}
              />
            ) : (
              <Input
                prefix={field.getPrefix ? field.getPrefix() : null}
                placeholder={getFieldPlaceholder(field)}
                onFocus={() => handleFocus(field.name)}
                onBlur={() => handleBlur(field.name)}
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
