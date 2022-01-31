import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import { OrderService } from '../order/order.service';
import { OrderItemService } from '../order/orderItem.service';
import { randomInt } from 'crypto';
import faker from '@faker-js/faker';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const orderService = app.get(OrderService);
  const orderItemService = app.get(OrderItemService);

  for (let i = 0; i < 30; i++) {
    const order = await orderService.save({
      userId: randomInt(2, 31),
      code: faker.lorem.slug(2),
      ambassadorEmail: faker.internet.email(),
      ambassadorFirstName: faker.name.firstName(),
      ambassadorLastName: faker.name.lastName(),
      email: faker.internet.email(),
      completed: true,
    });

    for (let j = 0; j < randomInt(1, 5); j++) {
      await orderItemService.save({
        order,
        title: faker.lorem.words(2),
        quantity: randomInt(1, 5),
        price: randomInt(10, 100),
        adminRevenue: randomInt(10, 100),
        ambassadorRevenue: randomInt(1, 10),
      });
    }
  }

  process.exit();
})();
