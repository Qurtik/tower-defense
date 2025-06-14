import { Sequelize, SequelizeOptions } from 'sequelize-typescript'
import { ThemeModel, UserThemeModel } from '../../features/theme'

import { CommentModel } from '../../features/comment'
import { TopicModel } from '../../features/topic'
import { UserModel } from '../../features/user'
import dotenv from 'dotenv'
import path from 'path'

const isDev = () => process.env.NODE_ENV === 'development'

dotenv.config({ path: path.resolve(__dirname, '../../.env.sample') })
const { POSTGRES_USER, POSTGRES_PASSWORD, POSTGRES_DB, POSTGRES_PORT } =
  process.env

const sequelizeOptions: SequelizeOptions = {
  username: POSTGRES_USER,
  host: 'postgres',
  database: POSTGRES_DB,
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
  models: [TopicModel, CommentModel, UserModel, ThemeModel, UserThemeModel],
}

const sequelize = new Sequelize(sequelizeOptions)

export async function createClientAndConnect() {
  try {
    await sequelize.authenticate()
    if (isDev()) {
      await sequelize.sync({ alter: true })
    } else {
      await sequelize.sync()
    }
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
