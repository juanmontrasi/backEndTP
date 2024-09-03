import { connection } from "./connection.js"


export class userModel {

  static async getAll() {
    console.log('GetAll')
    const [rows] = await connection.query('SELECT * FROM usuarios;')
    if (rows.length > 0) {
      return rows
    } else {
      return []
    }
  }

  static async getById({ id }) {
    const [users] = await connection.query(
      `SELECT *
        FROM usuarios WHERE id_usuarios = ?;`,
      [id]
    )

    if (users.length === 0) return null

    return users[0]
  }


  static async create({ input }) {
    const {
      nombre_usuario,
      clave,
      tipo_usuario,
      email,
      telefono,
      nombre,
      apellido,
      direccion
    } = input


    try {

      const [result] = await connection.query(
        `INSERT INTO usuarios (nombre_usuario, clave, tipo_usuario, email, telefono, nombre, apellido, direccion)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?);`,
        [nombre_usuario,
          clave,
          tipo_usuario,
          email,
          telefono,
          nombre,
          apellido,
          direccion]
      )
      const newUserId = result.insertId
      const [users] = await connection.query(
        `SELECT * FROM usuarios WHERE id_usuarios = ?;`,
        [newUserId]
      )

      return users[0]

    } catch (err) {
      throw new Error('Error creating user')
    }
  }

  static async delete({ id }) {
    try {
      const [result] = await connection.query(
        `DELETE FROM usuarios WHERE id_usuarios = ?;`,
        [id]
      )
      return { affectedRows: result.affectedRows }
    } catch (err) {
      return { error: true, message: 'Error deleting user' }
    }
  }

  static async update({ id, input }) {
    try {
      const [result] = await connection.query(
        `UPDATE usuarios set ? WHERE id_usuarios = ?`, [input, id]
      )

      return result

    } catch (error) {
      return { error: true, message: 'Error updating user' }
    }
  }
}








// import { readJSON } from '../utils.js'

// const users = readJSON('./users.json')

// export class userModel {
//   static async findAll() {
//     return users
//   }
// }