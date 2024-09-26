import { Sequelize } from 'sequelize'
import 'dotenv/config'

const PASSWORD = process.env.PASSWORD  // saca la contraseña de TU bd desde el archivo de entorno

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

export default sequelize;