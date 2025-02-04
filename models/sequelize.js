import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BDPASSWORD) {
  console.error("ERROR: La variable de entorno BDPASSWORD no está definida.");
  process.exit(1);
}

const PASSWORD = process.env.BDPASSWORD
const USERNAME = process.env.BDUSERNAME
const DATABASENAME = process.env.DBNAME
const DATABASEHOST = process.env.DBHOST
const sequelize = new Sequelize(DATABASENAME, USERNAME, PASSWORD, {
  host: DATABASEHOST,
  dialect: 'mysql',
  port: 3306
})

try {
  await sequelize.authenticate()
  console.log('Connection has been established successfully.')
} catch (error) {
  console.error('Unable to connect to the database:', error)
}

export default sequelize