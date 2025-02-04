import express, { json } from 'express'
import { corsMiddleware } from './middlewares/cors.js'
import { createUserRouter } from './routes/users.js'
import { createLoginRouter } from './routes/login.js'
import { createOrderRouter } from './routes/orders.js'
import { createProductRouter } from './routes/products.js'
import { createOrderProductsRouter } from './routes/orders-products.js'
import { createCheckoutRouter } from './routes/checkout.js'


export const createApp = ({ userModel, orderModel, productModel, orderProductsModel }) => {
  const app = express() // crea la app
  app.use(corsMiddleware())
  app.use(json()) // pasar por los middlewares
  app.disable('x-powered-by')

  app.use('/users', createUserRouter({ userModel }))
  app.use('/login', createLoginRouter({ userModel }))
  app.use('/orders', createOrderRouter({ orderModel }))
  app.use('/products', createProductRouter({ productModel }))
  app.use('/orders/products', createOrderProductsRouter({ orderProductsModel }))
  app.use('/checkout', createCheckoutRouter({ orderModel}))


  const PORT = 7272
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  }) // el servidor se pone a esperar requests http
}
