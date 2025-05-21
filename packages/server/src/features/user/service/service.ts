import { UserModel } from '../model/model'

export class UserService {
  static async upsertUser(userData: {
    id: string
    first_name: string
    second_name: string
    display_name: string
    phone: string
    login: string
    avatar: string
    email: string
  }) {
    const [user, created] = await UserModel.upsert({
      ...userData,
      updatedAt: new Date(),
    })

    return {
      user,
      wasCreated: created,
    }
  }

  static async getUserById(id: string) {
    return UserModel.findOne({ where: { id } })
  }
}
