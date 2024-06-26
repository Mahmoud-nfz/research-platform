import {
	Body,
	Controller,
	Get,
	Param,
	ParseUUIDPipe,
	Post,
} from '@nestjs/common';
import { DataCollectionService } from './data-collection.service';
import { AuthenticatedUser, UseJwtAuth } from '@/auth/decorators';
import { CreateDataCollectionDto } from './dtos/create-data-collection.dto';
import { Project, User } from '@/database/entities';

@Controller('data-collections')
@UseJwtAuth()
export class DataCollectionController {
	constructor(private readonly dataCollectionService: DataCollectionService) {}

	@Post()
	async createOne(
		@AuthenticatedUser() owner: User,
		@Body() { projectId, ...data }: CreateDataCollectionDto
	) {
		const project = new Project({ id: projectId });
		return this.dataCollectionService.createOne(owner, project, data);
	}

	/**
	 * List all data collections owned by authenticated user.
	 */
	@Get('my-data-collections')
	async findMyDataCollections(@AuthenticatedUser() owner: User) {
		return this.dataCollectionService.findManyByOwner(owner);
	}

	/**
	 * List all data collections accessible by authenticated user.
	 */
	@Get()
	async findAll(@AuthenticatedUser() user: User) {
		return this.dataCollectionService.findManyByUser(user);
	}

	/**
	 * List all data collections accessible by authenticated user.
	 */
	@Get(':projectId')
	async findAllByProject(
		@AuthenticatedUser() user: User,
		@Param('projectId', ParseUUIDPipe) projectId: string
	) {
		const project = new Project({ id: projectId });
		return this.dataCollectionService.findManyByProject(user, project);
	}
}
