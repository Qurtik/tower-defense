import { TopicModel } from '../../topic'
import { CommentModel } from '../../comment'
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'

@Table({ tableName: 'users' })
export class UserModel extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  first_name!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  second_name!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  display_name!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  phone!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  login!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  avatar!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  email!: string
}
