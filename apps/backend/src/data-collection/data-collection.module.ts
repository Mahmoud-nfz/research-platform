import { Module } from '@nestjs/common';
import { DataCollectionService } from './data-collection.service';
import { DataCollectionController } from './data-collection.controller';

@Module({
	providers: [DataCollectionService],
	controllers: [DataCollectionController],
})
export class DataCollectionModule {}
