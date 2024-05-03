import { IsEmail } from 'class-validator';

export class AddUserDto {
	@IsEmail()
	email: string;
}
