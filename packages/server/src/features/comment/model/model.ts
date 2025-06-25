import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { TopicModel } from '../../topic'
import { UserModel } from '../../user'

@Table({ tableName: 'comments' })
export class CommentModel extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @ForeignKey(() => TopicModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId!: number

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  userId!: number

  @BelongsTo(() => TopicModel)
  topic!: TopicModel

  @BelongsTo(() => UserModel)
  user!: UserModel
}
