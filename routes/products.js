import { Router } from "express"
import { ProductController } from '../controllers/products.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })
  productRouter.get('/search', productController.getProductByName)
  productRouter.get('/', productController.getAllProducts)
  productRouter.get('/:id', productController.getProductById)
  productRouter.delete('/:id', productController.deleteProductById)
  productRouter.post('/', productController.createProduct)
  productRouter.patch('/:id', productController.modifyProduct)


  return productRouter
}
