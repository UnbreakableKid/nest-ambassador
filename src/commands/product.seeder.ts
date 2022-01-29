import { NestFactory } from '@nestjs/core';
import { AppModule } from '../app.module';
import * as faker from '@faker-js/faker';
import { ProductService } from '../product/product.service';
import { randomInt } from 'crypto';

(async () => {
  const app = await NestFactory.createApplicationContext(AppModule);

  const productService = app.get(ProductService);

  for (let i = 0; i < 30; i++) {
    await productService.save({
      title: faker.faker.lorem.words(2),
      description: faker.faker.lorem.words(10),
      price: randomInt(10, 100),
      imageUrl: faker.faker.image.imageUrl(200, 200, '', true),
    });
  }

  process.exit();
})();
