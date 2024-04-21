import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from './project.entity';
import { Repository } from 'typeorm';
import { User } from '@user/user.entity';

@Injectable()
export class ProjectService {
  constructor(
    @InjectRepository(Project) private readonly repository: Repository<Project>,
  ) {}

  async createOne(owner: User, infos: Partial<Project>) {
    const project = new Project({ ...infos, owner });
    return this.repository.save(project);
  }

  async findManyByOwner(owner: User) {
    return this.repository
      .createQueryBuilder('project')
      .where('project.owner_id = :ownerId', { ownerId: owner.id })
      .execute();
  }
}
