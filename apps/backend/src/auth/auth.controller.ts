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
import { AddUserDto } from './dtos/add-user.dto';
import { UseAddUserAuth } from './decorators/add-user.decorator';

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

  @Post('login')
  @UseLocalLoginAuth()
  @SuccessMessage('USER_ONLINE')
  async login(@AuthenticatedUser() user: User) {
    return this.authService.login(user);
  }

  @Post('complete-signup')
  @UseAddUserAuth()
  @SuccessMessage('ACCOUNT_CREATED')
  async completeSignup(@Body() infos: LocalSignupDto) {
    return this.authService.completeSignup(infos);
  }

  @Post('add-user')
  @SuccessMessage('USER_ADDED')
  async addUser(@Body() { email }: AddUserDto) {
    return this.authService.addUser(email);
  }

  @Patch('forgot-password')
  async forgotPassword(@Body() { email }: ForgotPasswordDto) {
    return this.authService.forgotPassword(email);
  }

  @Post('reset-password')
  @UseOtpAuth()
  @SuccessMessage('SUCCESSFUL_PASSWORD_RESET')
  async resetPassword(
    @Body() { password }: ResetPasswordDto,
    @AuthenticatedUser() user: User,
  ) {
    return this.authService.resetPassword(user, password);
  }
}
