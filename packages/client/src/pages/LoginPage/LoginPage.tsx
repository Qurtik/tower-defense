import { Card, Typography } from 'antd'
import React from 'react'
import style from './LoginPage.module.scss'

import { LoginForm } from '@/entities/User/ui/LoginForm'

const { Title } = Typography

export const LoginPage = () => {
  return (
    <React.Fragment>
      <Card className={style['login-page']}>
        <Title level={2} className={style['login-title']}>
          Вход
        </Title>
        <LoginForm />
      </Card>
    </React.Fragment>
  )
}
