import { Base, Project } from '@/database/entities';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class CreateProjectDto implements Partial<Omit<Project, keyof Base>> {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsUrl()
  imageUrl: string;

  @IsString()
  description: string;

  @IsString({ each: true })
  tags: string[];
}
