import { NextFunction, Request, Response } from 'express';
import { CreateOrderDto } from '@dtos/orders.dto';
import { Order } from '@/interfaces/interface';
import ordersService from '@/services/orders.service';

class OrdersController {
  public ordersService = new ordersService();

  public getOrders = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const findAllOrdersData: Order[] = await this.ordersService.findAllOrder();

      res.status(200).json({ data: findAllOrdersData, message: 'findAll' });
    } catch (error) {
      next(error);
    }
  };

  public getOrderById = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const findOneOrderData: Order = await this.ordersService.findOrderById(orderId);

      res.status(200).json({ data: findOneOrderData, message: 'findOne' });
    } catch (error) {
      next(error);
    }
  };

  public createOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderData: CreateOrderDto = req.body;
      const createOrderData: Order = await this.ordersService.createOrder(orderData);

      res.status(201).json({ data: createOrderData, message: 'created' });
    } catch (error) {
      next(error);
    }
  };

  public updateOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const orderData: CreateOrderDto = req.body;
      const updateOrderData: Order = await this.ordersService.updateOrder(
        orderId,
        orderData,
      );

      res.status(200).json({ data: updateOrderData, message: 'updated' });
    } catch (error) {
      next(error);
    }
  };

  public deleteOrder = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const orderId: string = req.params.id;
      const deleteOrderData: Order = await this.ordersService.deleteOrder(orderId);

      res.status(200).json({ data: deleteOrderData, message: 'deleted' });
    } catch (error) {
      next(error);
    }
  };
}

export default OrdersController;
