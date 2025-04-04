import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'
import { IRegisterDataResponse, IUserData } from '../types/types'
import { authApi } from '../api/authApi'

class AuthModel {
  private _api: typeof authApi

  constructor() {
    this._api = authApi
  }

  async register(
    userData: IRegisterFormValues
  ): Promise<IRegisterDataResponse> {
    try {
      const response = await this._api.register(userData)
      await this.getUserInfo()
      return response
    } catch (error) {
      console.warn(error)
      throw new Error('Регистрация не удалась, попробуйте позднее :(')
    }
  }

  async login(userData: LoginFormValues) {
    try {
      await this._api.login(userData)
      await this.getUserInfo()
    } catch (error) {
      console.warn(error)
      throw new Error('Неудачный вход :(')
    }
  }

  async logout() {
    try {
      await this._api.logout()
      this._resetAuth()
    } catch (error) {
      console.warn(error)
    }
  }

  async getUserInfo(): Promise<IUserData> {
    try {
      const response = await this._api.getUserInfo()
      this._setAuth()
      return response
    } catch (error) {
      this._resetAuth()
      throw new Error()
    }
  }

  async isAuthenticated(): Promise<boolean> {
    let authStatus = window.sessionStorage.getItem('user-auth')

    if (authStatus === null) {
      try {
        await this.getUserInfo()

        authStatus = window.sessionStorage.getItem('user-auth')

        if (authStatus === null) {
          return false
        }
      } catch (error) {
        console.error('Auth check failed:', error)
        return false
      }
    }

    return authStatus === 'true'
  }

  private _setAuth() {
    window.sessionStorage.setItem('user-auth', 'true')
  }

  private _resetAuth() {
    window.sessionStorage.setItem('user-auth', 'false')
  }
}

export const authModel = new AuthModel()
