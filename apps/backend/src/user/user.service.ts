import { Injectable } from '@nestjs/common';
import { User } from './user.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private readonly repository: Repository<User>,
  ) {}

  createOne(infos: Partial<User>) {
    return this.repository.create(infos);
  }

  findOne(id: string) {
    return this.repository.findOne({ where: { id } });
  }

  findOneByEmail(email: string) {
    return this.repository.findOne({ where: { email } });
  }

  updateOne(id: string, values: Partial<User>) {
    return this.repository.update(id, values);
  }

  updateOneByEmail(email: string, values: Partial<User>) {
    return this.repository.update({ email }, values);
  }
}
