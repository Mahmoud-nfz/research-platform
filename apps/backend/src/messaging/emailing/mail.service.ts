import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { MailerService } from '@nestjs-modules/mailer';

import { ConfigService } from '@/config';
import { LoggerService } from '@/logger/logger.service';

import { subjects } from './mail.subjects';
import { Template } from './template.enum';
import { APP_NAME } from '@common/constants';
import { MailOptions } from './mail.types';

@Injectable()
export class MailService {
  private readonly enabled: boolean;

  constructor(
    private readonly configService: ConfigService,
    private readonly mailerService: MailerService,
    private readonly logger: LoggerService,
  ) {
    const { enabled } = this.configService.getMailConfig();
    this.enabled = enabled;
  }

  /**
   * send messaging using the default sender and a predefined templates.
   * the default sender is initialized in ConfigService.
   *
   * @param options - the templates to use. All templates are defined in `templates/index.ts`.
   */
  async sendEmail<T extends Template>(options: MailOptions<T>): Promise<void> {
    this.logger.trace(`Sending ${options.template} email`);
    try {
      if (this.enabled)
        await this.mailerService.sendMail({
          ...options,
          context: {
            appName: APP_NAME,
            ...options.context,
          },
          subject: subjects[options.template],
          template: options.template,
        });
    } catch (error) {
      throw new InternalServerErrorException('ERROR_WHILE_SENDING_EMAIL');
    }
  }
}
