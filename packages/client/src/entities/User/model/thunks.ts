import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUser, clearUser, setLoading, setError } from './slice'
import { authApi } from '../api'
import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'

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
