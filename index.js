import { createApp } from './app.js'

import { userModel } from './models/users.js';
import { serviceModel } from './models/services.js';
import { productModel } from './models/products.js'

createApp({ // punto de entrada de la aplicacion
  userModel: userModel,
  serviceModel: serviceModel,
  productModel: productModel
})
