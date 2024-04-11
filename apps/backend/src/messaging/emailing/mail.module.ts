import { ConfigService } from '@config';
import { Module } from '@nestjs/common';
import { MailerModule, MailerOptions } from '@nestjs-modules/mailer';

import { MailService } from './mail.service';
import { ReactEmailAdapter } from './react-email.adapter';

@Module({
  imports: [
    MailerModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (configService: ConfigService): MailerOptions => {
        const config = configService.getMailConfig();
        return {
          ...config,
          template: {
            adapter: new ReactEmailAdapter(),
            options: {
              strict: true,
              pretty: false,
              plainText: false,
            },
          },
        };
      },
    }),
  ],
  controllers: [],
  providers: [MailService],
  exports: [MailService],
})
export class MailModule {}
