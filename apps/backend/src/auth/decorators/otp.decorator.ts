import { OtpAuthGuard } from '@auth/guards/otp.guard';
import { UseGuards } from '@nestjs/common';

export const UseOtpAuth = () => UseGuards(OtpAuthGuard);
