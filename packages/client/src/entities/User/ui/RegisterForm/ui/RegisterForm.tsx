import { useState } from 'react'
import { Form, Input, Button, Card, Typography, Alert } from 'antd'
import style from './RegisterForm.module.scss'
import { IRegisterFormValues, RegisterFormField } from '@/shared/types/auth'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router'
import { fields, IFormField } from '../config/fields'
import { useAppDispatch } from '@/shared/hooks/hooksRedux/hooksRedux'
import { register } from '@/entities/User/model/thunks'
import {
  VALIDATION_RULES,
  confirmPasswordMismatch,
} from '@/shared/constants/validation'

const { Title, Text } = Typography

export const RegisterForm = () => {
  const [form] = Form.useForm<IRegisterFormValues>()
  const [loading, setLoading] = useState<boolean>(false)
  const [focusedField, setFocusedField] = useState<RegisterFormField | null>(
    null
  )
  const [error, setError] = useState<string | null>(null)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleFocus = (field: RegisterFormField) => setFocusedField(field)
  const handleBlur = () => setFocusedField(null)

  const getFieldPlaceholder = (field: IFormField) => {
    return field.name === focusedField ? '' : field.placeholder
  }

  const onFinish = async (values: IRegisterFormValues) => {
    setLoading(true)
    setError(null)
    try {
      await dispatch(register(values)).unwrap()
      navigate('/')
    } catch (error) {
      if (typeof error === 'string') {
        setError(error)
      }
    } finally {
      setLoading(false)
    }
  }

  const getFieldRules = (fieldName: string) => {
    if (fieldName === 'confirm_password') {
      return [
        { required: true, message: 'Поле обязательно' },
        ({ getFieldValue }) => ({
          validator(_, value) {
            if (!value || getFieldValue('password') === value) {
              return Promise.resolve()
            }
            return Promise.reject(new Error(confirmPasswordMismatch))
          },
        }),
      ]
    }

    return VALIDATION_RULES[fieldName as keyof typeof VALIDATION_RULES] || []
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

      <Form
        form={form}
        name="register"
        onFinish={onFinish}
        layout="vertical"
        validateTrigger={['onBlur', 'onChange', 'onSubmit']}>
        {fields.map(field => (
          <Form.Item
            key={field.name}
            name={field.name}
            rules={getFieldRules(field.name)}>
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
