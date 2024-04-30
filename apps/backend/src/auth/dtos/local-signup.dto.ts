import { CreateUserDto } from '@/user/dtos/create-user.dto';
import { IsEmail, IsStrongPassword } from 'class-validator';

export class LocalSignupDto extends CreateUserDto {
  @IsStrongPassword()
  password: string;

  @IsEmail()
  email: string;
}
