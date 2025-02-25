import { Router } from 'express'
import { OrdersController } from '../controllers/orders.js'
import { isAdmin, validateToken } from '../middlewares/token.js'

export const createOrderRouter = ({ orderModel }) => {
  const ordersRouter = Router()

  const ordersController = new OrdersController({ orderModel })

  ordersRouter.post('/', validateToken, ordersController.createOrder)
  ordersRouter.get('/', validateToken, isAdmin, ordersController.getAll)
  ordersRouter.delete('/:id', validateToken, isAdmin, ordersController.deleteOrder)
  ordersRouter.patch('/:id', validateToken, isAdmin, ordersController.modifyOrder)
  ordersRouter.get('/quantity', validateToken, isAdmin, ordersController.getOrdersQuantityAndTotal)
  return ordersRouter
}