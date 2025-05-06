import { Alert, Button, Flex, Form, Input, Spin, Typography } from 'antd'
import { ILoginFormField, fields } from '../config/fields'
import { LoginFormField, LoginFormValues } from '@/shared/types/auth'
import {
  useAppDispatch,
  useAppSelector,
} from '@/shared/hooks/hooksRedux/hooksRedux'

import { NavigationLink } from '@/shared/ui/NavigationLink'
import { ROUTES } from '@/shared/constants/routes'
import { VALIDATION_RULES } from '@/shared/constants/validation'
import {
  getAppId,
  getUserInfo,
  login,
  loginViaYandex,
} from '@/entities/User/model/thunks'
import { selectIsLoggingIn } from '@/entities/User/model/slice'
import style from './LoginForm.module.scss'
import { useNavigate, useSearchParams } from 'react-router'
import React, { useEffect, useState } from 'react'
import AuthWrapper from '@/entities/User/ui/AuthWrapper/AuthWrapper'
import { getOAuthURL } from '@/shared/constants/auth'
import YandexLogo from '@/shared/assets/yandex-logo.png'
import { SpinLoader } from '@/shared/ui/Loader'

const { Text } = Typography

export const LoginForm = () => {
  const [form] = Form.useForm<LoginFormValues>()
  const [focusedField, setFocusedField] = useState<LoginFormField | null>(null)
  const [error, setError] = useState<string | null>(null)
  const loading = useAppSelector(selectIsLoggingIn)
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [searchParams, setSearchParams] = useSearchParams()
  const [isOAuthLogin, setIsOAuthLogin] = useState(false)

  const OAuthCode = searchParams.get('code')

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

  const initiateOAuth = async () => {
    const { service_id } = await dispatch(getAppId()).unwrap()
    window.location.href = getOAuthURL(service_id)
  }

  useEffect(() => {
    setSearchParams({})

    const handleOAuthCode = async (code: string) => {
      setSearchParams({})

      try {
        setIsOAuthLogin(true)
        await dispatch(loginViaYandex(code)).unwrap()
        await dispatch(getUserInfo()).unwrap()
      } catch (error) {
        if (typeof error === 'string') {
          setError(error)
        }
      } finally {
        setIsOAuthLogin(false)
      }
    }

    if (OAuthCode) {
      handleOAuthCode(OAuthCode)
    }
  }, [])

  if (OAuthCode || isOAuthLogin) {
    return <SpinLoader />
  }

  return (
    <AuthWrapper title="Вход">
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
            rules={
              VALIDATION_RULES[field.name as keyof typeof VALIDATION_RULES]
            }>
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
          <Flex vertical gap={10}>
            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loading}
              disabled={loading}>
              {!loading && 'Авторизоваться'}
            </Button>
            <Button
              type="text"
              htmlType="button"
              block
              loading={loading}
              disabled={loading}
              onClick={initiateOAuth}>
              {!loading && (
                <Flex gap={10} align="center">
                  <img
                    className={style['yandexLogo']}
                    src={YandexLogo}
                    alt="Логотип Яндекс."
                  />
                  Войти с Яндекс ID
                </Flex>
              )}
            </Button>
            <div className={style['button-link-register']}>
              <Text type="secondary">Еще нет регистрации?! </Text>
              <NavigationLink to={ROUTES.REGISTER}>Регистрация</NavigationLink>
            </div>
          </Flex>
        </Form.Item>
      </Form>
    </AuthWrapper>
  )
}
