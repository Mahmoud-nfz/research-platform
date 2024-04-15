import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { MessagingModule } from '@/messaging/messaging.module';
import { UserModule } from '@user/user.module';
import {
  JwtStrategy,
  LocalLoginsStrategy,
  OneTimePasswordStrategy,
} from './strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@config';
import { AuthUtilsService } from './auth-utils.service';

@Module({
  imports: [
    PassportModule.register({ session: true }),
    UserModule,
    MessagingModule,
    JwtModule.registerAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        secret: configService.getAuthConfig().jwt.secret,
        signOptions: {
          expiresIn: configService.getAuthConfig().jwt.maximumAge,
        },
        verifyOptions: {
          ignoreExpiration: false,
        },
      }),
    }),
    UserModule,
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    AuthUtilsService,
    LocalLoginsStrategy,
    JwtStrategy,
    OneTimePasswordStrategy,
  ],
})
export class AuthModule {}
