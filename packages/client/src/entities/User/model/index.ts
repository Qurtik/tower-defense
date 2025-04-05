import { authApi } from '../api'
import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'
import { IRegisterDataResponse, IUserData } from '../types'

class UserModel {
  async register(userData: IRegisterFormValues) {
    await authApi.createAccount(userData)
    //  Тут можем показать сообщение об успешной авторизации
  }

  async login(userData: { login: string; password: string }) {
    await authApi.authenticate(userData)
  }

  async logout() {
    await authApi.terminateSession()
  }

  async getUserInfo() {
    // TODO: Изменить хранение данные по пользователю в стор
    return await authApi.fetchUserData()
  }

  async changePassword(data: { oldPassword: string; newPassword: string }) {
    const response = await authApi.changePasswordRequest(data)
    console.log('changePassword', response)
    return response
  }

  async changeAvatar(data: File) {
    const formData = new FormData()
    formData.append('avatar', data)
    await authApi.changeAvatarRequest(formData)
  }

  public async getAvatar(path: string) {
    const response = await authApi.getResourse(path)
    return response
  }

  public async userChangeProfile(data: IUserData): Promise<void> {
    await authApi.changeProfileRequest(data)
  }
}

class AuthModel {
  private _api: typeof authApi

  constructor() {
    this._api = authApi
  }

  async register(
    userData: IRegisterFormValues
  ): Promise<IRegisterDataResponse> {
    try {
      const response = await this._api.createAccount(userData)
      await this.getUserInfo()
      //  Тут можем показать сообщение об успешной авторизации
      return response
    } catch (error) {
      console.warn(error)
      throw new Error('Регистрация не удалась, попробуйте позднее :(')
    }
  }

  async login(userData: LoginFormValues) {
    try {
      await this._api.authenticate(userData)
      await this.getUserInfo()
    } catch (error) {
      console.warn(error)
      throw new Error('Неудачный вход :(')
    }
  }

  async logout() {
    try {
      await this._api.terminateSession()
      this._resetAuth()
    } catch (error) {
      console.warn(error)
    }
  }

  async getUserInfo(): Promise<IUserData> {
    // TODO: Изменить хранение данные по пользователю в стор
    try {
      const response = await this._api.fetchUserData()
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
export const useUserModel = new UserModel()
