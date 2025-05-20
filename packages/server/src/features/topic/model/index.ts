import {
  Table,
  Column,
  Model,
  DataType /* HasMany */,
} from 'sequelize-typescript'
//import { Comment } from '../comment/model';

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

  /*   @HasMany(() => Comment)
  comments!: Comment[]; */
}
