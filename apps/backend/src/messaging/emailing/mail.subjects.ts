import { APP_NAME } from '@common/constants';
import { Template } from './template.enum';

export const subjects: Record<Template, string> = {
  [Template.email_verification]: `[${APP_NAME}] Email Verification`,
  [Template.email_change]: `[${APP_NAME}] Email Change`,
};
