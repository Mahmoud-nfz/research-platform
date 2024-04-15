import { Base } from '@common/base.entity';
import { Project } from '@project/project.entity';
import { Column, Entity, ManyToOne } from 'typeorm';

@Entity()
export class DataCollection extends Base {
  @Column({ name: 'name' })
  name: string;

  @ManyToOne(() => Project)
  project: Project;
}
