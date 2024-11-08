import { productModel } from "../models/products.js";
export class OrderProductsController {
    constructor({ orderProductsModel }) {
      this.orderProductsModel = orderProductsModel;
    }
  
    createOrderProduct = async (req, res) => {
      const { id_pedidos, id_producto, cantidad } = req.body;
       const product = productModel.findAll({ 
        where: {
          id_productos: id_producto,
        }
      })
      const subtotal = product.precio * cantidad 
      // try {
        const newOrderProductTuple = await this.orderProductsModel.create({
          id_pedidos,
          id_producto,
          cantidad,
          subtotal,
        });
        if (newOrderProductTuple) {
          res.status(201).json(newOrderProductTuple);
        } else {
          res.status(400).json({ message: 'No se pudo crear la tupla' });
        }
      } /* catch (error) {
        res.status(400).json({ error: 'Error creando el pedido' });
      }*/
    // };
  }
  