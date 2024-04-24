import { Global, Module } from '@nestjs/common';

import { LoggerContextProvider } from '@/logger/context.provider';
import { LoggerService } from '@/logger/logger.service';
import { WinstonProvider } from '@/logger/winston.provider';

@Global()
@Module({
  providers: [LoggerService, WinstonProvider, LoggerContextProvider],
  exports: [LoggerService],
})
export class LoggerModule {}
