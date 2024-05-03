import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { UniqueTokenStrategy as Strategy } from 'passport-unique-token';
import { AuthStrategy } from '@/auth/auth-strategy.enum';
import { CACHE_MANAGER, Cache } from '@nestjs/cache-manager';
import { UniqueTokenOptionsWithRequest } from 'passport-unique-token/dist/strategy';
import { AuthUtilsService } from '@/auth/auth-utils.service';
import { LoggerService } from '@/logger/logger.service';
import { timingSafeEqual } from 'crypto';
import { User } from '@/database/entities';

@Injectable()
export class OneTimePasswordStrategy extends PassportStrategy(
	Strategy,
	AuthStrategy.otp
) {
	constructor(
		private readonly logger: LoggerService,
		private readonly authUtilesService: AuthUtilsService,
		@Inject(CACHE_MANAGER) private cacheManager: Cache
	) {
		super({
			tokenField: 'code',
			failOnMissing: true,
			passReqToCallback: true,
		} as UniqueTokenOptionsWithRequest);
	}

	async validate(req: Express.Request, code: string) {
		const userId = (req?.user as User)?.id ?? (req as any).body?.userId;
		const key = this.authUtilesService.getOTPCacheKey(userId);
		const value = await this.cacheManager.get<[string, Date]>(key);

		// no OTP associated with this user was found
		if (!value) {
			this.logger.trace(`OTP not found for key: ${key}`);
			throw new UnauthorizedException();
		}

		await this.cacheManager.del(key);
		const [otp, exp] = value;

		// incorrect code
		if (
			!timingSafeEqual(
				Buffer.from(otp.toString()),
				Buffer.from(code.toString())
			)
		) {
			this.logger.trace('code provided does not match OTP');
			throw new UnauthorizedException();
		}

		// otp expired
		if (Date.now() > new Date(exp).getTime()) {
			this.logger.trace('OTP expired');
			throw new UnauthorizedException();
		}

		return userId;
	}
}
