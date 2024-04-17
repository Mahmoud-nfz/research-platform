import { ConfigKey } from '@config/config-key.enum';
import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsEnum, IsOptional, IsPort } from 'class-validator';

export enum Environment {
  dev = 'development',
  prod = 'production',
  test = 'test',
}

export interface MiscConfig {
  port: number;
  environment: Environment;
}

class EnvVariables {
  @IsPort()
  @IsOptional()
  PORT?: string;
  @IsEnum(Environment)
  @IsOptional()
  NODE_ENV?: Environment;
}

export const miscConfig = registerAs(ConfigKey.misc, (): MiscConfig => {
  const envVariables = validate(EnvVariables);
  return {
    port: parseInt(envVariables.PORT ?? '3001'),
    environment: envVariables.NODE_ENV ?? Environment.dev,
  };
});
