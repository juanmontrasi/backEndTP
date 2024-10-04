import { createApp } from './app.js'
import { orderModel } from './models/orders.js'
import { userModel } from './models/users.js'
import { serviceModel } from './models/services.js'
import { productModel } from './models/products.js'
import { servicesClientsModel } from './models/services-clients.js'


createApp({ // punto de entrada de la aplicacion
  userModel: userModel,
  orderModel: orderModel,
  serviceModel: serviceModel,
  productModel: productModel,
  servicesClientsModel: servicesClientsModel,
})
