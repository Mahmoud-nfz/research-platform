import { Subject } from '@permission/subject.entity';
import { User } from '@user/user.entity';
import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { ProjectAction } from './project-action.enum';

@Entity()
export class Project extends Subject {
  public static actions = ProjectAction;

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
