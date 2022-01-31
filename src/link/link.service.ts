import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AbstractService } from '../shared/abstract.service';
import { Repository } from 'typeorm';
import { Link } from './link';

@Injectable()
export class LinkService extends AbstractService<Link> {
  constructor(@InjectRepository(Link) repo: Repository<Link>) {
    super(repo);
  }
}
