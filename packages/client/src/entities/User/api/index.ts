// import { TUser } from '../types'
import httpService from '@/shared/api/httpService'
import handleApiError from '@/shared/api/handleApiError'
import { IRegisterFormValues } from '@/shared/types/auth'
// import { message } from 'antd'

export class AuthApi {
  private _baseUrl = '/auth'

  async createAccount(userData: IRegisterFormValues) {
    try {
      const response = await httpService.post(
        this._baseUrl + '/signup',
        userData
      )
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async authenticate(userData: { login: string; password: string }) {
    try {
      const response = await httpService.post(
        this._baseUrl + '/signin',
        userData
      )
      return response.data
    } catch (error) {
      // для теста
      // message.error(error.response.data.reason)

      handleApiError(error)
    }
  }

  async terminateSession() {
    try {
      const response = await httpService.post(this._baseUrl + '/logout')
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async fetchUserData() {
    try {
      const response = await httpService.get(this._baseUrl + '/user')
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }
}

export const authApi = new AuthApi()
