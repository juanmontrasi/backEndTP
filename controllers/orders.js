import { orderProductsModel } from '../models/orders-products.js'
import { productModel } from '../models/products.js'
import { date, datetimeRegex } from 'zod'
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
    const estado_pago = 'No pago'
    if (total === 0) {
      return res.status(400).json({ error: 'El total no puede ser 0' })
    }
    try {
      const newOrder = await this.orderModel.create({
        fecha_pedido: fechaHoy,
        id_cliente,
        total,
        estado,
        estado_pago
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

  getOrderById = async (id_pedidos) => {
    try {
      const orders = await this.orderModel.findAll({
        where: {
          id_pedidos: id_pedidos,
        },
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
            attributes: ['nombre', 'apellido', 'email'],
          },
        ],
      })
      return orders
    }
    catch (error) {
      console.log(error)
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
          if (a.fecha_pedido === b.fecha_pedido) return 0
          if (a.fecha_pedido > b.fecha_pedido) return -1
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
    const { id } = req.params

    try {
      const order = await this.orderModel.destroy({
        where: {
          id_pedidos: id,
        },
      })
      if (order) {
        res.json({ message: 'Pedido eliminado exitosamente' })
      }
    } catch (error) {
      res.status(400).json({ error: 'Error eliminando el pedido' })
    }
  }

  modifyOrder = async (req, res) => {
    const result = validatePartialOrder(req.body)
    if (!result.success) {
      return res.status(400).json({ error: JSON.parse(result.error.message) })
    }
    if (req.body.estado_pago !== 'No pago' && req.body.estado_pago !== 'Pagado') {
      return res.status(400).json({ error: 'El estado de pago debe ser Pagado o No pago' })
    }
    if (req.body.estado !== 'En proceso' && req.body.estado !== 'Entregado') {
      return res.status(400).json({ error: 'El estado debe ser En proceso o Entregado' })
    }
    const { id } = req.params
    const estado = req.body.estado
    const estado_pago = req.body.estado_pago
    const fechaPedido = new Date(this.convertToUTC(result.data.fecha_pedido));
    try {

      const [updatedOrder] = await this.orderModel.update(
        {
          fecha_pedido: fechaPedido,
          total: result.data.total,
          id_cliente: result.data.id_cliente,
          estado: estado,
          estado_pago: estado_pago
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

  convertToUTC = (date) => {
    const fechaPedidoParts = date.split(', ')
    const [day, month, year] = fechaPedidoParts[0].split('/')
    const time = fechaPedidoParts[1]
    const formattedFechaPedido = `${year}-${month.padStart(2, '0')}-${day.padStart(2, '0')}T${time}`

    return formattedFechaPedido
  }
}