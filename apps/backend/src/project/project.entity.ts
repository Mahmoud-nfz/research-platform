import { Base } from '@common/base.entity';
import { User } from '@user/user.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class Project extends Base {
  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => User)
  owner: User;
}
