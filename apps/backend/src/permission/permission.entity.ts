import { Action } from '@auth/action.enum';
import { Subject } from '@auth/subject.entity';
import { Base } from '@common/base.entity';
import { User } from '@user/user.entity';
import { Column, Index, ManyToOne } from 'typeorm';

export class Permission extends Base {
  @Index()
  @ManyToOne(() => User)
  user: User;

  @ManyToOne(() => Subject)
  target: Subject;

  @Column({ name: 'action' })
  action: Action;
}
