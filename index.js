import { createApp } from './app.js'
import { orderModel } from './models/orders.js'
import { userModel } from './models/users.js'
import { productModel } from './models/products.js'
import { orderProductsModel } from './models/orders-products.js'


createApp({
  userModel: userModel,
  orderModel: orderModel,
  productModel: productModel,
  orderProductsModel: orderProductsModel,
})
