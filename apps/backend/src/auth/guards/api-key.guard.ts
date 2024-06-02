import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom } from 'rxjs';

import { LoggerService } from '@/logger/logger.service';
import { AuthStrategy } from '@/auth/auth-strategy.enum';

@Injectable()
export class ApiKeyAuthGuard extends AuthGuard(AuthStrategy.api_key) {
	constructor(private readonly logger: LoggerService) {
		super();
	}

	async canActivate(context: ExecutionContext): Promise<boolean> {
		this.logger.trace('Verifying identity of MinIO wrapper');
		const temp = await super.canActivate(context);
		const result = typeof temp === 'boolean' ? temp : await lastValueFrom(temp);
		this.logger.trace(result ? 'Identity verified' : 'Identity rejected');
		return result;
	}
}
