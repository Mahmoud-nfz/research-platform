import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@/database/database.module';
import { ConfigModule, ConfigService } from '@/config';
import { LoggerModule } from '@/logger/logger.module';
import { UserModule } from '@/user/user.module';
import { PermissionModule } from '@/permission/permisson.module';
import { AuthModule } from '@/auth/auth.module';
import { ProjectModule } from '@/project/project.module';
import { DataCollectionModule } from './data-collection/data-collection.module';
import { FileModule } from './file/file.module';
import { MetadataEngineModule } from './metadata-engine/metadata-engine.module';

@Module({
	imports: [
		ConfigModule.forRoot(),
		LoggerModule,
		DatabaseModule,
		UserModule,
		PermissionModule,
		AuthModule,
		ProjectModule,
		DataCollectionModule,
		FileModule,
		MetadataEngineModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
