import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { ProductCreateDto } from './dtos/product.create.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  // ...

  @UseGuards(AuthGuard)
  @Get('admin/products')
  async getProducts() {
    return await this.productService.findAll();
  }

  @UseGuards(AuthGuard)
  @Post('admin/products')
  async createProduct(@Body() product: ProductCreateDto) {
    return await this.productService.save(product);
  }

  @UseGuards(AuthGuard)
  @Get('admin/products/:id')
  async getProduct(@Param('id') id: number) {
    return await this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Put('admin/products/:id')
  async updateProduct(
    @Param('id') id: number,
    @Body() product: ProductCreateDto,
  ) {
    await this.productService.update(id, product);
    return await this.productService.findOne({ id });
  }

  @UseGuards(AuthGuard)
  @Delete('admin/products/:id')
  async deleteProduct(@Param('id') id: number) {
    await this.productService.delete(id);
  }
}
