import { validatePartialService, validateService } from "../schemas/services.js"

export class ServiceController {            
    constructor({ serviceModel }) {         // recibe un objeto destructurado con una propiedad serviceModel --> al crear una instancia de ServiceController, se espera que se pase un objeto con una propiedad serviceModel.
      this.serviceModel = serviceModel      // dentro del constructor, asigna el valor de serviceModel (que se pasa al constructor) a this.serviceModel, lo que permite que la instancia de ServiceController tenga acceso a ese modelo de servicio.
    }

    getAllServices = async (req, res) /*los parametros req y res van por defecto*/ => { // asincrono SIEMPRE el manejador de requests
        const services = await this.serviceModel.findAll()         // pide todos los servicios al modelo (no conoce ni le importa como los obtiene el modelo)
        if (services.length > 0) {                                  // validaciones del controlador
          res.json(services)                                        // devuelve la coleccion services como json
        } else {
          res.status(404).send({ message: 'No hay servicios disponibles' })      // setea el estado a 404 y envia un mensaje de error
        }
      } // hace un get all de servicios, lo traduce a json o, si no hay servicios, te muestra un error


    getServiceById = async (req, res) => {
        const { id } = req.params                        // desestructura el id del objeto que contiene los parametros de la request
        const service = await this.serviceModel.findAll({   // asi es como sequelizer pide los parametros del where
          where: {
            id_servicios: id,
          },
        })
        if (service) return res.json(service) 
        res.status(404).json({ message: 'Servicio no encontrado' })
      }

    createService = async (req, res) => {
        console.log(req.body) // el parametro body viene por defecto en req, igual que params
        const result = validateService(req.body)
    
        if (!result.success) {          // si la validacion falla -->
          return res.status(400).json({ error: JSON.parse(result.error.message) }) // JSON es un objeto global que trae metodos como parse (convierte string en json) y stringify (convierte json en string)
        }
        const newService = await this.serviceModel.create({
          desc_servicio: result.data.desc_servicio,
          precio: result.data.precio
        })
        res.status(201).json(newService) // siempre se devuelve el objeto creado
      }

    deleteServiceById = async (req, res) => {
      const { id } = req.params
      const service = await this.serviceModel.destroy({
        where: {
          id_servicios: id,
          },
        })
      if (service) {
        res.json({ message: 'Servicio eliminado exitosamente' }) 
      } else {
        res.status(404).send({ message: 'Servicio no encontrado' })
      }
    }
    
      modifyService = async (req, res) => {
        const result = validatePartialService(req.body)
    
        if (!result.success) {
          return res.status(400).json({ error: JSON.parse(result.error.message) })
        }
    
        const { id } = req.params
    
        const [updatedService] = await this.serviceModel.update(
          {
          desc_servicio: result.data.desc_servicio,
          precio: result.data.precio
          },
          {
            where: {
              id_servicios: id,
            },
          }
        )
        if (updatedService === 0) {
          return res.status(404).json({ message: 'Servicio no encontrado' });
        }
        res.json({ message: 'Servicio actualizado exitosamente' }) 
    
      }

}