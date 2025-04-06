import { AuthApi } from './api'
import { useUserModel, authModel } from './model'
import type { IUserData } from './types'

import { LoginForm } from './ui/LoginForm'
import { RegisterForm } from './ui/RegisterForm'
import { ProfileForm } from './ui/ProfileForm'

export {
  useUserModel,
  authModel,
  AuthApi,
  IUserData,
  LoginForm,
  RegisterForm,
  ProfileForm,
}
