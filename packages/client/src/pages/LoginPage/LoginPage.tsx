import { Card, Typography } from 'antd'

import { LoginForm } from '../../components/LoginForm'
import React from 'react'
import style from './LoginPage.module.scss'

const { Title } = Typography

export const LoginPage = () => {
  return (
    <React.Fragment>
      <Card className={style['login-page']}>
        <Title level={2} className={style['login-title']}>
          Login
        </Title>
        <LoginForm />
      </Card>
    </React.Fragment>
  )
}
