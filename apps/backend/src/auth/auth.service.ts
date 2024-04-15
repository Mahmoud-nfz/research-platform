import { LoggerService } from '@logger/logger.service';
import { BadRequestException, Injectable } from '@nestjs/common';
import { UserService } from '@user/user.service';
import { User, UserStatus } from '@user/user.entity';
import { LocalSignupDto } from './dtos';
import { AuthUtilsService } from './auth-utils.service';
import { MailService } from '@messaging/emailing/mail.service';
import { Template } from '@messaging/emailing/template.enum';

@Injectable()
export class AuthService {
  constructor(
    private readonly logger: LoggerService,
    private readonly userService: UserService,
    private readonly authUtilsService: AuthUtilsService,
    private readonly mailService: MailService,
  ) {}

  async verifyEmail(user: User) {
    this.logger.trace(
      `Updating user status to ${UserStatus.active} for user: ${user.id}`,
    );
    await this.userService.updateOne(user.id, { status: UserStatus.active });
  }

  async logout(user: User) {
    await this.userService.updateOne(user.id, {
      accessToken: null,
      refreshToken: null,
    });
  }

  async rotate(user: User, accessToken: string, refreshToken: string) {
    const { newAccessToken, newRefreshToken } =
      await this.authUtilsService.refreshJWT(user, accessToken, refreshToken);

    this.logger.trace('Updating database');
    await this.userService.updateOne(user.id, {
      accessToken: newAccessToken,
      refreshToken: newRefreshToken,
    });

    return { accessToken: newAccessToken, refreshToken: newRefreshToken };
  }

  async login(user: User) {
    this.logger.trace(`Signing in user: ${user.id}`);

    const { accessToken, refreshToken } =
      this.authUtilsService.generateJWT(user);

    this.logger.trace('Updating database');
    await this.userService.updateOne(user.id, { refreshToken, accessToken });

    this.logger.info(`User: ${user.id} is now online`);
    return { refreshToken, accessToken };
  }

  async signup({ email, password, ...infos }: LocalSignupDto) {
    const { salt, passwordHash } =
      await this.authUtilsService.generatePasswordHashAndSalt(password);
    const user = await this.userService.createOne({
      ...infos,
      email,
      salt,
      passwordHash,
      status: UserStatus.pending_email_activation,
    });

    const otp = this.authUtilsService.generateOTP(user);

    this.mailService.sendEmail({
      template: Template.email_verification,
      to: { address: email, name: infos.firstName },
      context: { name: infos.firstName, code: otp },
    });

    return user;
  }

  async forgotPassword(email: string) {
    const user = await this.userService.findOneByEmail(email);
    if (user === null) throw new BadRequestException('User does not exist');

    // send forgot password email
  }

  async resetPassword(user: User, newPassword: string) {
    const { passwordHash, salt } =
      await this.authUtilsService.generatePasswordHashAndSalt(newPassword);

    this.logger.trace('Updating database');
    await this.userService.updateOne(user.id, { passwordHash, salt });
    this.logger.info(`Saved new password for user: ${user.id}`);

    // send successful password reset email
  }
}
