import { HeaderAPIKeyStrategy as Strategy } from 'passport-headerapikey';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';
import { AuthStrategy } from '../auth-strategy.enum';
import { ConfigService } from '@/config';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class ApiKeyStrategy extends PassportStrategy(
	Strategy,
	AuthStrategy.api_key
) {
	constructor(private readonly configService: ConfigService) {
		super({ header: 'X-Api-Key', prefix: '' }, false);
	}

	validate(headerValue: string) {
		const apiKey = this.configService.getMinioWrapperConfig().apiKey;
		if (
			apiKey.length !== headerValue.length ||
			!timingSafeEqual(Buffer.from(apiKey), Buffer.from(headerValue))
		) {
			throw new UnauthorizedException('Invalid API key');
		}
		return true;
	}
}
