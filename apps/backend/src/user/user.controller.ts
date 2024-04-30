import { Controller, Get } from '@nestjs/common';
import { AuthenticatedUser, UseJwtAuth } from '@auth/decorators';
import { User } from '../database/entities/user.entity';

@Controller('user')
@UseJwtAuth()
export class UserController {
  @Get('profile')
  async profile(@AuthenticatedUser() user: User) {
    return user;
  }
}
