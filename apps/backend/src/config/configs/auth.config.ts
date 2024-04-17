import { IsVercelMs } from '@common';
import { ConfigKey } from '@config/config-key.enum';
import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsHash, IsOptional } from 'class-validator';

export interface AuthConfig {
  jwt: {
    secret: string;
    maximumAge: string;
  };
}

class EnvVariables {
  @IsHash('sha256')
  JWT_SECRET: string;
  @IsVercelMs()
  @IsOptional()
  JWT_MAXIMUM_AGE?: string;
}

export const authConfig = registerAs(ConfigKey.auth, (): AuthConfig => {
  const envVariables = validate(EnvVariables);

  return {
    jwt: {
      secret: envVariables.JWT_SECRET,
      maximumAge: envVariables.JWT_MAXIMUM_AGE ?? '30m',
    },
  };
});
