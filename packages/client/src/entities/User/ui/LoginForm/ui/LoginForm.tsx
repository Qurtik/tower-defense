import { useState } from 'react'
import { Alert, Button, Form, Input, Typography } from 'antd'
import style from './LoginForm.module.scss'
import { LoginFormField, LoginFormValues } from '@/shared/types/auth'
import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { useNavigate } from 'react-router'
import { fields, ILoginFormField } from '../config/fields'
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/hooksRedux/hooksRedux'
import { login } from '@/entities/User/model/thunks'
import { VALIDATION_RULES } from '@/shared/constants/validation'
import { selectIsLoggingIn } from '@/entities/User/model/selectors'

const { Text } = Typography

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const [focusedField, setFocusedField] = useState<LoginFormField | null>(null)
  const [error, setError] = useState<string | null>(null)
  const loading = useAppSelector(selectIsLoggingIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()

  const handleFocus = (field: LoginFormField) => setFocusedField(field)
  const handleBlur = () => setFocusedField(null)

  const getFieldPlaceholder = (field: ILoginFormField) => {
    return field.name === focusedField ? '' : String(field.placeholder)
  }

  const onFinish = async (values: LoginFormValues) => {
    setError(null)
    try {
      await dispatch(login(values)).unwrap()
      navigate(ROUTES.ROOT)
    } catch (error) {
      if (typeof error === 'string') {
        setError(error)
      }
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
