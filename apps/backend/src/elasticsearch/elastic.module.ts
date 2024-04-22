import { Module } from '@nestjs/common';
import { ElasticController } from './elastic.controller';
import { ElasticService } from './elastic.service';
import { SearchModule } from './search/search.module';

@Module({
  imports: [SearchModule],
  controllers: [ElasticController],
  providers: [ElasticService],
})
export class ElasticModule {}
