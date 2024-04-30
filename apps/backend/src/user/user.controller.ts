import { Controller, Get } from '@nestjs/common';
import { User } from '../database/entities/user.entity';
import { AuthenticatedUser, UseJwtAuth } from '@/auth/decorators';

@Controller('user')
@UseJwtAuth()
export class UserController {
  @Get('profile')
  async profile(@AuthenticatedUser() user: User) {
    return user;
  }
}
