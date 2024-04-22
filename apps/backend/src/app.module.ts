import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseModule } from '@database/database.module';
import { ConfigModule } from '@config';
import { LoggerModule } from '@logger/logger.module';
import { UserModule } from '@user/user.module';
import { PermissionModule } from '@permission/permisson.module';
import { AuthModule } from '@auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    LoggerModule,
    DatabaseModule,
    UserModule,
    PermissionModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
