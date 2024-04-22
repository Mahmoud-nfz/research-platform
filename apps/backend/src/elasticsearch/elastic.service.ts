import { Injectable } from '@nestjs/common';
import { AddObjectDto } from './dto/add-object.dto';
import { SearchService } from './search/search.service';

@Injectable()
export class ElasticService {
  private readonly index = 'metadata';

  constructor(private readonly searchService: SearchService) {}

  addObject(addObjectDto: AddObjectDto) {
    return this.searchService.createIndex({
      index: this.index,
      body: {
        ...addObjectDto,
      },
    });
  }

  getObjects() {
    return this.searchService.searchIndex({
      index: this.index,
    });
  }
}
