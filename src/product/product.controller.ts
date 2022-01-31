import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ProductCreateDto } from './dtos/product.create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ...

  @Get('admin/products')
  async getProducts() {
    return await this.productService.findAll();
  }

  @Post('admin/products')
  async createProduct(@Body() product: ProductCreateDto) {
    return await this.productService.save(product);
  }

  @Get('admin/products/:id')
  async getProduct(@Param('id') id: number) {
    return await this.productService.findOne({ id });
  }

  @Put('admin/products/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: ProductCreateDto,
  ) {
    await this.productService.update(id, product);
    return await this.productService.findOne({ id });
  }

  @Delete('admin/products/:id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.delete(id);
  }
}
