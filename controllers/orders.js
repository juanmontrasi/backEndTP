import { orderProductsModel } from '../models/orders-products.js'
import { productModel } from '../models/products.js'
import { date } from 'zod'
import { userModel } from '../models/users.js'
import { validatePartialOrder } from '../schemas/orders.js'

export class OrdersController {
  constructor({ orderModel }) {
    this.orderModel = orderModel
  }

  createOrder = async (req, res) => {
    const { id_cliente, total } = req.body
    const fechaHoy = new Date()
    const estado = 'En proceso'
    try {
      const newOrder = await this.orderModel.create({
        fecha_pedido: fechaHoy,
        id_cliente,
        total,
        estado
      })
      if (newOrder) {
        res.status(201).json(newOrder);
      } else {
        res.status(400).json({ message: 'No se pudo crear el pedido' })
      }
    } catch (error) {
      res.status(400).json({ error: 'Error creando el pedido' })
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
            model: userModel, 
            attributes: ['nombre', 'email'],
          },
        ],

      })

      if (orders.length > 0) {
        orders.sort((a, b) => {
          if(a.fecha_pedido === b.fecha_pedido) return 0
          if(a.fecha_pedido > b.fecha_pedido) return -1
          return 1
        })
        res.json(orders)
      } else {
        res.status(404).send({ message: 'No hay ordenes' })
      }
    } catch (error) {
      res.status(400).json({ error: 'Error buscando el pedido' })
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
      res.status(400).json({ error: 'Error eliminando el pedido' })
    }
  }

  modifyOrder = async (req, res) => {
    const result =  validatePartialOrder(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }

    const { id } = req.params
    const estado = result.data.estado === 'En proceso' ? 'Entregado' : 'En proceso' 
    try {

      const [updatedOrder] = await this.orderModel.update(
        {
          fecha_pedido: result.data.fecha_pedido,
          total: result.data.total,
          id_cliente: result.data.id_cliente,
          estado: estado,
        },
        {
          where: {
            id_pedidos: id,
          },
        }
      )
      if (updatedOrder) {
        res.json({ message: 'Pedido modificado exitosamente' })
      }
    } catch (error) {
      res.status(400).json({ error: 'error modificando el pedido' })
    }
  }
}