import { Column, Entity, ManyToOne, RelationId } from 'typeorm';
import { Subject } from './subject.entity';
import { User } from './user.entity';
import { Project } from './project.entity';

@Entity()
export class DataCollection extends Subject {
  @Column({ type: 'varchar' })
  name: string;

  @ManyToOne(() => User, { nullable: false })
  owner: User;

  @RelationId((dataCollection: DataCollection) => dataCollection.owner)
  ownerId: string;

  @ManyToOne(() => Project, { nullable: false })
  project: Project;

  @RelationId((dataCollection: DataCollection) => dataCollection.project)
  projectId: string;

  constructor(data: Partial<DataCollection>) {
    super(data);
    Object.assign(this, data);
  }
}
