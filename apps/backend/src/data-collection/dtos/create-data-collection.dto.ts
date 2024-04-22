import { Base } from '@common/base.entity';
import { DataCollection } from '@data-collection/data-collection.entity';
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
