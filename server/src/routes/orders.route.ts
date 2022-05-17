import { Router } from 'express';
import OrdersController from '@/controllers/orders.controller';
import { CreateOrderDto } from '@/dtos/orders.dto';
import { Routes } from '@interfaces/routes.interface';
import validationMiddleware from '@middlewares/validation.middleware';
import authMiddlewareAdmin from '@/middlewares/auth.middleware.admin';

class OrdersRoute implements Routes {
  public path = '/orders';
  public router = Router();
  public ordersController = new OrdersController();

  constructor() {
    this.initializeRoutes();
  }

  private initializeRoutes() {
    this.router.get(`${this.path}`, this.ordersController.getOrders);
    this.router.get(`${this.path}/:id`, this.ordersController.getOrderById);
    this.router.post(
      `${this.path}`,
      // authMiddlewareAdmin,
      validationMiddleware(CreateOrderDto, 'body'),
      this.ordersController.createOrder,
    );
    this.router.put(
      `${this.path}/:id`,
      // authMiddlewareAdmin,
      validationMiddleware(CreateOrderDto, 'body', true),
      this.ordersController.updateOrder,
    );
    this.router.delete(
      `${this.path}/:id`,
      // authMiddlewareAdmin,
      this.ordersController.deleteOrder,
    );
  }
}

export default OrdersRoute;
