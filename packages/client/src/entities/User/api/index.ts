import { IRegisterDataResponse, IUserData } from '../types'
import httpService from '../../../shared/api/httpService'
import handleApiError from '../../../shared/api/handleApiError'
import { IRegisterFormValues, LoginFormValues } from '@/shared/types/auth'

class AuthApi {
  private _baseUrl = '/auth'

  async createAccount(
    userData: IRegisterFormValues
  ): Promise<IRegisterDataResponse> {
    try {
      const response = await httpService.post<IRegisterDataResponse>(
        this._baseUrl + '/signup',
        userData
      )
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async authenticate(userData: LoginFormValues) {
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

  async fetchUserData(): Promise<IUserData> {
    try {
      const response = await httpService.get<IUserData>(this._baseUrl + '/user')
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }
}

export const authApi = new AuthApi()
