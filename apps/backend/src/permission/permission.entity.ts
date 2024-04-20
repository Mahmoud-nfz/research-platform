import { Column, Entity, Index, ManyToOne, RelationId } from 'typeorm';
import { Base } from '@common/base.entity';
import { User } from '@user/user.entity';

@Entity({ name: 'permissions' })
@Index(['user', 'subjectId', 'action'], { unique: true })
export class Permission extends Base {
  @Column({ name: 'action', type: 'varchar' })
  action: string;

  @Column({ name: 'subject_id', type: 'uuid' })
  subjectId: string;

  @Index()
  @ManyToOne(() => User, { nullable: false })
  user: User;

  @RelationId((permission: Permission) => permission.user)
  userId: string;
}
