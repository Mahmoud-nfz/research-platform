import { ConfigService, Environment } from '@config';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';

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
        };
      },
    }),
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class DatabaseModule {}
