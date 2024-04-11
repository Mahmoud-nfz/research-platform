import { ProviderTokens as Tokens } from '@common/provider-tokens';
import { LogLevel, LogOptions } from '@logger/logger.types';
import {
  Inject,
  Injectable,
  LoggerService as DefaultLoggerService,
  Scope,
} from '@nestjs/common';
import { createLogger, Logger, LoggerOptions } from 'winston';

@Injectable({ scope: Scope.TRANSIENT })
export class LoggerService implements DefaultLoggerService {
  private static lastLog: number;
  private readonly logger: Logger;

  constructor(
    @Inject(Tokens.WINSTON_CONFIG) private readonly config: LoggerOptions,
    @Inject(Tokens.LOGGER_CONTEXT) private readonly context: string,
  ) {
    LoggerService.lastLog = Date.now();
    this.logger = createLogger(config);
  }

  private get ms() {
    const current_timestamp = Date.now();
    const last_log = LoggerService.lastLog;
    LoggerService.lastLog = current_timestamp;
    return current_timestamp - last_log;
  }

  static create(config: LoggerOptions, source: string): LoggerService {
    return new LoggerService(config, source);
  }

  info(message: string, options?: LogOptions) {
    this.log(LogLevel.info, message, options);
  }

  error(message: string, options?: LogOptions): void {
    this.log(LogLevel.error, message, options);
  }

  crit(message: string, options?: LogOptions) {
    this.log(LogLevel.crit, message, options);
  }

  fatal(message: string, options?: LogOptions) {
    this.log(LogLevel.fatal, message, options);
  }

  log(level: LogLevel, message: string, options?: LogOptions): void;
  log(message: any, ...optionalParams: any[]): void;
  log(...args: any[]): void {
    if (args[0] in LogLevel) {
      const level = args[0] as LogLevel;
      const message = args[1] as string;
      const options = args[2] as LogOptions;
      this.logger.log(level, {
        message: message,
        ms: this.ms,
        context: options?.context ?? this.context,
        meta: options?.meta,
      });
    } else {
      const [message, ...optionalParams] = args;
      this.logger.log('info', message, {
        context: optionalParams.at(-1),
      });
    }
  }

  warn(message: string, options?: LogOptions): void {
    this.log(LogLevel.warn, message, options);
  }

  trace(message: string, options?: LogOptions): void {
    this.log(LogLevel.trace, message, options);
  }
}
