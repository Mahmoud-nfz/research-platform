import { Trim } from '@common';
import { User } from '@user/user.entity';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto implements Partial<User> {
  @IsString()
  @MinLength(2)
//  @Trim()
  firstName: string;

  @IsString()
  @MinLength(2)
//  @Trim()
  lastName: string;
}
