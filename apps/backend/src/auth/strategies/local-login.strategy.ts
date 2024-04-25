import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { IStrategyOptions, Strategy } from 'passport-local';

import { UserService } from '@/user/user.service';
import { User } from '@user/user.entity';
import { AuthStrategy } from '@auth/auth-strategy.enum';
import { AuthUtilsService } from '@auth/auth-utils.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class LocalLoginsStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.local_login,
) {
  constructor(
    private readonly userService: UserService,
    private readonly authUtilsService: AuthUtilsService,
  ) {
    super({
      usernameField: 'email',
      passwordField: 'password',
    } as IStrategyOptions);
  }

  async validate(email: string, password: string) {
    let user: User;
    try {
      user = await this.userService.findOneByEmail(email, [
        'id',
        'createdAt',
        'updatedAt',
        'deletedAt',
        'email',
        'firstName',
        'lastName',
        'passwordHash',
        'salt',
        'status',
      ]);
    } catch (error) {
      throw new UnauthorizedException('Incorrect email or password');
    }

    const isPasswordCorrect = await this.authUtilsService.verifyPassword(
      user,
      password,
    );
    if (!isPasswordCorrect)
      throw new UnauthorizedException('Incorrect email or password');

    this.authUtilsService.verifyStatus(user);

    return instanceToPlain(user);
  }
}
