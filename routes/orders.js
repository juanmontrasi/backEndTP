import { Router } from 'express'
import { OrdersController } from '../controllers/orders.js'
import { validateToken } from '../middlewares/token.js'

export const createOrderRouter = ({ orderModel }) => {
  const ordersRouter = Router()

  const ordersController = new OrdersController({ orderModel })

  ordersRouter.post('/', validateToken, ordersController.createOrder)
  ordersRouter.get('/', ordersController.getAll)

  return ordersRouter
}