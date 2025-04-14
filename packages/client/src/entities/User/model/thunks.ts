import { IUserData } from './../types/index'
import { createAsyncThunk } from '@reduxjs/toolkit'
import { authApi } from '../api'
import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'
import { IRegisterDataResponse } from '../types'

const createAppAsyncThunk = <ReturnType, ArgType>(
  typePrefix: string,
  request: (arg: ArgType) => Promise<ReturnType>,
  errorMessage: string
) => {
  return createAsyncThunk<ReturnType, ArgType, { rejectValue: string }>(
    typePrefix,
    async (arg, { rejectWithValue }) => {
      try {
        return await request(arg)
      } catch (error) {
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
  async file => {
    const formData = new FormData()
    formData.append('avatar', file)
    return await authApi.changeAvatarRequest(formData)
  },
  'Аватар не загружен'
)

export const updateProfile = createAppAsyncThunk<IUserData, IUserData>(
  'user/updateProfile',
  async data => {
    await authApi.changeProfileRequest(data)
    return data
  },
  'Ошибка изменения данных профиля'
)
