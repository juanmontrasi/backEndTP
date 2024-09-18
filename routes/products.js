import { Router } from "express"
import { productsController } from '../controllers/products.js'

export const createproductsRouter = ({ productsModel }) => {
  const productsRouter = Router()

  const productsController = new productsController({ productsModel })

  productsRouter.get('/', productsController.getAllproductss)
  productsRouter.get('/:id', productsController.getproductsById)
  productsRouter.delete('/:id', productsController.deleteproductsById)
  productsRouter.post('/', productsController.createproducts)
  productsRouter.patch('/:id', productsController.modifyproducts)

  return productsRouter
}
