import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { DataCollection } from '../database/entities/data-collection.entity';
import { Repository } from 'typeorm';
import { Permission, Project, User } from '@database/entities';

@Injectable()
export class DataCollectionService {
  constructor(
    @InjectRepository(DataCollection)
    private readonly repository: Repository<DataCollection>,
  ) {}

  async createOne(
    owner: User,
    project: Project,
    values: Partial<DataCollection>,
  ) {
    const dataCollection = new DataCollection({ ...values, owner, project });
    return this.repository.save(dataCollection);
  }

  async findManyByOwner(owner: User) {
    return this.repository
      .createQueryBuilder('data_collection')
      .where('data_collection.owner_id = :ownerId', { ownerId: owner.id })
      .execute();
  }

  async findManyByUser(user: User) {
    // Subquery to select subjects where the user has any permission
    const permissionSubQuery = this.repository.manager
      .createQueryBuilder(Permission, 'permission')
      .select('DISTINCT permission.subject_id')
      .where('permission.user_id = :userId', { userId: user.id })
      .getQuery();

    // Main query to select data collections accessible by the user
    return (
      this.repository
        .createQueryBuilder('data_collection')
        // Owner of data collection
        .where('data_collection.owner_id = :userId', { userId: user.id })
        // User has permission on data collection
        .orWhere(`data_collection.id IN (${permissionSubQuery})`)
        // User has permission on project containing data collections
        .orWhere(`data_collection.project_id IN (${permissionSubQuery})`)
        .getMany()
    );
  }
}
