import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsUrl } from 'class-validator';

export interface FrontConfig {
  uri: string;
  routes: {
    account_activation: string;
    password_reset: string;
    login: string;
    signup: string;
    profile: string;
    email_change: string;
  };
}

class EnvVariables {
  @IsUrl()
  FRONT_URI: string;
  @IsUrl({})
  FRONT_SIGNUP: string;
  @IsUrl()
  FRONT_ACCOUNT_ACTIVATION: string;
  @IsUrl()
  FRONT_PASSWORD_RESET: string;
  @IsUrl()
  FRONT_LOGIN: string;
  @IsUrl()
  FRONT_PROFILE: string;
  @IsUrl()
  FRONT_EMAIL_CHANGE: string;
}

export const frontConfig = registerAs('front', (): FrontConfig => {
  const envVariables = validate(EnvVariables);

  return {
    uri: envVariables.FRONT_URI,
    routes: {
      signup: envVariables.FRONT_SIGNUP,
      account_activation: envVariables.FRONT_ACCOUNT_ACTIVATION,
      password_reset: envVariables.FRONT_PASSWORD_RESET,
      login: envVariables.FRONT_LOGIN,
      profile: envVariables.FRONT_PROFILE,
      email_change: envVariables.FRONT_EMAIL_CHANGE,
    },
  };
});
