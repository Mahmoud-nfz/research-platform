import { ApiProperty } from '@nestjs/swagger';
import {IsString} from 'class-validator';

export class AddObjectDto {
  @IsString()
  @ApiProperty({
    description: 'file',
  })
  file: string;

  @IsString()
  @ApiProperty({
    description: 'Description',
  })
  description: string;
}
