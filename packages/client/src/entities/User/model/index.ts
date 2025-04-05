import { authApi } from '../api'
import { IRegisterFormValues } from '@/shared/types/auth'
import { IUserProfile } from '../types'

class User {
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

  public async userChangeProfile(data: IUserProfile): Promise<void> {
    await authApi.changeProfileRequest(data)
  }
}

export const useUserStore = new User()
