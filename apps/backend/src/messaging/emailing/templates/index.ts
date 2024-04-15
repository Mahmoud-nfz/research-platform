import { Template } from '../template.enum';
import React from 'react';
import EmailVerificationTemplate from './EmailVerificationTemplage';
import EmailChangeTemplate from './EmailChangeTemplate';

export const templates = {
  [Template.email_verification]: EmailVerificationTemplate,
  [Template.email_change]: EmailChangeTemplate,
} as const satisfies Record<Template, React.FC>;
