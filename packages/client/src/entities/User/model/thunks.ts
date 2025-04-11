import { createAsyncThunk } from '@reduxjs/toolkit'
import { setUser, clearUser, setLoading, setError } from './slice'
import { authApi } from '../api'
import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'

export const register = createAsyncThunk(
  'auth/register',
  async (userData: IRegisterFormValues, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      const response = await authApi.createAccount(userData)
      await dispatch(fetchUserInfo())
      return response
    } catch (error) {
      dispatch(setError('Регистрация не удалась, попробуйте позднее :('))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const login = createAsyncThunk(
  'auth/login',
  async (userData: LoginFormValues, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      await authApi.authenticate(userData)
      await dispatch(fetchUserInfo())
    } catch (error) {
      dispatch(setError('Неудачный вход :('))
      throw error
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const logout = createAsyncThunk(
  'auth/logout',
  async (_, { dispatch }) => {
    try {
      dispatch(setLoading(true))
      await authApi.terminateSession()
      dispatch(clearUser())
    } catch (error) {
      dispatch(setError('Ошибка при выходе'))
    } finally {
      dispatch(setLoading(false))
    }
  }
)

export const fetchUserInfo = createAsyncThunk(
  'auth/fetchUserInfo',
  async (_, { dispatch }) => {
    try {
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
  'auth/checkAuth',
  async (_, { dispatch }) => {
    try {
      await dispatch(fetchUserInfo()).unwrap()
      return true
    } catch (error) {
      return false
    }
  }
)
