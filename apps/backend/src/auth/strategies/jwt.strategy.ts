import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { Request } from 'express';
import { ExtractJwt, Strategy } from 'passport-jwt';

import { UserService } from '@/user/user.service';
import { JwtPayloadDto } from '@/auth/dtos';
import { ConfigService } from '@/config';
import { AuthStrategy } from '@/auth/auth-strategy.enum';
import { AuthUtilsService } from '@/auth/auth-utils.service';
import { instanceToPlain } from 'class-transformer';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, AuthStrategy.jwt) {
	constructor(
		configService: ConfigService,
		private readonly userService: UserService,
		private readonly authUtilsService: AuthUtilsService
	) {
		const { secret } = configService.getAuthConfig().jwt;
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: secret,
			passReqToCallback: true,
		});
	}

	async validate(request: Request, payload: JwtPayloadDto) {
		const extractor = ExtractJwt.fromAuthHeaderAsBearerToken();
		const accessToken = extractor(request);
		if (!accessToken) throw new UnauthorizedException('Invalid token');

		try {
			const user = await this.userService.findOne(payload.id, [
				'id',
				'createdAt',
				'updatedAt',
				'deletedAt',
				'firstName',
				'lastName',
				'email',
				'status',
				'accessToken',
			]);
			await this.authUtilsService.verifyStatus(user);
			await this.authUtilsService.verifyAccessTokenAgainstDatabase(
				user,
				accessToken
			);
			return instanceToPlain(user);
		} catch {
			throw new UnauthorizedException('Invalid token');
		}
	}
}
