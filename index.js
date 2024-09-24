import { createApp } from './app.js'
import { orderModel } from './models/orders.js'
import { userModel } from './models/users.js'

createApp({
  userModel: userModel,
  orderModel: orderModel,
})
