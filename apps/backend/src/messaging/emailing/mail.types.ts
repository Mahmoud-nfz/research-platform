import { ISendMailOptions } from '@nestjs-modules/mailer';
import { templates } from './templates';
import { Template } from './template.enum';
import MailMessage from 'nodemailer/lib/mailer/mail-message';

export type ContextType<T extends Template> = React.ComponentProps<
  (typeof templates)[T]
>;

export type MailOptions<T extends Template> = Partial<
  Omit<ISendMailOptions, 'context' | 'template'>
> & {
  template: T;
  context: ContextType<T>;
};

export type Mail<T extends Template> = Omit<MailMessage, 'data'> & {
  data: MailOptions<T>;
};
