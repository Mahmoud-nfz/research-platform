import { NestFactory, Reflector, repl } from '@nestjs/core';
import { AppModule } from './app.module';
import { LoggerService } from '@/logger/logger.service';
import { GlobalHttpExceptionFilter } from '@/common/global-http.filter';
import { ResponseWrapperInterceptor } from '@/common/response-wrapper.interceptor';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ProviderTokens } from '@/common/provider-tokens';
import { LoggerOptions } from 'winston';

export class ApplicationBootstrapper {
	static async bootstrap() {
		const app = await NestFactory.create(AppModule);
		const winstonConfig = await app.resolve<LoggerOptions>(
			ProviderTokens.WINSTON_CONFIG
		);
		const reflector = app.get(Reflector);

		// Enable versioning
		app.enableVersioning({
			type: VersioningType.URI,
		});

		// enable validation
		app.useGlobalPipes(
			new ValidationPipe({
				transform: true,
				whitelist: true,
			})
		);

		// standardize response
		app.useGlobalInterceptors(
			new ResponseWrapperInterceptor(
				LoggerService.create(winstonConfig, ResponseWrapperInterceptor.name),
				reflector
			)
		);

		// enable filters
		app.useGlobalFilters(
			new GlobalHttpExceptionFilter(
				LoggerService.create(winstonConfig, GlobalHttpExceptionFilter.name)
			)
		);

		// enable logging
		app.useLogger(LoggerService.create(winstonConfig, this.name));

		app.enableShutdownHooks();

		// @/configure CORS policy to accept requests only from frontend server
		// const { front, dashboard } = configService.getMiscConfig();
		// const allowedOrigins = [front, dashboard].filter(
		//   (origin) => origin !== undefined,
		// ) as string[];
		app.enableCors();

		await app.listen(3007);
	}

	static async repl() {
		await repl(AppModule);
	}
}

ApplicationBootstrapper.bootstrap();
