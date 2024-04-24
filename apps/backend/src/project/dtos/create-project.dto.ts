import { Base } from '@common/base.entity';
import { Project } from '@project/project.entity';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto implements Partial<Omit<Project, keyof Base>> {
  @IsString()
  @IsNotEmpty()
  name: string;
}
