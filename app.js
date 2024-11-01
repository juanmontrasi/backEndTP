import express, { json } from 'express'
import cors from 'cors'
import { createUserRouter } from './routes/users.js'
import { createLoginRouter } from './routes/login.js'
import { createOrderRouter } from './routes/orders.js'
import { createServiceRouter } from './routes/services.js'
import { createProductRouter } from './routes/products.js'
import { createOrderProductsRouter } from './routes/orders-products.js'
import { createServicesClientsRouter } from './routes/services-clients.js'


export const createApp = ({ userModel, orderModel, serviceModel, productModel, servicesClientsModel, orderProductsModel }) => {
  const app = express() // crea la app
  app.use(cors())
  app.use(json()) // pasar por los middlewares
  app.disable('x-powered-by')

  app.use('/users', createUserRouter({ userModel }))
  app.use('/login', createLoginRouter({ userModel }))
  app.use('/orders', createOrderRouter({ orderModel }))
  app.use('/services', createServiceRouter({ serviceModel }))
  app.use('/products', createProductRouter({ productModel }))
  app.use('/orders/products', createOrderProductsRouter({ orderProductsModel }))
  app.use('/services-clients', createServicesClientsRouter({ servicesClientsModel }))


  const PORT = process.env.PORT ?? 1234
  app.listen(PORT, () => {
    console.log(`server listening on port http://localhost:${PORT}`)
  }) // el servidor se pone a esperar requests http
}
