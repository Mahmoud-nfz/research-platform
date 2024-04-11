import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsUrl } from 'class-validator';

export interface FrontConfig {
  uri: string;
  routes: {
    account_activation_route: string;
    password_reset_route: string;
    login_route: string;
    signup_route: string;
    profile_route: string;
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
}

export const frontConfig = registerAs('front', (): FrontConfig => {
  const envVariables = validate(EnvVariables);

  return {
    uri: envVariables.FRONT_URI,
    routes: {
      signup_route: envVariables.FRONT_SIGNUP,
      account_activation_route: envVariables.FRONT_ACCOUNT_ACTIVATION,
      password_reset_route: envVariables.FRONT_PASSWORD_RESET,
      login_route: envVariables.FRONT_LOGIN,
      profile_route: envVariables.FRONT_PROFILE,
    },
  };
});
