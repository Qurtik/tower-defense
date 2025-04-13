import { createAsyncThunk } from '@reduxjs/toolkit'
import {
  setUser,
  clearUser,
  setLoading,
  setError,
  setPathAvatar,
} from './slice'
import { authApi } from '../api'
import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'
import { IUserData } from '../types'

export const register = createAsyncThunk(
  'auth/register',
  async (userData: IRegisterFormValues, { dispatch }) => {
    try {
      const response = await authApi.createAccount(userData)
      await dispatch(getUserInfo())
      return response
    } catch (error) {
      dispatch(setError('Регистрация не удалась, попробуйте позднее :('))
      throw error
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (userData: LoginFormValues, { dispatch }) => {
    try {
      await authApi.authenticate(userData)
      await dispatch(getUserInfo())
    } catch (error) {
      dispatch(setError('Неудачный вход :('))
      throw error
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      await authApi.terminateSession()
      dispatch(clearUser())
    } catch (error) {
      dispatch(setError('Ошибка при выходе'))
    }
  }
)

export const getUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { dispatch }) => {
    try {
      console.log('getUserInfo')
      console.trace()
      dispatch(setLoading(true))
      const userData = await authApi.fetchUserData()
      dispatch(setUser(userData))
      dispatch(setPathAvatar(userData))
      return userData
    } catch (error) {
      dispatch(clearUser())
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const checkAuth = createAsyncThunk(
  'checkAuth',
  async (_, { dispatch }) => {
    try {
      await dispatch(getUserInfo()).unwrap()
      return true
    } catch (error) {
      return false
    }
  }
)

export const getResource = createAsyncThunk(
  '/resources/{path}',
  async (path: string) => {
    await authApi.getResource(path)
    return `https://ya-praktikum.tech/api/v2/resources/${path}`
  }
)

export const changePassword = createAsyncThunk(
  'user/changePassword',
  async (data: { oldPassword: string; newPassword: string }, { dispatch }) => {
    try {
      return await authApi.changePasswordRequest(data)
    } catch (err) {
      dispatch(setError('Ошибка изменения пароля'))
      throw err
    }
  }
)

export const changeAvatar = createAsyncThunk(
  'user/changeAvatar',
  async (file: File, { dispatch }) => {
    try {
      const formData = new FormData()
      formData.append('avatar', file)
      const path = await authApi.changeAvatarRequest(formData)
      dispatch(setPathAvatar(path))
      return path
    } catch (err) {
      dispatch(setError('Аватар не загружен'))
      throw err
    }
  }
)

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (data: IUserData, { dispatch }): Promise<void> => {
    try {
      await authApi.changeProfileRequest(data)
      dispatch(setUser(data))
    } catch (err) {
      dispatch(setError('Ошибка изменения данных профиля'))
      throw err
    }
  }
)
