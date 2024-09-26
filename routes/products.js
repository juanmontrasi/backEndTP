import { Router } from "express"
import { ProductController } from '../controllers/products.js'

export const createProductRouter = ({ productModel }) => {
  const productRouter = Router()
 
  const productController = new ProductController({ productModel }) // instancia un controlador
  // dependiendo el tipo de request y los parametros de la request, asigna el metodo del controlador que maneja
  productRouter.get('/', productController.getAllProducts)               // entonces si es un get sin nada viene aca
  productRouter.get('/:id', productController.getProductById)            // si es un get con id aca
  productRouter.delete('/:id', productController.deleteProductById)      // si es un delete viene aca (si o si va a tener id)
  productRouter.post('/', productController.createProduct)               // si es un post viene aca
  productRouter.patch('/:id', productController.modifyProduct)           // si es un patch viene aca (si o si va a tener id)
                                                                // no va a entrar al resto, solo al que le corresponde
  return productRouter
}

// get para pedir informacion, post para crear una nueva instacia, patch para editar una instancia existente
// delete para eliminar una instancia existente
