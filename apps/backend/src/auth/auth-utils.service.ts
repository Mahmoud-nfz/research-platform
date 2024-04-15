import { LoggerService } from '@logger/logger.service';
import {
  BadRequestException,
  ForbiddenException,
  Injectable,
  UnprocessableEntityException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, UserStatus } from '@user/user.entity';
import { compare, genSalt, hash } from 'bcrypt';
import { timingSafeEqual } from 'crypto';

@Injectable()
export class AuthUtilsService {
  private readonly rounds: number;
  constructor(
    private readonly logger: LoggerService,
    private readonly jwtService: JwtService,
  ) {
    this.rounds = 10;
  }

  async generatePasswordHashAndSalt(password: string) {
    this.logger.trace('Generating password hash and salt');
    const salt = await genSalt(this.rounds);
    const passwordHash = await hash(password, salt);
    return { salt, passwordHash };
  }

  async verifyPassword(user: User, password: string) {
    this.logger.trace(`Verifying password for user ${user.id}`);
    try {
      await compare(password, user.passwordHash);
      return true;
    } catch (error) {
      return false;
    }
  }

  verifyStatus(user: User) {
    this.logger.trace(`Verifying status for user ${user.id}`);
    if (user.status === UserStatus.pending_email_activation)
      throw new ForbiddenException('Email has not been verified yet');
  }

  verifyAccessTokenAgainstDatabase(user: User, accessToken: string) {
    this.logger.trace('Verifying access token against database');
    return timingSafeEqual(
      Buffer.from(accessToken),
      Buffer.from(user.accessToken),
    );
  }

  checkAccessTokenExpiration(accessToken: string) {
    this.logger.trace('Checking access token expiration');
    return !!this.jwtService.verify(accessToken);
  }

  generateJWT(user: User) {
    const updatedAt = new Date();

    this.logger.trace(`Generating access token for user: ${user.id}`);
    const accessToken = this.jwtService.sign({
      id: user.id,
      updated_at: updatedAt,
    });

    this.logger.trace(`Generating refresh token for user: ${user.id}`);
    const refreshToken = this.jwtService.sign({
      id: user.id,
      updated_at: updatedAt,
    });

    return { accessToken, refreshToken };
  }

  refreshJWT(user: User, accessToken: string, refreshToken: string) {
    this.logger.trace('Verifying provided tokens');

    const doATsMatch = timingSafeEqual(
      Buffer.from(accessToken),
      Buffer.from(user.accessToken),
    );
    const doRTsMatch = timingSafeEqual(
      Buffer.from(refreshToken),
      Buffer.from(user.refreshToken),
    );

    if (!doATsMatch || !doRTsMatch)
      throw new BadRequestException('Incorrect JWT pair');

    if (!this.jwtService.verify(refreshToken))
      throw new UnprocessableEntityException('Refresh token expired');

    this.logger.trace('Generating new JWT pair');
    const updatedAt = new Date();

    const newAccessToken = this.jwtService.sign({
      id: user.id,
      updated_at: updatedAt,
    });

    const newRefreshToken = this.jwtService.sign({
      id: user.id,
      updated_at: updatedAt,
    });

    return { newAccessToken, newRefreshToken };
  }
}
