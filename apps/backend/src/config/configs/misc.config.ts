import { validate } from '@config/config.validator';
import { LogLevel } from '@logger/logger.types';
import { registerAs } from '@nestjs/config';
import { ThrottlerModuleOptions } from '@nestjs/throttler';
import { Type } from 'class-transformer';
import {
  IsBooleanString,
  IsEnum,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPort,
  IsUrl,
  Min,
} from 'class-validator';

export interface ReCaptchaConfig {
  secret: string;
  verify: URL;
  siteKey: string;
}

export enum Environment {
  dev = 'development',
  prod = 'production',
  test = 'test',
}

export interface MiscConfig {
  port: number;
  front: string;
  dashboard: string;
  environment: Environment;
  throttler: ThrottlerModuleOptions;
  reCaptcha: ReCaptchaConfig;
  debug: boolean;
  level: LogLevel;
}

class EnvVariables {
  @IsPort()
  @IsOptional()
  PORT?: string;
  @IsUrl()
  FRONT_URI: string;
  @IsUrl()
  DASHBOARD_URI: string;
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV?: Environment;
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  THROTTLER_TTL?: number;
  @Type(() => Number)
  @IsNumber()
  @Min(0)
  @IsOptional()
  THROTTLER_LIMIT?: number;
  @IsNotEmpty()
  GOOGLE_RECAPTCHA_SECRET_KEY: string;
  @IsNotEmpty()
  GOOGLE_RECAPTCHA_SITE_KEY: string;
  @IsUrl()
  GOOGLE_RECAPTCHA_VERIFY_TOKEN: string;
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
    front: envVariables.FRONT_URI,
    dashboard: envVariables.DASHBOARD_URI,
    environment: envVariables.NODE_ENV ?? Environment.dev,
    throttler: {
      throttlers: [
        {
          ttl: envVariables.THROTTLER_TTL ?? 60,
          limit: envVariables.THROTTLER_LIMIT ?? 10,
        },
      ],
    },
    reCaptcha: {
      secret: envVariables.GOOGLE_RECAPTCHA_SECRET_KEY,
      siteKey: envVariables.GOOGLE_RECAPTCHA_SITE_KEY,
      verify: new URL(envVariables.GOOGLE_RECAPTCHA_VERIFY_TOKEN),
    },
    debug:
      envVariables.DEBUG !== undefined
        ? envVariables.DEBUG === 'true'
        : (envVariables.NODE_ENV ?? Environment.dev) === Environment.dev,
    level: envVariables.LOG_LEVEL,
  };
});
