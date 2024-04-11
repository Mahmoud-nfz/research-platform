import IsVercelMs from '@common/decorators/is-vercel-ms';
import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsHash, IsOptional } from 'class-validator';

export interface AuthConfig {
  login: {
    secret: string;
    maximumAge: string;
  };
  registration: {
    secret: string;
    maximumAge: string;
  };
  refresh: {
    secret: string;
    maximumAge: string;
  };
  recovery: {
    secret: string;
    maximumAge: string;
  };
  admin: {
    secret: string;
    maximumAge: string;
  };
}

class EnvVariables {
  @IsHash('sha256')
  LOGIN_JWT_SECRET: string;
  @IsVercelMs()
  @IsOptional()
  LOGIN_JWT_MAXIMUM_AGE?: string;
  @IsHash('sha256')
  REGISTRATION_JWT_SECRET: string;
  @IsVercelMs()
  @IsOptional()
  REGISTRATION_JWT_MAXIMUM_AGE?: string;
  @IsHash('sha256')
  REFRESH_JWT_SECRET: string;
  @IsVercelMs()
  @IsOptional()
  REFRESH_JWT_MAXIMUM_AGE?: string;
  @IsHash('sha256')
  RECOVERY_JWT_SECRET: string;
  @IsVercelMs()
  @IsOptional()
  RECOVERY_JWT_MAXIMUM_AGE?: string;
  @IsHash('sha256')
  ADMIN_JWT_SECRET: string;
  @IsVercelMs()
  @IsOptional()
  ADMIN_JWT_MAXIMUM_AGE?: string;
}

export const authConfig = registerAs('auth', (): AuthConfig => {
  const envVariables = validate(EnvVariables);

  return {
    login: {
      secret: envVariables.LOGIN_JWT_SECRET,
      maximumAge: envVariables.LOGIN_JWT_MAXIMUM_AGE ?? '30m',
    },
    registration: {
      secret: envVariables.REGISTRATION_JWT_SECRET,
      maximumAge: envVariables.REGISTRATION_JWT_MAXIMUM_AGE ?? '7d',
    },
    refresh: {
      secret: envVariables.REFRESH_JWT_SECRET,
      maximumAge: envVariables.REFRESH_JWT_MAXIMUM_AGE ?? '10m',
    },
    recovery: {
      secret: envVariables.RECOVERY_JWT_SECRET,
      maximumAge: envVariables.RECOVERY_JWT_MAXIMUM_AGE ?? '30m',
    },
    admin: {
      secret: envVariables.ADMIN_JWT_SECRET,
      maximumAge: envVariables.ADMIN_JWT_MAXIMUM_AGE ?? '1h',
    },
  };
});
