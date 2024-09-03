import mysql from 'mysql2/promise'

const DEFAULT_CONFIG = {
  host: 'localhost',
  user: 'root',
  port: 3306,
  password: 'Imontra+150938', // probar dejandolo en blanco, sino ingresar la contraseña de mysql
  database: 'tp_desarrollo',
}
const connectionString = process.env.DATABASE_URL ?? DEFAULT_CONFIG

export const connection = await mysql.createConnection(connectionString)


