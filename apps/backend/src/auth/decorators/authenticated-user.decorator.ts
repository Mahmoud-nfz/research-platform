import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@user/user.entity';
import { plainToInstance } from 'class-transformer';
import { Request } from 'express';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest<Request>();
    return plainToInstance(User, request['user']);
  },
);
