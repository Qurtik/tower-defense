import dotenv from 'dotenv'
import path from 'path'
import { Sequelize, SequelizeOptions } from 'sequelize-typescript'

dotenv.config({ path: path.resolve(__dirname, '../../.env.sample') })
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
  password: POSTGRES_PASSWORD,
  port: Number(POSTGRES_PORT),
  dialect: 'postgres',
}

const sequelize = new Sequelize(sequelizeOptions)

export async function createClientAndConnect() {
  try {
    await sequelize.authenticate()
    await sequelize.sync()
    console.log('Connection has been established successfully.')
  } catch (error) {
    console.error('Unable to connect to the database:', error)
  }
}
