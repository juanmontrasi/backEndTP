import { validatePartialUser, validateUser } from "../schemas/users.js"

export class UserController {
  constructor({ userModel }) {
    this.userModel = userModel
  }

  getAllUsers = async (req, res) => {
    const users = await this.userModel.getAll()
    if (users.length > 0) {
      res.json(users)
    } else {
      res.status(404).send({ message: 'no users available' })
    }
  }

  getUserById = async (req, res) => {
    const { id } = req.params
    const user = await this.userModel.getById({ id })
    if (user) return res.json(user)
    res.status(404).json({ message: 'User not found' })
  }

  createUser = async (req, res) => {
    console.log(req.body)
    const result = validateUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    const newUser = await this.userModel.create({ input: result.data })

    res.status(201).json(newUser)
  }

  deleteUserById = async (req, res) => {
    const { id } = req.params
    const result = await this.userModel.delete({ id })

    if (result.error) {
      return res.status(500).json({ message: result.message })
    }

    if (result.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' })
    }

    return res.status(200).json({ message: 'User deleted successfully' })
  }

  modifyUser = async (req, res) => {
    const result = validatePartialUser(req.body)

    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params

    const updatedUser = await this.userModel.update({ id, input: result.data })

    if (updatedUser.error) {
      return res.status(500).json({ message: updatedUser.message })
    }

    if (updatedUser.affectedRows === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  }


}

