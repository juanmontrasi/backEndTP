import { validatePartialUser, validateUser } from "../schemas/users.js"
import { generateToken } from '../middlewares/token.js'

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  getAllUsers = async (req, res) => {
    const users = await this.userModel.findAll()
    if (users.length > 0) {
      res.json(users)
    } else {
      res.status(404).send({ message: 'No hay usuarios disponibles' })
    }
  }

  getUserById = async (req, res) => {
    const { id } = req.params 
    const user = await this.userModel.findAll({
      where: {
        id_usuarios: id,
      },
    })
    if (user) return res.json(user)
    res.status(404).json({ message: 'Usuario no encontrado' })
  }

  createUser = async (req, res) => {
    if(req.body.tipo_usuario === undefined){
      req.body.tipo_usuario = 2
    }
    const result = validateUser(req.body)
    try {
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) 
      }
      if(result.data.tipo_usuario === 1 || result.data.tipo_usuario === 2){
        const newUser = await this.userModel.create({
          nombre_usuario: result.data.nombre_usuario,
          clave: result.data.clave,
          tipo_usuario: result.data.tipo_usuario,
          email: result.data.email,
          telefono: result.data.telefono,
          nombre: result.data.nombre,
          apellido: result.data.apellido,
          direccion: result.data.direccion,
        })
        res.status(201).json(newUser)
      }else {
        res.status(400).send({ message: 'Error creando el usuario' })
      }
      
    } catch {
      res.status(400).send({ message: 'Error creando el usuario' })
    }

  }

  deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
      const orders = await orderModel.findAll({
        where: {
          id_usuario: id_usuario,
        }
      });
  
      if (orders.length > 0) {
        return res.status(400).json({ message: 'No se puede eliminar el usuario, tiene pedidos asociados' });
      }
      const user = await this.userModel.destroy({
        where: {
          id_usuarios: id,
        },
      })
      if (user) {
        res.json({ message: 'Usuario eliminado correctamente' })
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' })
      }
    } catch {
      res.status(400).send({ message: 'Error al eliminar el usuario' })
    }

  }

  modifyUser = async (req, res) => {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const { id } = req.params
    if(result.data.tipo_usuario === 1 || result.data.tipo_usuario === 2){
      const [updatedUser] = await this.userModel.update(
        {
          nombre_usuario: result.data.nombre_usuario,
          clave: result.data.clave,
          tipo_usuario: result.data.tipo_usuario,
          email: result.data.email,
          telefono: result.data.telefono,
          nombre: result.data.nombre,
          apellido: result.data.apellido,
          direccion: result.data.direccion,
        },
        {
          where: {
            id_usuarios: id,
          },
        }
      )
      if (updatedUser === 0) {
        return res.status(404).json({ message: 'Usuario no encontrado' });
      }
      res.json({ message: 'Usuario modificado correctamente' })
    }
    else {
      res.status(400).send({ message: 'Error modificando el usuario' })
    }
    
  }

  loginUser = async (req, res) => {
    const userName = req.body.nombre_usuario;
    const pass = req.body.clave;
    try {
      const user = await this.userModel.findOne({
        where: {
          nombre_usuario: userName,
          clave: pass,
        },
      });
      if (user) {
        const payload = {
          id_usuarios: user.id_usuarios,
          tipo_usuario: user.tipo_usuario,
          userName: userName,
        };
        const token = generateToken(payload);
        res.json({ token, user });
      } else {
        res.status(404).send({ message: 'Usuario no encontrado' });
      }
    } catch {
      res.status(404).send({ message: 'Error en el LogIn' });
    }

  }
}


