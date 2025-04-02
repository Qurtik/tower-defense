import { IUserData } from '../../../entities/user/model/types'
import httpService from '../../../shared/httpService/httpService'
import handleApiError from '../../../shared/lib/api/handleApiError'
import { IRegisterFormValues, LoginFormValues } from '../../../types/auth'

class AuthApi {
  private _baseUrl = '/auth'

  async register(userData: IRegisterFormValues) {
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

  async login(userData: LoginFormValues) {
    try {
      const response = await httpService.post(
        this._baseUrl + '/signin',
        userData
      )
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async logout() {
    try {
      const response = await httpService.post(this._baseUrl + '/logout')
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async getUserInfo(): Promise<IUserData> {
    try {
      const response = await httpService.get<IUserData>(this._baseUrl + '/user')
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }
}

export const authApi = new AuthApi()
