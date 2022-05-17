import { CreateOrderDto } from '@/dtos/orders.dto';
import { HttpException } from '@exceptions/HttpException';
import { Order } from '@/interfaces/interface';
import { orderModel } from '@/models/model';
import { isEmpty } from '@utils/util';
import { v4 } from 'uuid';

class OrderService {
  public orders = orderModel;

  public async findAllOrder(): Promise<Order[]> {
    const orders: Order[] = await this.orders.aggregate([
      {
        $lookup: {
          from: 'users',
          localField: 'user.id',
          foreignField: 'id',
          as: 'user',
        },
      },
      {
        $project: {
          'user.password': false,
          'user._id': false,
          'user.__v': false,
        },
      },
    ]);
    return orders;
  }

  public async findOrderById(orderId: string): Promise<Order> {
    if (isEmpty(orderId)) throw new HttpException(400, "You're not orderId");

    const findOrder: Order = await this.orders.findOne({ id: orderId });
    if (!findOrder) throw new HttpException(409, "You're not order");

    return findOrder;
  }

  public async createOrder(orderData: CreateOrderDto): Promise<Order> {
    if (isEmpty(orderData)) throw new HttpException(400, "You're not orderData");

    const createOrderData: Order = await this.orders.create({
      ...orderData,
      id: v4(),
    });

    return createOrderData;
  }

  public async updateOrder(orderId: string, orderData: CreateOrderDto): Promise<Order> {
    if (isEmpty(orderData)) throw new HttpException(400, "You're not orderData");

    const updateOrderById: Order = await this.orders.findOneAndUpdate(
      { id: orderId },
      orderData,
    );
    if (!updateOrderById) throw new HttpException(409, "You're not order");

    return updateOrderById;
  }

  public async deleteOrder(orderId: string): Promise<Order> {
    const deleteOrderById: Order = await this.orders.findOneAndDelete({ id: orderId });
    if (!deleteOrderById) throw new HttpException(409, "You're not order");

    return deleteOrderById;
  }
}

export default OrderService;
