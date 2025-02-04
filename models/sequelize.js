import { Sequelize } from 'sequelize'
import dotenv from 'dotenv';
dotenv.config();

if (!process.env.BDPASSWORD) {
  console.error("ERROR: La variable de entorno BDPASSWORD no está definida.");
  process.exit(1);
}

const PASSWORD = process.env.BDPASSWORD
const sequelize = new Sequelize('tp_desarrollo_mod', 'root', PASSWORD, {
  host: 'localhost',
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