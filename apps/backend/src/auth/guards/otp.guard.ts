import { AuthStrategy } from '@auth/auth-strategy.enum';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OtpAuthGuard extends AuthGuard(AuthStrategy.otp) {
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const temp = await super.canActivate(context);
    const result = typeof temp === 'boolean' ? temp : await lastValueFrom(temp);
    return result;
  }
}
