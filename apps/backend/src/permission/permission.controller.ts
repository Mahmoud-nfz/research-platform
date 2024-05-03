import { Body, Controller, Delete, Post } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { UseJwtAuth } from '@/auth/decorators';
import { GrantPermissionDto } from './dtos/grant-permission.dto';
import { RevokePermissionDto } from './dtos/revoke-permission.dto';
import { User } from '@/database/entities';

@Controller('permissions')
@UseJwtAuth()
export class PermissionController {
	constructor(private readonly permissionService: PermissionService) {}

	@Post()
	async grant(@Body() { userId, subjectId, action }: GrantPermissionDto) {
		const user = new User({ id: userId });
		return this.permissionService.createOne(user, subjectId, action);
	}

	@Delete()
	async revoke(@Body() { userId, subjectId, action }: RevokePermissionDto) {
		const user = new User({ id: userId });
		return this.permissionService.deleteOne(user, subjectId, action);
	}
}
