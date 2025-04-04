export interface IRegisterFormValues {
  username: string
  email: string
  first_name: string
  phone: string
  second_name: string
  password: string
  confirm_password: string
}

export type RegisterFormField = keyof IRegisterFormValues
