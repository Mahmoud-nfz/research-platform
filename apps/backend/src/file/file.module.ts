import { Module } from '@nestjs/common';
import { FileService } from './file.service';
import { FileController } from './file.controller';
import { JwtModule } from '@nestjs/jwt';
import { ConfigService } from '@/config';
import { ParseJwtPipe } from '@/common/pipes/parse-jwt.pipe';
import { FileInternalController } from './file-internal.controller';

@Module({
	imports: [
		JwtModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => ({
				secret: configService.getMinioWrapperConfig().jwt.secret,
				signOptions: {
					expiresIn: configService.getMinioWrapperConfig().jwt.maximumAge,
				},
				verifyOptions: {
					ignoreExpiration: false,
				},
			}),
		}),
	],
	controllers: [FileController, FileInternalController],
	providers: [FileService, ParseJwtPipe],
})
export class FileModule {}
