import { AuthUtilsService } from '@/auth/auth-utils.service';
import { LoggerService } from '@/logger/logger.service';
import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';

@Injectable()
export class AddUserGuard implements CanActivate {
	constructor(
		private readonly logger: LoggerService,
		private readonly authUtilsService: AuthUtilsService
	) {}

	canActivate(
		context: ExecutionContext
	): boolean | Promise<boolean> | Observable<boolean> {
		this.logger.trace('Verifying if email ');
		const req = context.switchToHttp().getRequest<Request>();
		const email = req.body['email'];
		this.authUtilsService.verifyNewUserCacheEntry(email);
		return true;
	}
}
