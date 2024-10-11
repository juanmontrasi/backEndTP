import { Router } from 'express';
import { OrderProductsController } from '../controllers/orders-products.js';

export const createOrderProductsRouter = ({ orderProductsModel }) => {
  const orderProductsRouter = Router();

  const orderProductsController = new OrderProductsController({
    orderProductsModel,
  });

  orderProductsRouter.post('/', orderProductsController.createOrderProduct);
  return orderProductsRouter;
};
