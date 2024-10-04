// import { orderProduct } from '../models/orders-products.js'
import { date } from 'zod'
// import { userModel } from '../models/users.js'

export class OrdersController {
  constructor({ orderModel }) {
    this.orderModel = orderModel
  }

  createOrder = async (req, res) => {
    const { id_cliente, total } = req.body
    const fechaHoy = new date()
    try {
      const newOrder = await this.orderModel.create({
        fecha_pedido: fechaHoy,
        id_cliente,
        total,
      })
      if (newOrder) {
        res.status(201).json(newOrder);
      } else {
        res.status(400).json({ message: 'No se pudo crear el pedido' })
      }
    } catch (error) {
      console.error(error)
      res.status(400).json({ error: 'error creando el pedido' })
    }
  }
  getAll = async (req, res) => {
    try {
      const orders = await this.orderModel.findAll({
        // include: [
        //   {
        //     model: orderPorduct,
        //     attributes: ['id_producto', 'cantidad'],
        //   },
        //   { model: userModel },
        // ],
        // cuando terminemos el de order-products lo descomentamos
      })

      if (orders.length > 0) {
        res.json(orders)
      } else {
        res.status(404).send({ message: 'No orders available' })
      }
    } catch (error) {
      res.status(400).json({ error: 'error buscando el pedido' })
    }
  };
}