import { Body, Controller, Get, Post } from '@nestjs/common';
import { DataCollectionService } from './data-collection.service';
import { AuthenticatedUser, UseJwtAuth } from '@auth/decorators';
import { User } from '@user/user.entity';
import { CreateDataCollectionDto } from './dtos/create-data-collection.dto';
import { Project } from '@project/project.entity';

@Controller('data-collections')
@UseJwtAuth()
export class DataCollectionController {
  constructor(private readonly dataCollectionService: DataCollectionService) {}

  @Post()
  async createOne(
    @AuthenticatedUser() owner: User,
    @Body() { projectId, ...data }: CreateDataCollectionDto,
  ) {
    const project = new Project({ id: projectId });
    return this.dataCollectionService.createOne(owner, project, data);
  }

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
}
