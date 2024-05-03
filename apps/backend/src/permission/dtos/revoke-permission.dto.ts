import { Base, Permission } from '@/database/entities';
import { IsIn, IsUUID } from 'class-validator';

export class RevokePermissionDto
	implements Partial<Omit<Permission, keyof Base>>
{
	@IsIn([])
	action: string;

	@IsUUID()
	userId: string;

	@IsUUID()
	subjectId: string;
}
