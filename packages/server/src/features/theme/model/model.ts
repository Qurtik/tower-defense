import {
  AllowNull,
  BelongsTo,
  Column,
  DataType,
  HasMany,
  Index,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'

import { UserModel } from '../../user'

@Table({ tableName: 'themes' })
export class ThemeModel extends Model {
  @PrimaryKey
  @Column(DataType.STRING)
  themeId: string

  @AllowNull(true)
  @Column(DataType.STRING)
  description: string

  @HasMany(() => UserThemeModel, {
    foreignKey: 'themeId',
    onDelete: 'CASCADE',
  })
  userThemes: UserThemeModel[]
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_themes',
})
export class UserThemeModel extends Model {
  @PrimaryKey
  @Unique
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId: number

  @Index
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  themeId: string

  @BelongsTo(() => ThemeModel, 'themeId')
  theme: ThemeModel

  @BelongsTo(() => UserModel, 'userId')
  user: UserModel
}
