import { Body, Controller, Get, ParseUUIDPipe, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthenticatedUser, UseJwtAuth } from '@/auth/decorators';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User, Project } from '@/database/entities';
import { VerifyIdPresenceInDatabase } from '@/common';

@Controller('projects')
@UseJwtAuth()
export class ProjectController {
	constructor(private readonly projectSerice: ProjectService) {}

	@Post()
	async createOne(
		@AuthenticatedUser() owner: User,
		@Body() data: CreateProjectDto
	) {
		return this.projectSerice.createOne(owner, data);
	}

	/**
	 * List all projects owned by user
	 */
	@Get('my-projects')
	async findMyProjects(@AuthenticatedUser() owner: User) {
		return this.projectSerice.findManyByOwner(owner);
	}

	/**
	 * List all projects accessible by authenticated user.
	 */
	@Get()
	async findAll(@AuthenticatedUser() user: User) {
		return this.projectSerice.findManyByUser(user);
	}

	/**
	 * Get number of data collections accessible by authenticated user in a specific project.
	 */
	@Get('num-data-collections')
	async getNumDataCollections(
		@AuthenticatedUser() user: User,
		@Body('projectId', ParseUUIDPipe, VerifyIdPresenceInDatabase(Project))
		project: Project
	) {
		return this.projectSerice.getNumDataCollections(project, user);
	}

	/**
	 * List all projects on which authenticated user has the `create` permission.
	 */
	@Get('can-create')
	async findWithCreatePermission(@AuthenticatedUser() user: User) {
		return this.projectSerice.findManyByUserWithCreatePermission(user);
	}
}
