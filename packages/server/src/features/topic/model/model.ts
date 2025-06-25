import { CommentModel } from '../../comment'
import {
  Table,
  Column,
  Model,
  DataType,
  HasMany,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from '../../user'
@Table({ tableName: 'topics' })
export class TopicModel extends Model {
  @Column({
    type: DataType.STRING,
    allowNull: false,
  })
  title!: string

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @HasMany(() => CommentModel, {
    foreignKey: 'topicId',
    onDelete: 'CASCADE',
  })
  comments!: CommentModel[]

  @BelongsTo(() => UserModel)
  user!: UserModel
}
