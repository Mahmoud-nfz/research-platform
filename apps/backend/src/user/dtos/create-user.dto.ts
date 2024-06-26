import { User } from '@/database/entities';
import { IsString, MinLength } from 'class-validator';

export class CreateUserDto implements Partial<User> {
	@IsString()
	@MinLength(2)
	firstName: string;

	@IsString()
	@MinLength(2)
	lastName: string;

	constructor(data: Partial<CreateUserDto>) {
		Object.assign(this, data);
	}
}
