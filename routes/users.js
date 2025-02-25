import { Router } from "express"
import { UserController } from '../controllers/users.js'
import { isAdmin, validateToken } from "../middlewares/token.js"

export const createUserRouter = ({ userModel }) => {
  const userRouter = Router()

  const userController = new UserController({ userModel })
  userRouter.get('/', validateToken, isAdmin, userController.getAllUsers)
  userRouter.get('/:id', userController.getUserById)
  userRouter.delete('/:id', validateToken, isAdmin, userController.deleteUserById)
  userRouter.post('/', userController.createUser)
  userRouter.patch('/:id', validateToken, userController.modifyUser)
  userRouter.get('/clients/quantity', validateToken, isAdmin, userController.getClientsQuantity)

  return userRouter
}

