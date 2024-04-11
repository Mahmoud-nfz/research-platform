import { Module } from '@nestjs/common';
import { MailModule } from './emailing/mail.module';

@Module({
  imports: [MailModule],
  controllers: [],
  providers: [],
  exports: [MailModule],
})
export class MessagingModule {}
