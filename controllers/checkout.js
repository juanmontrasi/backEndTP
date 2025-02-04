import { EmailService } from '../services/email.js'
import { OrdersController } from './orders.js'

import dotenv from 'dotenv';
dotenv.config();


export class CheckoutController {
    constructor({ orderModel }) {
        this.orderModel = orderModel
        this.orderController = new OrdersController({ orderModel });
        this.emailService = new EmailService();
    }

    proceedCheckout = async (req, res) => {
        const { id_pedidos } = req.body;
        try {
            const orders = await this.orderController.getOrderById(id_pedidos);

            if (!orders || orders.length === 0) {
                return res.status(404).json({ error: 'Pedido no encontrado' });
            }

            const order = orders[0];
            const user = order.Usuario.dataValues;
            const productosPedidos = order.dataValues.productos_pedidos;
            const items = this.mapItems(productosPedidos);

            if (this.emailService.sendReceipt(user, order, items)) {
                res.status(200).json({ message: 'Recibo enviado correctamente.' });
            } else {
                res.status(500).json({ error: 'Ocurrió un error al enviar el recibo.' });
            }

        } catch (error) {
            res.status(500).json({ error: 'Ocurrió un error al enviar el recibo.' });
        }
    };

    mapItems = (productosPedidos) => {
        const items = productosPedidos.map((productoPedido) => {
            const producto = productoPedido.Producto ? productoPedido.Producto.dataValues : null;

            if (producto) {
                return {
                    nombre_producto: producto.nombre_producto,
                    precio: producto.precio,
                    cantidad: productoPedido.dataValues.cantidad,
                    subtotal: productoPedido.dataValues.subtotal
                };
            }

            return null;
        }).filter(producto => producto !== null);
        return items
    }


}