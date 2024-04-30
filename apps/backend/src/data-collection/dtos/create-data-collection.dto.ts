import { Base, DataCollection } from '@database/entities';
import { IsNotEmpty, IsString, IsUUID } from 'class-validator';

export class CreateDataCollectionDto
  implements Partial<Omit<DataCollection, keyof Base>>
{
  @IsUUID()
  projectId: string;

  @IsNotEmpty()
  @IsString()
  name: string;
}
