import { Base } from '@/database/entities';
import {
  HttpStatus,
  Injectable,
  Optional,
  PipeTransform,
  Type,
} from '@nestjs/common';
import {
  ErrorHttpStatusCode,
  HttpErrorByCode,
} from '@nestjs/common/utils/http-error-by-code.util';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

export interface VerifyIdPresenceInDatabaseOptions {
  errorHttpStatusCode?: ErrorHttpStatusCode;
  exceptionFactory?: (error: string) => any;
}

export function VerifyIdPresenceInDatabase<E extends Base>(entity: Type<E>) {
  @Injectable()
  class VerifyIdPresenceInDatabaseMixin
    implements PipeTransform<string, Promise<E>>
  {
    exceptionFactory: (error: string) => any;
    options?: VerifyIdPresenceInDatabaseOptions;

    constructor(
      @InjectRepository(entity) public repository: Repository<E>,
      @Optional() options,
    ) {
      this.options = options || {};
      const { exceptionFactory, errorHttpStatusCode = HttpStatus.BAD_REQUEST } =
        this.options;

      this.exceptionFactory =
        exceptionFactory ||
        ((error) => new HttpErrorByCode[errorHttpStatusCode](error));
    }

    async transform(value: string) {
      const row = await this.isPresent(value);

      if (!row) {
        throw this.exceptionFactory(
          'Validation failed (expected id to be in database)',
        );
      }
      return row;
    }

    async isPresent(id: string) {
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-ignore
      return this.repository.findOne({ where: { id } });
    }
  }

  return VerifyIdPresenceInDatabaseMixin;
}
