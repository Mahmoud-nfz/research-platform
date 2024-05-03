import {
	ArgumentsHost,
	Catch,
	ExceptionFilter,
	HttpException,
} from '@nestjs/common';
import { Request, Response } from 'express';

import { LoggerService } from '@/logger/logger.service';
import { LogLevel } from '@/logger/logger.types';

export interface ResponseType<T> {
	statusCode: number;
	message: string;
	data?: T;
}

@Catch(HttpException)
export class GlobalHttpExceptionFilter
	implements ExceptionFilter<HttpException>
{
	constructor(private readonly logger: LoggerService) {}

	catch(exception: HttpException, host: ArgumentsHost) {
		const ctx = host.switchToHttp();
		const response: Response = ctx.getResponse();
		const request: Request = ctx.getRequest();
		const status = exception.getStatus();
		const error = exception.getResponse();

		this.log(exception, request);

		response.status(status).json(
			typeof error === 'string'
				? {
						statusCode: status,
						message: exception.message,
						error,
					}
				: error
		);
	}

	private getLogLevel(status: number): LogLevel {
		return status < 500 ? LogLevel.trace : LogLevel.error;
	}

	private log(exception: HttpException, request: Request): void {
		const { ip } = request;
		const status = exception.getStatus();
		const stack = exception.stack;
		const cause = exception.cause;

		this.logger.log(
			this.getLogLevel(status),
			exception.message ?? exception.name ?? 'ERROR',
			{
				meta: {
					stack,
					ip,
					cause,
				},
			}
		);
	}
}
