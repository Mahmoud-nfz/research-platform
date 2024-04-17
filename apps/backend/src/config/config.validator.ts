import { ClassConstructor, plainToInstance } from 'class-transformer';
import { validateSync } from 'class-validator';
import * as process from 'process';

export function validate<C extends object>(EnvVariables: ClassConstructor<C>) {
  const validatedConfig = plainToInstance(EnvVariables, process.env, {
    enableImplicitConversion: true,
  });
  const errors = validateSync(validatedConfig, {
    skipNullProperties: false,
    skipMissingProperties: false,
    forbidUnknownValues: true,
  });

  if (errors.length > 0) {
    throw new Error(errors.map((error) => error.toString()).join('\n'));
  }
  return validatedConfig;
}
