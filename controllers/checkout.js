import { OrdersController } from './orders.js';
import { MercadoPagoConfig, Payment, Preference } from "mercadopago";
import dotenv from 'dotenv'
import { orderModel } from '../models/orders.js';
import { orderProductsModel } from '../models/orders-products.js';
dotenv.config()

const client = new MercadoPagoConfig({
    accessToken: process.env.ACCESS_TOKEN,
    options: {
        timeout: 5000,
    },
});
const payment = new Payment(client);

export class CheckoutController {
    constructor({ orderModel }) {
        this.orderModel = orderModel;
        this.orderController = new OrdersController({ orderModel });
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
            const productos = order.dataValues.productos_pedidos;
            const productosPedidos = this.mapItems(productos);

            const items = productosPedidos.map((producto) => {
                return {
                    title: producto.nombre_producto,
                    quantity: producto.cantidad,
                    currency_id: "ARS",
                    unit_price: producto.subtotal,
                };
            });


            const payer = {
                name: user.nombre,
                surname: user.apellido,
                email: user.email,
            }

            let result;
            const preference = new Preference(client);
            await preference
                .create({
                    body: {
                        items: items,
                        payer,
                        redirect_urls: {
                            success: "http://localhost:4200/checkout/result?status=success",
                            failure: "http://localhost:4200/checkout/result?status=failure",
                            pending: "http://localhost:4200/checkout/result?status=pending",
                        },
                        back_urls: {
                            success: "http://localhost:7272/checkout/success",
                            failure: "http://localhost:7272/checkout/failure",
                            pending: "http://localhost:7272/checkout/pending",
                        },
                        auto_return: "approved",
                        external_reference: id_pedidos,
                    },
                    requestOptions: {
                        timeout: 5000,
                    },
                })
                .then((x) => {
                    result = x;
                })
                .catch((err) => {
                    console.log("Error al crear el pago: ", err);
                });
            res.status(200).json({ url: result?.sandbox_init_point });
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
        return items;
    }
}

export const success = async (req, res) => {
    try {
        const data = req.query;
        await orderModel.update(
            { estado_pago: "Aprobado" },
            {
                where: {
                    id_pedidos: data.external_reference,
                },
            }
        );
        res.redirect("http://localhost:4200/checkout/result?status=success");

    } catch (error) {
        console.log("Error en el pago: ", error);
    }
};

export const failure = async (req, res) => {
    try {
        const data = req.query;
        await orderModel.destroy(
            {
                where: {
                    id_pedidos: data.external_reference,
                },
            }
        );
        await orderProductsModel.destroy(
            {
                where: {
                    id_pedidos: data.external_reference,
                },
            }
        );

        res.status(401).redirect("http://localhost:4200/checkout/result?status=failure");
    } catch (error) {
        console.log("Error en el pago: ", error);
    }
};

export const pending = async (req, res) => {
    try {
        const data = req.query;
        await orderModel.update(
            { estado_pago: "Pendiente" },
            {
                where: {
                    id_pedidos: data.external_reference,
                },
            }
        );
        res.status(401).redirect("http://localhost:4200/checkout/result?status=pending");
    } catch (error) {
        console.log("Error en el pago: ", error);
    }
};