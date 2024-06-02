import {
	Injectable,
	PipeTransform,
	BadRequestException,
	UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class ParseJwtPipe<T, R> implements PipeTransform<T, R> {
	constructor(private readonly jwtService: JwtService) {}

	transform(value: any) {
		if (!value) {
			throw new BadRequestException('JWT token is missing');
		}

		try {
			return this.jwtService.verify(value);
		} catch (error) {
			throw new UnauthorizedException('Invalid JWT token');
		}
	}
}
