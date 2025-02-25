import { Router } from 'express';
import { OrderProductsController } from '../controllers/orders-products.js';
import { validateToken, isAdmin } from '../middlewares/token.js';

export const createOrderProductsRouter = ({ orderProductsModel }) => {
  const orderProductsRouter = Router();

  const orderProductsController = new OrderProductsController({
    orderProductsModel,
  });

  orderProductsRouter.post('/', validateToken, orderProductsController.createOrderProduct);
  orderProductsRouter.get('/', validateToken, isAdmin, orderProductsController.getProductsQuantity);
  return orderProductsRouter;
};
