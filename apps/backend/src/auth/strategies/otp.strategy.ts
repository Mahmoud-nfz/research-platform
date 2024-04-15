import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy as Strategy } from 'passport-unique-token';

import { User } from '@user/user.entity';
import { AuthStrategy } from '@auth/auth-strategy.enum';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UniqueTokenOptionsWithRequest } from 'passport-unique-token/dist/strategy';

@Injectable()
export class OneTimePasswordStrategy extends PassportStrategy(
  Strategy,
  AuthStrategy.otp,
) {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {
    super({
      tokenField: 'code',
      failOnMissing: true,
      passReqToCallback: true,
    } as UniqueTokenOptionsWithRequest);
  }

  async validate(req: Express.Request, code: string) {
    const user = req.user as User;
    const key = this.getKey(user.id);
    const [otp, exp] = await this.cacheManager.get<[string, Date]>(key);

    // no OTP associated with this user was found
    if (otp === null) throw new UnauthorizedException();

    // incorrect code
    if (otp !== code) throw new UnauthorizedException();

    // otp expired
    if (Date.now() > new Date(exp).getTime()) throw new UnauthorizedException();

    await this.cacheManager.del(key);
  }

  private getKey(id: string) {
    return id;
  }
}
