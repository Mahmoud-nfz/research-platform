import { ConfigService, ReCaptchaConfig } from '@config';
import { LoggerService } from '@logger/logger.service';
import {
  BadRequestException,
  ForbiddenException,
  Inject,
  Injectable,
  NestMiddleware,
  ServiceUnavailableException,
} from '@nestjs/common';
import axios, { AxiosInstance, AxiosResponse } from 'axios';
import axiosRetry from 'axios-retry';
import { NextFunction, Request, Response } from 'express';

export interface ReCaptchaResponse {
  success: boolean;
  score: number;
  action: string;
  challenge_ts: Date;
  hostname: string;
  'error-codes': string[];
}

export const MINIMUM_RECAPTCHA_SCORE = 0.5;

export const RECAPTCHA_MIDDLEWARE_ACTION_NAME = 'RECAPTCHA_ACTION';

export const RECAPTCHA_TOKEN_KEY = 'recaptcha_token';

@Injectable()
export class ReCaptchaMiddleware implements NestMiddleware<Request, Response> {
  private readonly reCaptchaConfig: ReCaptchaConfig;
  private readonly axios: AxiosInstance;

  constructor(
    private readonly logger: LoggerService,
    private readonly configService: ConfigService,
    @Inject(RECAPTCHA_MIDDLEWARE_ACTION_NAME) private readonly action: string,
  ) {
    this.reCaptchaConfig = configService.getMiscConfig().reCaptcha;
    this.axios = axios.create();
    axiosRetry(this.axios, {
      retries: 2,
      retryDelay: axiosRetry.exponentialDelay,
    });
  }

  async use(req: Request, res: Response, next: NextFunction) {
    this.logger.trace(`action: ${this.action}`);
    const url = this.getRecaptchaServerSideUrl(
      req.body[RECAPTCHA_TOKEN_KEY],
      req.ip,
    );

    await this.axios
      .post(url)
      .then((response: AxiosResponse<ReCaptchaResponse>) => {
        if (!response.data.success) {
          this.logger.error(
            response.data['error-codes'].reduce(
              (err, curr) => err + '\n' + curr,
            ),
          );
          throw new ServiceUnavailableException(
            'ReCaptcha failed. Please retry.',
          );
        }

        if (response.data.score < MINIMUM_RECAPTCHA_SCORE) {
          throw new ForbiddenException(
            'ReCaptcha score too low. Please try again.',
          );
        }

        if (response.data.action !== this.action) {
          throw new BadRequestException('Wrong action.');
        }
      });

    next();
  }

  private getRecaptchaServerSideUrl(token: string, ip?: string) {
    const url = new URL(this.reCaptchaConfig.verify);
    url.searchParams.set('secret', this.reCaptchaConfig.secret);
    url.searchParams.set('response', token);
    if (ip) url.searchParams.set('remoteip', ip);
    return url.href;
  }
}
