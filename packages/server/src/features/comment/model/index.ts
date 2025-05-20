import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { Topic } from '../../topic/model'

@Table({ tableName: 'comments' })
export class Comment extends Model {
  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  content!: string

  @ForeignKey(() => Topic)
  @Column({
    type: DataType.INTEGER,
    allowNull: false,
  })
  topicId!: number

  @BelongsTo(() => Topic)
  topic!: Topic
}
