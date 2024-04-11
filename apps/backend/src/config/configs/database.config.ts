import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsFQDN, IsNotEmpty, IsOptional, IsPort } from 'class-validator';

export interface DatabaseConfig {
  username: string;
  password: string;
  host: string;
  port: number;
  name: string;
  uri: string;
}

class EnvVariables {
  @IsNotEmpty()
  DB_USERNAME: string;
  @IsNotEmpty()
  DB_PASSWORD: string;
  @IsFQDN()
  @IsOptional()
  DB_HOST?: string;
  @IsPort()
  @IsOptional()
  DB_PORT?: string;
  @IsNotEmpty()
  DB_NAME: string;
  @IsNotEmpty()
  DB_URI: string;
}

export const databaseConfig = registerAs('database', (): DatabaseConfig => {
  const envVariables = validate(EnvVariables);
  return {
    username: envVariables.DB_USERNAME,
    password: envVariables.DB_PASSWORD,
    host: envVariables.DB_HOST ?? '127.0.0.1',
    port: parseInt(envVariables.DB_PORT ?? '5432'),
    name: envVariables.DB_NAME,
    uri: envVariables.DB_URI,
  };
});
