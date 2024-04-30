import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { User } from './user.entity';
import { Subject } from './subject.entity';

@Entity()
export class Project extends Subject {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => User, { nullable: false })
  owner: User;

  @RelationId((project: Project) => project.owner)
  ownerId: string;

  constructor(data: Partial<Project>) {
    super(data);
    Object.assign(this, data);
  }
}
