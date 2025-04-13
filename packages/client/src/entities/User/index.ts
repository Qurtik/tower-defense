import { AuthApi } from './api'
import type { IUserData } from './types'

import { LoginForm } from './ui/LoginForm'
import { RegisterForm } from './ui/RegisterForm'
import { ProfileForm } from './ui/ProfileForm'

import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
} from './model/selectors'

export {
  AuthApi,
  IUserData,
  LoginForm,
  RegisterForm,
  ProfileForm,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
}
