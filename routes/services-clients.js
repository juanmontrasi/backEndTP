import { Router } from "express"
import { ServicesClientsController } from "../controllers/services-clients.js"
// import { validateToken } from "../middlewares/token.js"
// Cuando tenga el front tengo que poner de segundo parametro validateToken

export const createServicesClientsRouter = ({ servicesClientsModel }) => {
  const servicesClientsRouter = Router()
  const servicesClientsController = new ServicesClientsController({ servicesClientsModel })

  servicesClientsRouter.get("/", servicesClientsController.getAll)
  servicesClientsRouter.get("/:id_servicio/:id_usuario/:fecha_servicio", servicesClientsController.getById)
  servicesClientsRouter.post("/", servicesClientsController.create)
  servicesClientsRouter.delete("/:id_servicio/:id_usuario/:fecha_servicio", servicesClientsController.delete)
  servicesClientsRouter.patch("/:id_servicio/:id_usuario/:fecha_servicio", servicesClientsController.update)


  return servicesClientsRouter
}