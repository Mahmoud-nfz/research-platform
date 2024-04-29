import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Project } from '../database/entities/project.entity';
import { Repository } from 'typeorm';
import { DataCollection, Permission, User } from '@/database/entities';

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

  async findManyByUser(user: User) {
    // Subquery to select subjects where the user has any permission
    const permissionSubQuery = this.repository.manager
      .createQueryBuilder(Permission, 'permission')
      .select('DISTINCT permission.subject_id')
      .where('permission.user_id = :userId', { userId: user.id })
      .getQuery();

    // Subquery to select data collections where the user has any permission
    const dataCollectionPermissionSubQuery = this.repository.manager
      .createQueryBuilder(DataCollection, 'data_collection')
      .select('DISTINCT data_collection.project_id')
      .where('data_collection.owner_id = :userId', {
        userId: user.id,
      })
      .orWhere(`data_collection.id IN (${permissionSubQuery})`)
      .getQuery();

    // Main query to select projects accessible by the user
    return this.repository
      .createQueryBuilder('project')
      .where('project.owner_id = :userId', { userId: user.id })
      .orWhere(`project.id IN (${permissionSubQuery})`)
      .orWhere(`project.id IN (${dataCollectionPermissionSubQuery})`)
      .getMany();
  }
}
