import { productModel } from "../models/products.js";
import sequelize from "../models/sequelize.js";
export class OrderProductsController {
  constructor({ orderProductsModel }) {
    this.orderProductsModel = orderProductsModel;
  }

  createOrderProduct = async (req, res) => {
    const { id_pedidos, id_producto, cantidad, subtotal } = req.body
    try {
      const products = await productModel.findAll({
        where: {
          id_productos: id_producto,
        },
      })
      if (!products || products.length === 0) {
        return res.status(404).json({ message: 'Producto no encontrado' })
      }
      const product = products[0]
      if (product.stock < cantidad) {
        return res.status(400).json({ message: 'No hay suficiente stock' })
      }
      const newOrderProductTuple = await this.orderProductsModel.create({
        id_pedidos,
        id_producto,
        cantidad,
        subtotal,
      })
      if (newOrderProductTuple) {
        res.status(201).json(newOrderProductTuple)
      } else {
        res.status(400).json({ message: 'No se pudo crear el pedido' })
      }
    } catch (error) {
      res.status(400).json({ error: 'Error creando el pedido' })
    }
  }

  getProductsQuantity = async (req, res) => {
    try {
      const productsQuantity = await sequelize.query('select p.id_productos, p.nombre_producto, sum(pp.cantidad) as cantidad from productos_pedidos pp inner join productos p on pp.id_producto = p.id_productos group by p.id_productos, p.nombre_producto order by sum(pp.cantidad) desc LIMIT 8;')

      if (productsQuantity.length === 0) {
        return res.status(404).json({ message: 'No hay productos vendidos' })
      }

      res.status(200).json(productsQuantity)
    } catch (error) {
      res.status(400).json({ error: 'Error obteniendo la cantidad de productos' })
    }
  }
}
