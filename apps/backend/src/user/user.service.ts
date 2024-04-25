import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { FindOneOptions, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {
    this.repository = repository.extend({});
  }

  async createOne(infos: Partial<User>) {
    const metadata = await this.repository
      .createQueryBuilder()
      .insert()
      .values(infos)
      .execute();

    return new User({ ...infos, id: metadata.identifiers[0].id });
  }

  async findOne(id: string, select?: FindOneOptions<User>['select']) {
    return this.repository.findOne({ where: { id }, select });
  }

  async findOneByEmail(email: string, select?: FindOneOptions<User>['select']) {
    return this.repository.findOne({ where: { email }, select });
  }

  async updateOne(id: string, values: Partial<User>) {
    return this.repository.update(id, values);
  }

  async updateOneByEmail(email: string, values: Partial<User>) {
    return this.repository.update({ email }, values);
  }
}
