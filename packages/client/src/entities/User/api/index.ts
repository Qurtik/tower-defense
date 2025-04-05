import httpService from '@/shared/api/httpService'
import handleApiError from '@/shared/api/handleApiError'
import { IRegisterFormValues } from '@/shared/types/auth'
import { message } from 'antd'
import { IUserProfile } from '../types'

export class AuthApi {
  private _baseUrl = '/auth'
  private _userUrl = '/user'
  private _userProfileUrl = `${this._userUrl}/profile`

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
  async changeAvatarRequest(
    data: FormData
  ): Promise<{ avatar: string; [key: string]: any }> {
    const response = await httpService.put(
      this._userProfileUrl + '/avatar',
      data,
      { headers: { 'Content-Type': 'multipart/form-data' } }
    )

    if ('reason' in response.data) {
      throw new Error(response.data.reason)
    }

    return response.data
  }

  public async getResourse(path: string): Promise<File> {
    const response = await httpService.get(`/resources/${path}`)
    return response.data
  }

  async changeProfileRequest(
    data: IUserProfile
  ): Promise<'OK' | { reason: string }> {
    try {
      const response = await httpService.put(this._userProfileUrl, data)
      return response.data
    } catch (error) {
      handleApiError(error)
    }
  }
}

export const authApi = new AuthApi()
