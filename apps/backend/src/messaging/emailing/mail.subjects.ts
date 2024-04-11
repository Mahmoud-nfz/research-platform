import { APP_NAME } from '@common/constants';
import { Template } from './template.enum';

export const subjects: Record<Template, string> = {
  [Template.ACCOUNT_ACTIVATION]: `[${APP_NAME}] Account Activation`,
};
