import { RequestParams } from '@elastic/elasticsearch';
import { Injectable } from '@nestjs/common';
import { ElasticsearchService } from '@nestjs/elasticsearch';

@Injectable()
export class SearchService {
  constructor(private readonly elasticsearchService: ElasticsearchService) {}

  createIndex(params: RequestParams.Index) {
    return this.elasticsearchService.index(params);
  }

  searchIndex(params: RequestParams.Search) {
    return this.elasticsearchService.search(params);
  }
}
