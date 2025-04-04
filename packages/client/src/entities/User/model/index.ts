import { authApi } from '../api'
import { IRegisterFormValues } from '@/shared/types/auth'

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
}

export const useUserStore = new User()
