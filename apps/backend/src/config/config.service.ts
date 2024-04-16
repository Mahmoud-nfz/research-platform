import { DatabaseConfig } from '@config/configs/database.config';
import { MiscConfig } from '@config/configs/misc.config';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as ConfigurationService } from '@nestjs/config';
import { CONFIGURATION_TOKEN } from '@nestjs/config/dist/config.constants';
import { ConfigKey } from './config-key.enum';

@Injectable()
export class ConfigService extends ConfigurationService {
  constructor(
    @Inject(CONFIGURATION_TOKEN) defaultConfig: Record<string, unknown>,
  ) {
    super(defaultConfig);
  }

  getDatabaseConfig(): DatabaseConfig {
    return this.getOrThrow<DatabaseConfig>(ConfigKey.database);
  }

  getMiscConfig(): MiscConfig {
    return this.getOrThrow<MiscConfig>(ConfigKey.misc);
  }
}
