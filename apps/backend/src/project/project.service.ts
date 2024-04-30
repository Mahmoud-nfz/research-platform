import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { DataCollection, Permission, User, Project } from '@/database/entities';

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
    const data_collectionPermissionSubQuery = this.repository.manager
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
      .orWhere(`project.id IN (${data_collectionPermissionSubQuery})`)
      .getMany();
  }

  async getNumDataCollections(project: Project, user: User) {
    const projectPermissionCount = await this.repository.manager
      .createQueryBuilder(Permission, 'permission')
      .where('permission.subject_id = :projectId', { projectId: project.id })
      .andWhere('permission.user_id = :userId', { userId: user.id })
      .getCount();

    if (projectPermissionCount > 0 || project.ownerId === user.id) {
      // If the user has access to the project as a whole, return the total number of data collections in the project
      return this.repository.manager
        .createQueryBuilder(DataCollection, 'data_collection')
        .where('data_collection.project_id = :projectId', {
          projectId: project.id,
        })
        .getCount();
    } else {
      // If the user does not have access to the project as a whole, return the number of data collections accessible by the user
      return this.repository.manager
        .createQueryBuilder(DataCollection, 'data_collection')
        .innerJoinAndMapMany(
          'data_collection.permissions',
          Permission,
          'permission',
          'permission.subject_id = data_collection.id',
        )
        .where('data_collection.project_id = :projectId', {
          projectId: project.id,
        })
        .andWhere(
          '(data_collection.owner_id = :userId OR permission.user_id = :userId)',
          { userId: user.id },
        )
        .getCount();
    }
  }
}
