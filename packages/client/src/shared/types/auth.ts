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

// #region Login types
export type LoginFormValues = Pick<IRegisterFormValues, 'login' | 'password'>
export type LoginFormField = keyof LoginFormValues
// #endregion
