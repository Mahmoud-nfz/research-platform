import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
	Query,
	UseGuards,
} from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthenticatedUser } from '@/auth/decorators';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User, Project } from '@/database/entities';
import { VerifyIdPresenceInDatabase } from '@/common';
import { JwtAuthGuard } from '@/auth/guards';
import { PermissionGuard } from '@/permission/permission.guard';
import { RequirePermission } from '@/permission/require-permission.decorator';
import { ProjectAction } from './project-action.enum';

@Controller('projects')
@UseGuards(JwtAuthGuard, PermissionGuard)
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

	/**
	 * Search through all projects accessible by authenticated user.
	 */
	@Get('search')
	async searchAllProjects(
		@AuthenticatedUser() user: User,
		@Query('query') query: string
	) {
		return this.projectSerice.searchAllProjects(user, query);
	}

	@Get(':id')
	@RequirePermission((req) => req.params.id, ProjectAction.read)
	async getProject(@Param('id') id: string) {
		return this.projectSerice.findOne(id);
	}
}
