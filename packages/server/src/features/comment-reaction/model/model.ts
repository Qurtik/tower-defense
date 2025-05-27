import {
  Table,
  Column,
  Model,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript'
import { UserModel } from '../../user'

@Table({ tableName: 'commentsReaction' })
export class CommentReactionModel extends Model {
  //   @ForeignKey(() => CommentModel)
  @Column({
    type: DataType.INTEGER,
    //  allowNull: false,
    allowNull: true,
  })
  idComment!: number

  @ForeignKey(() => UserModel)
  @Column({
    type: DataType.INTEGER,
    //  allowNull: false,
    allowNull: true,
  })
  authorId!: number

  @Column({
    type: DataType.TEXT,
    allowNull: false,
  })
  emoji!: string

  //   @BelongsTo(() => CommentModel)
  //   comment!: CommentModel

  @BelongsTo(() => UserModel)
  user!: UserModel
}
