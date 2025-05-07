import { IUserData } from './../types/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api'
import {
  IRegisterFormValues,
  IServiceId,
  LoginFormValues,
} from '@/shared/types/auth'
import { IRegisterDataResponse } from '../types'

const createAppAsyncThunk = <ReturnType, ArgType>(
  typePrefix: string,
  request: (arg: ArgType) => Promise<ReturnType>,
  errorMessage: string,
  handleErrorMessage?: (error: unknown) => string
) => {
  return createAsyncThunk<ReturnType, ArgType, { rejectValue: string }>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await request(arg)
      } catch (error) {
        if (handleErrorMessage) {
          return rejectWithValue(handleErrorMessage(error))
        }
        return rejectWithValue(errorMessage)
      }
    }
  )
}

export const register = createAppAsyncThunk<
  IRegisterDataResponse,
  IRegisterFormValues
>(
  'auth/register',
  userData => authApi.createAccount(userData),
  'Регистрация не удалась, попробуйте позднее'
)

export const login = createAppAsyncThunk<void, LoginFormValues>(
  'auth/login',
  userData => authApi.authenticate(userData),
  'Неудачный вход :('
)

export const logout = createAppAsyncThunk<void, void>(
  'auth/logout',
  () => authApi.terminateSession(),
  'Ошибка при выходе'
)

export const getAppId = createAppAsyncThunk<IServiceId, void>(
  'oauth/id',
  () => authApi.getOAuthAppId(),
  'Ошибка для получении appId'
)

export const loginViaYandex = createAppAsyncThunk<void, string>(
  'oauth/loginViaYandex',
  code => authApi.loginViaYandex(code),
  'Ошибка при входе через Яндекс ID',
  error => {
    if (
      error instanceof Error &&
      error.message.includes('Email already exists')
    ) {
      return 'Пользователь уже зарегистрирован через логин и пароль. Используйте их для входа.'
    }

    return 'Ошибка при входе через Яндекс ID'
  }
)

export const getUserInfo = createAppAsyncThunk<IUserData, void>(
  'auth/fetchUserInfo',
  () => authApi.fetchUserData(),
  'Ошибка получения данных пользователя'
)

export const getResource = createAppAsyncThunk<string, string>(
  'user/getResource',
  async path => {
    await authApi.getResource(path)
    return `https://ya-praktikum.tech/api/v2/resources/${path}`
  },
  'Ошибка получения аватара'
)

export const changePassword = createAppAsyncThunk<
  void,
  { oldPassword: string; newPassword: string }
>(
  'user/changePassword',
  data => authApi.changePasswordRequest(data),
  'Ошибка изменения пароля'
)

export const changeAvatar = createAppAsyncThunk<IUserData, File>(
  'user/changeAvatar',
  file => {
    const formData = new FormData()
    formData.append('avatar', file)
    return authApi.changeAvatarRequest(formData)
  },
  'Аватар не загружен'
)

export const updateProfile = createAppAsyncThunk<IUserData, IUserData>(
  'user/updateProfile',
  data => authApi.changeProfileRequest(data),
  'Ошибка изменения данных профиля'
)
