import { Controller, Get } from '@nestjs/common';
import { OrderService } from './order.service';

@Controller()
export class OrderController {
  constructor(private readonly orderService: OrderService) {}

  @Get('admin/orders')
  async getOrders() {
    return await this.orderService.findAll();
  }

  
}
