import { JwtAuthGuard } from '@auth/guards';
import { UseGuards } from '@nestjs/common';

export const UseJwtAuth = () => UseGuards(JwtAuthGuard);
