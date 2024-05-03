import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { UserModule } from '@/user/user.module';
import {
	JwtStrategy,
	LocalLoginsStrategy,
	OneTimePasswordStrategy,
} from './strategies';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigService } from '@/config';
import { AuthUtilsService } from './auth-utils.service';
import { CacheModule } from '@nestjs/cache-manager';

@Module({
	imports: [
		PassportModule.register({ session: true }),
		UserModule,
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
		CacheModule.register(),
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
