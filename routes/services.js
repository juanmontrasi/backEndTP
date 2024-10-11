import { Router } from "express"
import { ServiceController } from '../controllers/services.js'

export const createServiceRouter = ({ serviceModel }) => {
  const serviceRouter = Router() // crea un objeto router
 
  const serviceController = new ServiceController({ serviceModel }) // instancia un controlador
  // dependiendo el tipo de request y los parametros de la request, asigna el metodo del controlador que maneja
  serviceRouter.get('/', serviceController.getAllServices)               // entonces si es un get sin nada viene aca
  serviceRouter.get('/:id', serviceController.getServiceById)            // si es un get con id aca
  serviceRouter.delete('/:id', serviceController.deleteServiceById)      // si es un delete viene aca (si o si va a tener id)
  serviceRouter.post('/', serviceController.createService)               // si es un post viene aca
  serviceRouter.patch('/:id', serviceController.modifyService)           // si es un patch viene aca (si o si va a tener id)
                                                                // no va a entrar al resto, solo al que le corresponde
  return serviceRouter
}

// get para pedir informacion, post para crear una nueva instacia, patch para editar una instancia existente
// delete para eliminar una instancia existente
