import {
  LockOutlined,
  UserOutlined,
  MailOutlined,
  PhoneOutlined,
} from '@ant-design/icons'
import { AuthFormPlaceholders, IRegisterFormValues } from '../../../types/auth'
import { Rule } from 'antd/es/form'

export interface IFormField {
  name: keyof IRegisterFormValues
  getPrefix?: () => React.ReactNode
  rules?: Rule[]
  placeholder?: AuthFormPlaceholders
  type?: 'text' | 'password'
  dependencies?: Array<keyof IRegisterFormValues>
}

export const fields: IFormField[] = [
  {
    name: 'login',
    getPrefix: () => <UserOutlined />,
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите имя пользователя!',
      },
    ],
    type: 'text',
    placeholder: AuthFormPlaceholders.USERNAME,
  },
  {
    name: 'email',
    getPrefix: () => <MailOutlined />,
    rules: [
      {
        required: true,
        type: 'email',
        message: 'Введите корректный email!',
      },
    ],
    type: 'text',
    placeholder: AuthFormPlaceholders.EMAIL,
  },
  {
    name: 'first_name',
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите имя!',
      },
    ],
    type: 'text',
    placeholder: AuthFormPlaceholders.FIRST_NAME,
  },
  {
    name: 'second_name',
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите фамилию!',
      },
    ],
    type: 'text',
    placeholder: AuthFormPlaceholders.SECOND_NAME,
  },
  {
    name: 'phone',
    getPrefix: () => <PhoneOutlined />,
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите номер телефона!',
      },
    ],
    type: 'text',
    placeholder: AuthFormPlaceholders.PHONE,
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
    placeholder: AuthFormPlaceholders.PASSWORD,
  },
  {
    name: 'confirm_password',
    dependencies: ['password'],
    getPrefix: () => <LockOutlined />,
    rules: [
      {
        required: true,
        type: 'string',
        message: 'Введите пароль!',
      },
      ({ getFieldValue }) => ({
        validator(_, value) {
          if (!value || getFieldValue('password') === value) {
            return Promise.resolve()
          }
          return Promise.reject(new Error('Пароли не совпадают!'))
        },
      }),
    ],
    type: 'password',
    placeholder: AuthFormPlaceholders.CONFIRM_PASSWORD,
  },
]
