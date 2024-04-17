import { ConfigKey } from '@config/config-key.enum';
import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsFQDN, IsIn, IsNotEmpty, IsPort } from 'class-validator';

const SUPPORTED_DATABASES = ['mysql', 'postgres', 'sqlite', 'mssql'] as const;
type SupportedDatabases = (typeof SUPPORTED_DATABASES)[number];

export interface DatabaseConfig {
  type: SupportedDatabases;
  username: string;
  password: string;
  host: string;
  port: number;
  database: string;
  uri: string;
}

class EnvVariables {
  @IsIn(SUPPORTED_DATABASES)
  DB_TYPE: SupportedDatabases;
  @IsNotEmpty()
  DB_USERNAME: string;
  @IsNotEmpty()
  DB_PASSWORD: string;
  @IsFQDN({
    allow_numeric_tld: true,
    allow_underscores: true,
    require_tld: false,
  })
  DB_HOST: string;
  @IsPort()
  DB_PORT: string;
  @IsNotEmpty()
  DB_NAME: string;
  @IsNotEmpty()
  DB_URI: string;
}

export const databaseConfig = registerAs(
  ConfigKey.database,
  (): DatabaseConfig => {
    const envVariables = validate(EnvVariables);
    return {
      type: envVariables.DB_TYPE,
      username: envVariables.DB_USERNAME,
      password: envVariables.DB_PASSWORD,
      host: envVariables.DB_HOST,
      port: parseInt(envVariables.DB_PORT),
      database: envVariables.DB_NAME,
      uri: envVariables.DB_URI,
    };
  },
);
