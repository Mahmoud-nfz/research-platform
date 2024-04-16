import { validate } from '@config/config.validator';
import { LogLevel } from '@logger/logger.types';
import { registerAs } from '@nestjs/config';
import { Type } from 'class-transformer';
import { IsBooleanString, IsEnum, IsOptional, IsPort } from 'class-validator';

export enum Environment {
  dev = 'development',
  prod = 'production',
  test = 'test',
}

export interface MiscConfig {
  port: number;
  environment: Environment;
  debug: boolean;
  level: LogLevel;
}

class EnvVariables {
  @IsPort()
  @IsOptional()
  PORT?: string;
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV?: Environment;
  @Type(() => Number)
  @IsBooleanString()
  @IsOptional()
  DEBUG?: 'true' | 'false';
  @IsEnum(LogLevel)
  @IsOptional()
  LOG_LEVEL: LogLevel = LogLevel.trace;
}

export const miscConfig = registerAs('misc', (): MiscConfig => {
  const envVariables = validate(EnvVariables);
  return {
    port: parseInt(envVariables.PORT ?? '3001'),
    environment: envVariables.NODE_ENV ?? Environment.dev,
    debug:
      envVariables.DEBUG !== undefined
        ? envVariables.DEBUG === 'true'
        : (envVariables.NODE_ENV ?? Environment.dev) === Environment.dev,
    level: envVariables.LOG_LEVEL,
  };
});
