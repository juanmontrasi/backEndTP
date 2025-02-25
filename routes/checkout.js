import { Router } from 'express'
import { CheckoutController } from '../controllers/checkout.js'
import { validateToken } from '../middlewares/token.js'
import { success, failure, pending } from '../controllers/checkout.js'

export const createCheckoutRouter = ({ orderModel }) => {
  const checkoutRouter = Router()

  const checkoutController = new CheckoutController({
    orderModel
  })

  checkoutRouter.post('/', validateToken, checkoutController.proceedCheckout)
  checkoutRouter.get("/success", success);
  checkoutRouter.get("/failure", failure);
  checkoutRouter.get("/pending", pending);


  return checkoutRouter

}
