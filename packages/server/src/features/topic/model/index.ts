import { Comment } from '../../comment/model'
import { Table, Column, Model, DataType, HasMany } from 'sequelize-typescript'

@Table({ tableName: 'topics' })
export class Topic extends Model {
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

  @HasMany(() => Comment, {
    foreignKey: 'topicId',
    onDelete: 'CASCADE',
  })
  comments!: Comment[]
}
