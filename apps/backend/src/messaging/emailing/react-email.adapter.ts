import { MailerOptions, TemplateAdapter } from '@nestjs-modules/mailer';
import { render } from '@react-email/render';
import { Template } from './template.enum';
import { templates } from './templates';
import { Mail } from './mail.types';

export class ReactEmailAdapter implements TemplateAdapter {
  async compile<T extends Template>(
    mail: Mail<T>,
    callback: (err?: any, body?: string) => any,
    options: MailerOptions,
  ) {
    const { context, template } = mail.data;

    try {
      const TemplateComponent = templates[template];
      mail.data.html = render(
        TemplateComponent(context),
        options.template?.options,
      );

      return callback();
    } catch (error) {
      callback(error);
    }
  }
}
