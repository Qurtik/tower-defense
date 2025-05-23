import {
  AllowNull,
  AutoIncrement,
  BelongsTo,
  Column,
  DataType,
  ForeignKey,
  HasMany,
  Model,
  PrimaryKey,
  Table,
  Unique,
} from 'sequelize-typescript'

import { UserModel } from '../../user'

@Table({ tableName: 'themes' })
export class ThemeModel extends Model {
  @AllowNull(false)
  @Unique
  @Column(DataType.STRING)
  theme!: string

  @AllowNull(false)
  @Column(DataType.STRING)
  description!: string
}

@Table({
  timestamps: false,
  paranoid: true,
  tableName: 'user_themes',
})
export class UserTheme extends Model<UserTheme> {
  @ForeignKey(() => ThemeModel)
  @AllowNull(false)
  @Column(DataType.INTEGER)
  themeId!: string

  @Column(DataType.STRING)
  device!: string

  @ForeignKey(() => UserModel)
  @AllowNull(false)
  @Column({
    type: DataType.INTEGER,
    field: 'owner_id',
  })
  ownerId!: string
}
