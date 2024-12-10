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
      res.status(404).send({ message: 'no users available' })
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
    res.status(404).json({ message: 'User not found' })
  }

  createUser = async (req, res) => {
    console.log(req.body)
    if(req.body.tipo_usuario === undefined){
      req.body.tipo_usuario = 2
    }
    const result = validateUser(req.body)
    try {
      if (!result.success) {
        return res.status(400).json({ error: JSON.parse(result.error.message) }) 
      }
      if(result.data.tipo_usuario === undefined){
        result.data.tipo_usuario = 2
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
        res.status(400).send({ message: 'error creating user' })
      }
      
    } catch {
      res.status(400).send({ message: 'error creating user' })
    }

  }

  deleteUserById = async (req, res) => {
    const { id } = req.params
    try {
      const user = await this.userModel.destroy({
        where: {
          id_usuarios: id,
        },
      })
      if (user) {
        res.json({ message: 'user deleted succesfully' })
      } else {
        res.status(404).send({ message: 'user not found' })
      }
    } catch {
      res.status(400).send({ message: 'error deleting user' })
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
        return res.status(404).json({ message: 'user not found' });
      }
      res.json({ message: 'user updated succesfully' })
    }
    else {
      res.status(400).send({ message: 'error modifying user' })
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
        res.status(404).send({ message: 'user not found' });
      }
    } catch {
      res.status(404).send({ message: 'error' });
    }

  }
}


