import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConfigService } from '@config';
import { LoggerOptions } from 'winston';
import { ProviderTokens } from '@common';
import { ValidationPipe, VersioningType } from '@nestjs/common';
import { ResponseWrapperInterceptor } from '@common/interceptors/response-wrapper.interceptor';
import { LoggerService } from '@logger/logger.service';
import { GlobalHttpExceptionFilter } from '@common/exception-filters/global-http.filter';

class ApplicationBootstrapper {
  static async bootstrap() {
    const app = await NestFactory.create(AppModule);
    const configService = app.get(ConfigService);
    const winstonConfig = await app.resolve<LoggerOptions>(
      ProviderTokens.WINSTON_CONFIG,
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
      }),
    );

    // standardize response
    app.useGlobalInterceptors(
      new ResponseWrapperInterceptor(
        LoggerService.create(winstonConfig, ResponseWrapperInterceptor.name),
        reflector,
      ),
    );

    // enable filters
    app.useGlobalFilters(
      new GlobalHttpExceptionFilter(
        LoggerService.create(winstonConfig, GlobalHttpExceptionFilter.name),
      ),
    );

    // enable logging
    app.useLogger(LoggerService.create(winstonConfig, this.name));

    // configure CORS policy to accept requests only from frontend server
    // const { front, dashboard } = configService.getMiscConfig();
    // const allowedOrigins = [front, dashboard].filter(
    //   (origin) => origin !== undefined,
    // ) as string[];
    app.enableCors();

    // get port to listen on from environment variables
    const PORT = configService.getMiscConfig().port;
    await app.listen(PORT);
  }
}

ApplicationBootstrapper.bootstrap();
