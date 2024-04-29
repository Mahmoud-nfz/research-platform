import { LocalLoginAuthGuard } from '@/auth/guards';
import { UseGuards } from '@nestjs/common';

export const UseLocalLoginAuth = () => UseGuards(LocalLoginAuthGuard);
