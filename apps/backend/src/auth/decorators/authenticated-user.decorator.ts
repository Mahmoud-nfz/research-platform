import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { User } from '@user/user.entity';

export const AuthenticatedUser = createParamDecorator(
  (data: unknown, context: ExecutionContext): User => {
    const request = context.switchToHttp().getRequest();
    return request['user'];
  },
);
