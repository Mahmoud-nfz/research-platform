import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable, tap } from 'rxjs';
import { map } from 'rxjs/operators';

import { SUCCESS_MESSAGE_KEY } from '@common';
import { LoggerService } from '@logger/logger.service';
import { instanceToPlain } from 'class-transformer';

export class Response<T> {
  statusCode: number;
  message: string;
  data?: T;

  constructor(message: string, data?: T) {
    this.message = message;
    this.data = data;
  }
}

@Injectable()
export class ResponseWrapperInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(
    private readonly logger: LoggerService,
    private readonly reflector: Reflector,
  ) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    const message = this.reflector.get<string>(
      SUCCESS_MESSAGE_KEY,
      context.getHandler(),
    );
    const statusCode = context.switchToHttp().getResponse().statusCode;

    return next.handle().pipe(
      tap((data) => {
        this.logger.trace(
          data instanceof Response
            ? message ?? data.message ?? 'SUCCESS'
            : message ?? 'SUCCESS',
        );
      }),
      map<T, Response<T>>((data) =>
        data instanceof Response
          ? {
              message: message ?? data.message ?? 'SUCCESS',
              statusCode,
              data: data.data,
            }
          : {
              message: message ?? 'SUCCESS',
              statusCode,
              data: instanceToPlain(data),
            },
      ),
    );
  }
}
