import { Router } from "express"
import { ProductController } from '../controllers/products.js'
import { isAdmin, validateToken } from '../middlewares/token.js'


export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()

  const productController = new ProductController({ productModel })
  productRouter.get('/search', productController.getProductByName)
  productRouter.get('/', productController.getAllProducts)
  productRouter.get('/:id', productController.getProductById)
  productRouter.delete('/:id', validateToken, isAdmin, productController.deleteProductById)
  productRouter.post('/', validateToken, isAdmin, productController.createProduct)
  productRouter.patch('/:id', validateToken, productController.modifyProduct)


  return productRouter
}
