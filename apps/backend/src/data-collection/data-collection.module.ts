import { Module } from '@nestjs/common';
import { DataCollectionService } from './data-collection.service';
import { DataCollectionController } from './data-collection.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataCollection } from './data-collection.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DataCollection])],
  providers: [DataCollectionService],
  controllers: [DataCollectionController],
})
export class DataCollectionModule {}
