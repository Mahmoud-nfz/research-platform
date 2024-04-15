import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@common';
import { ConfigModule } from '@config';
import { LoggerModule } from '@logger/logger.module';
import { CacheModule } from '@nestjs/cache-manager';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    DatabaseModule,
    CacheModule.register({ isGlobal: true }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
