import { Router } from 'express'
import { CheckoutController } from '../controllers/checkout.js'
import { validateToken } from '../middlewares/token.js'

export const createCheckoutRouter = ({ orderModel}) => {
  const checkoutRouter = Router()

  const checkoutController = new CheckoutController({
    orderModel
  })

  checkoutRouter.post('/', validateToken, checkoutController.proceedCheckout)
  return checkoutRouter

}
