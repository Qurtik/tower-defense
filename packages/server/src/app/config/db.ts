import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ThemeModel, UserThemeModel } from '../../features/theme'

import { CommentModel } from '../../features/comment'
import { CommentReactionModel } from '../../features/comment-reaction'
import { TopicModel } from '../../features/topic'
import { UserModel } from '../../features/user'
import dotenv from 'dotenv'
import path from 'path'

dotenv.config({ path: path.resolve(__dirname, '../../../../../.env.sample') })
const {
  POSTGRES_USER,
  POSTGRES_PASSWORD,
  POSTGRES_DB,
  POSTGRES_PORT,
  SERVER_HOST,
} = process.env

const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER,
  host: SERVER_HOST,
  database: POSTGRES_DB,
  password: String(POSTGRES_PASSWORD),
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
  models: [
    TopicModel,
    CommentModel,
    UserModel,
    ThemeModel,
    UserThemeModel,
    CommentReactionModel,
  ],
}

const sequelize = new Sequelize(sequelizeOptions)

export async function createClientAndConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync({ alter: true })
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
