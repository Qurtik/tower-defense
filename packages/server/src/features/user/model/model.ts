import { Table, Column, Model, DataType } from 'sequelize-typescript'

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
    allowNull: true,
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
    allowNull: true,
  })
  avatar!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  email!: string
}
