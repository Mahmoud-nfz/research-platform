import { Body, Controller, Get, HttpStatus, Post } from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { ElasticService } from './elastic.service';
import { AddObjectDto } from './dto/add-object.dto';

@Controller()
export class ElasticController {
  constructor(private readonly ElasticService: ElasticService) {}

  @Post()
  @ApiBody({
    type: [AddObjectDto],
    description: 'Add the Object to elasticsearch',
  })
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'The record has been successfully added to elasticsearch.',
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Request body is invalid.',
  })
  async addObject(@Body() addObjectDto: AddObjectDto) {
    const { body } = await this.ElasticService.addObject(addObjectDto);

    return {
      status: HttpStatus.CREATED,
      data: body,
    };
  }

  @Get()
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Returns all paths',
  })
  async getObjects() {
    const { body } = await this.ElasticService.getObjects();

    return {
      status: HttpStatus.OK,
      data: body,
    };
  }
}
