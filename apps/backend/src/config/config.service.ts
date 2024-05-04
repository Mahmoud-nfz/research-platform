import { DatabaseConfig } from '@/config/configs/database.config';
import { MiscConfig, AuthConfig } from '@/config/configs';
import { Inject, Injectable } from '@nestjs/common';
import { ConfigService as ConfigurationService } from '@nestjs/config';
import { CONFIGURATION_TOKEN } from '@nestjs/config/dist/config.constants';
import { ConfigKey } from './config-key.enum';
import { ElasticsearchConfig } from './configs/elasticsearch.config';

@Injectable()
export class ConfigService extends ConfigurationService {
	constructor(
		@Inject(CONFIGURATION_TOKEN) defaultConfig: Record<string, unknown>
	) {
		super(defaultConfig);
	}

	getAuthConfig(): AuthConfig {
		return this.getOrThrow<AuthConfig>(ConfigKey.auth);
	}

	getDatabaseConfig(): DatabaseConfig {
		return this.getOrThrow<DatabaseConfig>(ConfigKey.database);
	}

	getMiscConfig(): MiscConfig {
		return this.getOrThrow<MiscConfig>(ConfigKey.misc);
	}

	getElasticsearchConfig(): ElasticsearchConfig {
		return this.getOrThrow<ElasticsearchConfig>(ConfigKey.elasticsearch);
	}
}
