import { userModel } from "../models/users.js"
import { serviceModel } from "../models/services.js"
import { validateServiceClient, validatePartialServiceClient } from "../schemas/services-clients.js"


export class ServicesClientsController {

  constructor({ servicesClientsModel }) {
    this.servicesClientsModel = servicesClientsModel;
  }

  getAll = async (req, res) => {

    try {
      const servicesClients = await this.servicesClientsModel.findAll({ include: [{ model: userModel }, { model: serviceModel }] })
      res.json(servicesClients)
    }
    catch (error) {
      res.status(400).json({ error: 'error buscando las instancias' })
    }
  }

  getById = async (req, res) => {
    const id_servicio = req.params.id_servicio
    const id_usuario = req.params.id_usuario
    const fecha_servicio = req.params.fecha_servicio

    try {
      const serviceClient = await this.servicesClientsModel.findAll({
        where: {
          id_servicio: id_servicio,
          id_usuario: id_usuario,
          fecha_servicio: fecha_servicio
        }
      });
      res.json(serviceClient);
    }
    catch (error) {
      res.status(400).json({ error: 'error buscando la instancia' })
    }
  }

  create = async (req, res) => {
    const result = validateServiceClient(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    try {
      const newServiceClient = await this.servicesClientsModel.create({
        id_servicio: result.data.id_servicio,
        id_usuario: result.data.id_usuario,
        fecha_servicio: result.data.fecha_servicio,
        mensaje: result.data.mensaje
      });
      res.status(201).json(newServiceClient);
    }
    catch (error) {
      res.status(400).json({ error: 'error registrando la contratación' })
    }
  }

  delete = async (req, res) => {
    const id_servicio = req.params.id_servicio
    const id_usuario = req.params.id_usuario
    const fecha_servicio = req.params.fecha_servicio

    try {
      const result = await this.servicesClientsModel.destroy({
        where: {
          id_servicio: id_servicio,
          id_usuario: id_usuario,
          fecha_servicio: fecha_servicio
        }
      });
      if (result == 0) {
        return res.status(404).json({ message: "Servicio del cliente no encontrado" });
      }
      res.json({ message: "Servicio del cliente eliminado" });
    }
    catch (error) {
      res.status(400).json({ error: 'error en la eliminación' })
    }
  }

  update = async (req, res) => {
    const result = validatePartialServiceClient(req.body);

    if (!result.success) {
      return res.status(404).json({ error: JSON.parse(result.error.message) });
    }

    const id_servicio = req.params.id_servicio
    const id_usuario = req.params.id_usuario
    const fecha_servicio = req.params.fecha_servicio
    const mensaje = req.body.mensaje

    // try {
    const updatedServCli = await this.servicesClientsModel.update(
      { mensaje: mensaje },
      {
        where: {
          id_servicio: id_servicio,
          id_usuario: id_usuario,
          fecha_servicio: fecha_servicio
        }
      }
    )
    if (updatedServCli == 0) {
      return res.status(404).json({ message: "No se encontró el servicio del cliente" });
    }
    res.json({ message: "Servicio actualizado" });
    // }
    // catch (error) {
    //   res.status(400).json({ error: 'error en la actualización' })
    // }
  }
}