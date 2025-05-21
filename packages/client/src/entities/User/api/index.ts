import httpService from '@/shared/api/httpService'
import handleApiError from '@/shared/api/handleApiError'
import {
  IRegisterFormValues,
  IServiceId,
  LoginFormValues,
} from '@/shared/types/auth'
import { message } from 'antd'
import { IRegisterDataResponse, IUserData } from '../types'
import { AxiosResponse } from 'axios'

export class AuthApi {
  private _baseUrl = 'api/v2/auth'
  private _userUrl = '/user'
  private _userProfileUrl = `api/v2${this._userUrl}/profile`
  private _OAuthUrl = '/oauth/yandex'

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
      await this.updateUserDataFromServer(response)
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async changePasswordRequest(data: {
    oldPassword: string
    newPassword: string
  }) {
    try {
      const response = await httpService.put(this._userUrl + '/password', {
        ...data,
      })
      return response.data
    } catch (error: any) {
      if (error.response.data.reason) {
        message.error(`${error.response.data.reason}`)
      }

      handleApiError(error)
    }
  }

  //   TODO: сделать более универсальное названеи
  async changeAvatarRequest(data: FormData): Promise<IUserData> {
    const response = await httpService.put(
      this._userProfileUrl + '/avatar',
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    if ('reason' in response.data) {
      throw new Error(response.data.reason)
    }
    await this.updateUserDataFromServer(response)
    return response.data
  }

  public async getResource(path: string): Promise<File> {
    const response = await httpService.get(`api/v2/resources/${path}`)
    return response.data
  }

  async changeProfileRequest(data: IUserData): Promise<IUserData> {
    try {
      const response = await httpService.put<IUserData>(
        this._userProfileUrl,
        data
      )
      await this.updateUserDataFromServer(response)
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async getOAuthAppId(): Promise<IServiceId> {
    try {
      const response = await httpService.get(this._OAuthUrl + '/service-id', {
        params: { redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI },
      })
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }

  async loginViaYandex(code: string): Promise<void> {
    try {
      await httpService.post(this._OAuthUrl, {
        code,
        redirect_uri: import.meta.env.VITE_OAUTH_REDIRECT_URI,
      })
    } catch (error) {
      handleApiError(error)
    }
  }

  async updateUserDataFromServer(userData: AxiosResponse<IUserData, any>) {
    await httpService.put<IUserData>('/users', userData)
  }
}

export const authApi = new AuthApi()
