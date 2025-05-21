import { CommentModel } from '../../comment'
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'

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

  @HasMany(() => CommentModel, {
    foreignKey: 'topicId',
    onDelete: 'CASCADE',
  })
  comments!: CommentModel[]
}
