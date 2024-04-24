import { Base } from '@common/base.entity';
import { Permission } from '@permission/permission.entity';
import { IsIn, IsUUID } from 'class-validator';

export class GrantPermissionDto
  implements Partial<Omit<Permission, keyof Base>>
{
  @IsIn([])
  action: string;

  @IsUUID()
  userId: string;

  @IsUUID()
  subjectId: string;
}
