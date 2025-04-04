import { LockOutlined, UserOutlined } from '@ant-design/icons'
import { LoginFormPlaceholders, LoginFormValues } from '../../../types/auth'

import { Rule } from 'antd/es/form'

export interface ILoginFormField {
  name: keyof LoginFormValues
  getPrefix?: () => React.ReactNode
  rules?: Rule[]
  placeholder?: LoginFormPlaceholders
  type?: 'text' | 'password'
}

export const fields: ILoginFormField[] = [
  {
    name: 'username',
    getPrefix: () => <UserOutlined />,
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите имя пользователя!',
      },
    ],
    type: 'text',
    placeholder: LoginFormPlaceholders.USERNAME,
  },
  {
    name: 'password',
    getPrefix: () => <LockOutlined />,
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите пароль!',
      },
    ],
    type: 'password',
    placeholder: LoginFormPlaceholders.PASSWORD,
  },
]
