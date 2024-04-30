import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProjectService } from './project.service';
import { AuthenticatedUser, UseJwtAuth } from '@/auth/decorators';
import { CreateProjectDto } from './dtos/create-project.dto';
import { User } from '@/database/entities';

@Controller('projects')
@UseJwtAuth()
export class ProjectController {
  constructor(private readonly projectSerice: ProjectService) {}

  @Post()
  async createOne(
    @AuthenticatedUser() owner: User,
    @Body() data: CreateProjectDto,
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
}
