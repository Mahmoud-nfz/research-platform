import { ConfigKey } from '@config/config-key.enum';
import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsEmail } from 'class-validator';

export interface AdminConfig {
  superAdmin: { email: string };
}

class EnvVariables {
  @IsEmail()
  SUPER_ADMIN_EMAIL: string;
}

export const adminConfig = registerAs(ConfigKey.admin, (): AdminConfig => {
  const envVariables = validate(EnvVariables);

  return {
    superAdmin: {
      email: envVariables.SUPER_ADMIN_EMAIL,
    },
  };
});
