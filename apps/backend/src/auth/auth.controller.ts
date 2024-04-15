import { Body, Patch, Post, Controller } from '@nestjs/common';
import {
  AuthenticatedUser,
  UseJwtAuth,
  UseLocalLoginAuth,
  UseOtpAuth,
} from './decorators';
import { User } from '@user/user.entity';
import { AuthService } from './auth.service';
import {
  JwtRefreshDto as JwtRotateDto,
  ForgotPasswordDto,
  ResetPasswordDto,
  LocalSignupDto,
} from './dtos';
import { SuccessMessage } from '@common';

@Controller('auth')
export class AuthController {
  constructor(protected readonly authService: AuthService) {}

  @Post('rotate')
  @UseJwtAuth()
  @SuccessMessage('SUCCESSFUL_JWT_ROTATE')
  async rotate(
    @AuthenticatedUser() user: User,
    @Body() { access_token, refresh_token }: JwtRotateDto,
  ) {
    return this.authService.rotate(user, access_token, refresh_token);
  }

  @Patch('logout')
  @UseJwtAuth()
  @SuccessMessage('SUCCESSFUL_LOGOUT')
  async logout(@AuthenticatedUser() user: User) {
    return this.authService.logout(user);
  }

  @Post('local/login')
  @UseLocalLoginAuth()
  @SuccessMessage('USER_ONLINE')
  async login(@AuthenticatedUser() user: User) {
    return this.authService.login(user);
  }

  @Post('local/signup')
  @SuccessMessage('ACCOUNT_CREATED')
  async signup(@Body() infos: LocalSignupDto) {
    return this.authService.signup(infos);
  }

  @Post('local/verify-email')
  @UseOtpAuth()
  @SuccessMessage('EMAIL_VERIFIED')
  async verifyEmail(@AuthenticatedUser() user: User) {
    return this.authService.verifyEmail(user);
  }

  @Patch('local/forgot-password')
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('local/reset-password')
  @UseOtpAuth()
  @SuccessMessage('SUCCESSFUL_PASSWORD_RESET')
  async resetPassword(
    @Body() { password }: ResetPasswordDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.authService.resetPassword(user, password);
  }
}
