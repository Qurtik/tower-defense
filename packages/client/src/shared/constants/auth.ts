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
export type LoginFormValues = Pick<IRegisterFormValues, 'username' | 'password'>
export type LoginFormField = keyof LoginFormValues
export enum LoginFormPlaceholders {
  USERNAME = AuthFormPlaceholders.USERNAME,
  PASSWORD = AuthFormPlaceholders.PASSWORD,
}
// #endregion
