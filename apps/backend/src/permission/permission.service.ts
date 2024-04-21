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
    const raw = await this.repositrory
      .createQueryBuilder('permission')
      .select('permission.subject_id')
      .addSelect('permission.user_id')
      .addSelect('array_agg(permission.action)', 'actions')
      .where('permission.user_id = :userId', { userId: user.id })
      .andWhere('permission.subject_id IN (:...subjectIds)', {
        subjectIds: Object.keys(permissions),
      })
      .groupBy('permission.subject_id')
      .addGroupBy('permission.user_id')
      .execute();

    const result: (Pick<Permission, 'userId' | 'subjectId'> & {
      actions: string[];
    })[] = raw.map((row) => ({
      ...row,
      subjectId: row.subject_id,
      userId: row.user_id,
    }));

    return result.every((row) => {
      const requiredActions = permissions[row.subjectId];
      const ownedActions = new Set(row.actions);
      return requiredActions.every((action) => ownedActions.has(action));
    });
  }
}
