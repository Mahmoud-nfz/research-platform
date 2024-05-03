import { ConfigService, Environment } from '@/config';
import { Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSnakeNamingStrategy } from './database-snake-naming.strategy';
import { BuisnessEntities } from './entities';

@Global()
@Module({
	imports: [
		TypeOrmModule.forRootAsync({
			inject: [ConfigService],
			useFactory(configService: ConfigService) {
				const dbConfig = configService.getDatabaseConfig();
				const env = configService.getMiscConfig().environment;
				return {
					...dbConfig,
					type: dbConfig.type,
					synchronize: env === Environment.dev,
					autoLoadEntities: true,
					ssl: true,
					namingStrategy: new DatabaseSnakeNamingStrategy(),
					logging: 'all',
				};
			},
		}),
		TypeOrmModule.forFeature(BuisnessEntities),
	],
	controllers: [],
	providers: [],
	exports: [TypeOrmModule],
})
export class DatabaseModule {}
