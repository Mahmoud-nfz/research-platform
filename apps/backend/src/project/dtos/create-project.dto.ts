import { Base, Project } from '@database/entities';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateProjectDto implements Partial<Omit<Project, keyof Base>> {
  @IsString()
  @IsNotEmpty()
  name: string;
}
