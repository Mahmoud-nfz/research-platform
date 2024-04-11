import { validate } from '@config/config.validator';
import { registerAs } from '@nestjs/config';
import { MailerOptions } from '@nestjs-modules/mailer';
import { Address } from '@nestjs-modules/mailer/dist/interfaces/send-mail-options.interface';
import {
  IsBooleanString,
  IsEmail,
  IsIn,
  IsNotEmpty,
  IsOptional,
} from 'class-validator';
import { ConfigKey } from '@config/config-key.enum';

export interface MailConfig extends MailerOptions {
  sender: string | Address;
  enabled: boolean;
}

class EnvVariables {
  @IsBooleanString()
  @IsOptional()
  EMAILING_ENABLED?: 'true' | 'false';
  @IsEmail()
  SENDER_EMAIL: string;
  @IsNotEmpty()
  SENDER_NAME: string;
  @IsIn(['gmail'])
  NODEMAILER_SERVICE: string;
  @IsNotEmpty()
  NODEMAILER_USER: string;
  @IsNotEmpty()
  NODEMAILER_PASSWORD: string;
}

export const messagingConfig = registerAs(ConfigKey.mail, (): MailConfig => {
  const envVariables = validate(EnvVariables);

  return {
    enabled: envVariables.EMAILING_ENABLED !== 'false',
    sender: {
      address: envVariables.SENDER_EMAIL,
      name: envVariables.SENDER_NAME,
    },
    transport: {
      service: envVariables.NODEMAILER_SERVICE,
      auth: {
        user: envVariables.NODEMAILER_USER,
        pass: envVariables.NODEMAILER_PASSWORD,
      },
    },
  };
});
