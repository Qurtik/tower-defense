export interface IRegisterFormValues {
  login: string
  email: string
  first_name: string
  phone: string
  second_name: string
  password: string
  confirm_password: string
}

export type RegisterFormField = keyof IRegisterFormValues

export enum AuthFormPlaceholders {
  USERNAME = 'Имя пользователя',
  EMAIL = 'Email',
  FIRST_NAME = 'Имя',
  SECOND_NAME = 'Фамилия',
  PHONE = 'Телефон',
  PASSWORD = 'Пароль',
  CONFIRM_PASSWORD = 'Повторите пароль',
}

// #region Login types
export type LoginFormValues = Pick<IRegisterFormValues, 'login' | 'password'>
export type LoginFormField = keyof LoginFormValues
export enum LoginFormPlaceholders {
  USERNAME = AuthFormPlaceholders.USERNAME,
  PASSWORD = AuthFormPlaceholders.PASSWORD,
}
// #endregion

export const getOAuthURL = (serviceId: string) =>
  `https://oauth.yandex.ru/authorize?response_type=code&client_id=${serviceId}&redirect_uri=${
    import.meta.env.VITE_OAUTH_REDIRECT_URI
  }`
