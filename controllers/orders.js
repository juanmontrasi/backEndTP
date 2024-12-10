import { orderProductsModel } from '../models/orders-products.js'
import { productModel } from '../models/products.js'
import { date } from 'zod'
import { userModel } from '../models/users.js'

export class OrdersController {
  constructor({ orderModel }) {
    this.orderModel = orderModel
  }

  createOrder = async (req, res) => {
    const { id_cliente, total } = req.body
    const fechaHoy = new Date()
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
        include: [
          {
            model: orderProductsModel,
            attributes: ['id_producto', 'cantidad', 'subtotal'],
            include: [
              {
                model: productModel,
                attributes: ['nombre_producto', 'precio'],
              },
            ],
          },
          {
            model: userModel, // Suponiendo que tienes este modelo
            attributes: ['nombre', 'email'], // Especifica las columnas necesarias
          },
        ],

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

  deleteOrder = async (req, res) => {
    const {id} = req.params

    try{
      const order = await this.orderModel.destroy({
        where: {
          id_pedidos: id,
        },  
      })
      if(order){
        res.json({ message: 'Pedido eliminado exitosamente' })
      }
    }catch (error) {
      res.status(400).json({ error: 'error eliminando el pedido' })
    }
  }
}