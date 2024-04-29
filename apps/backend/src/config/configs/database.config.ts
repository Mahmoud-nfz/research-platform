import { ConfigKey } from '@/config/config-key.enum';
import { validate } from '@/config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsIn, IsNotEmpty } from 'class-validator';

const SUPPORTED_DATABASES = ['postgres'] as const;
type SupportedDatabases = (typeof SUPPORTED_DATABASES)[number];

export interface DatabaseConfig {
  type: SupportedDatabases;
  url: string;
}

class EnvVariables {
  @IsIn(SUPPORTED_DATABASES)
  DB_TYPE: SupportedDatabases;
  @IsNotEmpty()
  DB_URI: string;
}

export const databaseConfig = registerAs(
  ConfigKey.database,
  (): DatabaseConfig => {
    const envVariables = validate(EnvVariables);
    return {
      type: envVariables.DB_TYPE,
      url: envVariables.DB_URI,
    };
  },
);
