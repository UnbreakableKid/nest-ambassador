import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { Product } from './product';

@Injectable()
export class ProductService extends AbstractService<Product> {
  constructor(
    @InjectRepository(Product)
    private readonly productService: Repository<Product>,
  ) {
    super(productService);
  }
}
