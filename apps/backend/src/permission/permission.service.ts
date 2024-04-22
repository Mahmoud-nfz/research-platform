import { InjectRepository } from '@nestjs/typeorm';
import { Permission } from './permission.entity';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { User } from '@user/user.entity';

@Injectable()
export class PermissionService {
  constructor(
    @InjectRepository(Permission)
    private readonly repositrory: Repository<Permission>,
  ) {}

  async checkUserPermissions(
    user: User,
    permissions: Record<string, string[]>,
  ): Promise<boolean> {
    const result: (Pick<Permission, 'userId' | 'subjectId'> & {
      actions: string[];
    })[] = await this.repositrory
      .createQueryBuilder('permission')
      .select('permission.subjectId', 'subjectId')
      .addSelect('permission.userId', 'userId')
      .addSelect('array_agg(permission.action)', 'actions')
      .where('permission.userId = :user_id', { user_id: user.id })
      .andWhere('permission.subjectId IN (:...subject_ids)', {
        subject_ids: Object.keys(permissions),
      })
      .groupBy('permission.subjectId')
      .addGroupBy('permission.userId')
      .execute();

    return result.every((row) => {
      const requiredActions = permissions[row.subjectId];
      const ownedActions = new Set(row.actions);
      return requiredActions.every((action) => ownedActions.has(action));
    });
  }
}
