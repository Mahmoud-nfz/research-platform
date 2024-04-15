import { IsStrongPassword } from 'class-validator';

export class ResetPasswordDto {
  @IsStrongPassword()
  password: string;
}
