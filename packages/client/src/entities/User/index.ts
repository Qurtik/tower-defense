import { AuthApi } from './api'
import { LoginForm } from './ui/LoginForm'
import { RegisterForm } from './ui/RegisterForm'
import { ProfileForm } from './ui/ProfileForm'
import {
  changeAvatar,
  changePassword,
  getUserInfo,
  login,
  logout,
  register,
  updateProfile,
} from './model/thunks'
import {
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
  selectIsLoggingIn,
  selectIsLoggingOut,
  selectIsRegistering,
  userSlice,
} from './model/slice'

export {
  AuthApi,
  LoginForm,
  RegisterForm,
  ProfileForm,
  changeAvatar,
  changePassword,
  getUserInfo,
  login,
  logout,
  register,
  updateProfile,
  userSlice,
  selectAuthError,
  selectAuthLoading,
  selectIsAuthenticated,
  selectUser,
  selectIsLoggingIn,
  selectIsLoggingOut,
  selectIsRegistering,
}
