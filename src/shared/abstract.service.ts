import { Repository } from 'typeorm';

export abstract class AbstractService<T> {
  protected constructor(protected readonly repository: Repository<any>) {}

  async save(options: Partial<T>) {
    return await this.repository.save(options);
  }
  async findOne(options: any) {
    return await this.repository.findOne(options);
  }

  async findAll(options: any = {}) {
    return await this.repository.find(options);
  }

  async update(id: number, options: Partial<T>) {
    return await this.repository.update(id, options);
  }

  async delete(id: number) {
    return await this.repository.delete(id);
  }
}
