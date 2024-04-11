import { AdminConfig, MailConfig } from '@config/configs';
import { AuthConfig } from '@config/configs/auth.config';
import { DatabaseConfig } from '@config/configs/database.config';
import { FrontConfig } from '@config/configs/front.config';
import { MiscConfig } from '@config/configs/misc.config';
import { Inject, Injectable, Logger } from '@nestjs/common';
import { ConfigService as ConfigurationService } from '@nestjs/config';
import { CONFIGURATION_TOKEN } from '@nestjs/config/dist/config.constants';
import { ConfigKey } from './config-key.enum';

@Injectable()
export class ConfigService extends ConfigurationService {
  private readonly logger: Logger;

  constructor(
    @Inject(CONFIGURATION_TOKEN)
    private readonly defaultConfig: Record<string, unknown>,
  ) {
    super(defaultConfig);
    this.logger = new Logger(ConfigService.name);
  }

  getAdminConfig(): AdminConfig {
    return this.getOrThrow<AdminConfig>(ConfigKey.admin);
  }

  getAuthConfig(): AuthConfig {
    return this.getOrThrow<AuthConfig>(ConfigKey.auth);
  }

  getDatabaseConfig(): DatabaseConfig {
    return this.getOrThrow<DatabaseConfig>(ConfigKey.database);
  }

  getFrontConfig(): FrontConfig {
    return this.getOrThrow<FrontConfig>(ConfigKey.frontend);
  }

  getMailConfig(): MailConfig {
    return this.getOrThrow<MailConfig>(ConfigKey.mail);
  }

  getMiscConfig(): MiscConfig {
    return this.getOrThrow<MiscConfig>(ConfigKey.misc);
  }
}
