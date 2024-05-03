import { IsUUID } from 'class-validator';

export class JwtPayloadDto {
	@IsUUID()
	id: string;
}
