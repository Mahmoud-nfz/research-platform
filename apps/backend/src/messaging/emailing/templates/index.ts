import { Template } from '../template.enum';
import React from 'react';
import AccountActivationTemplate from './AccountActivationTemplate';

export const templates = {
  [Template.ACCOUNT_ACTIVATION]: AccountActivationTemplate,
} as const satisfies Record<Template, React.FC>;
