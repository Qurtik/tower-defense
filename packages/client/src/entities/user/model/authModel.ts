import { IRegisterFormValues } from '../../../types/auth'
import { authApi } from './../../../segments/api/auth/authApi'

class AuthModel {
  private _api: typeof authApi

  constructor() {
    this._api = authApi
  }

  async register(userData: IRegisterFormValues) {
    try {
      const response = await this._api.register(userData)
      console.log(response)
    } catch (error) {
      console.warn(error)
      throw new Error('Регистрация не удалась, попробуйте позднее :(')
    }
  }

  async login(userData: { login: string; password: string }) {
    try {
      const response = await this._api.login(userData)
      console.log(response)
    } catch (error) {
      console.warn(error)
      throw new Error('Неудачный вход :(')
    }
  }

  async logout() {
    try {
      await this._api.logout()
    } catch (error) {
      console.warn(error)
    }
  }

  async getUserInfo() {
    try {
      const response = await this._api.getUserInfo()
      return response
    } catch (error) {
      console.warn(error)
    }
  }
}

export const authModel = new AuthModel()
