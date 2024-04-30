import { AuthStrategy } from '@/auth/auth-strategy.enum';
import { ExecutionContext, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserService } from '@/user/user.service';
import { lastValueFrom } from 'rxjs';

@Injectable()
export class OtpAuthGuard extends AuthGuard(AuthStrategy.otp) {
  constructor(private readonly userService: UserService) {
    super();
  }

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const temp = await super.canActivate(context);
    const result = typeof temp === 'boolean' ? temp : await lastValueFrom(temp);
    const request = context.switchToHttp().getRequest();
    request.user = await this.userService.findOne(request.user);
    return result;
  }
}
