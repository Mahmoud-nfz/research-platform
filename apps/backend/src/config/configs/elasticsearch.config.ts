import { ConfigKey } from '@/config/config-key.enum';
import { validate } from '@/config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export interface ElasticsearchConfig {
	node: string;
	auth: {
		username: string;
		password: string;
	};
}

class EnvVariables {
	@IsUrl({ require_tld: false, allow_underscores: true })
	ELASTICSEARCH_NODE: string;
	@IsString()
	@IsNotEmpty()
	ELASTICSEARCH_USERNAME: string;
	@IsString()
	@IsNotEmpty()
	ELASTICSEARCH_PASSWORD: string;
}

export const elasticsearchConfig = registerAs(
	ConfigKey.elasticsearch,
	(): ElasticsearchConfig => {
		const envVariables = validate(EnvVariables);
		return {
			node: envVariables.ELASTICSEARCH_NODE,
			auth: {
				username: envVariables.ELASTICSEARCH_USERNAME,
				password: envVariables.ELASTICSEARCH_PASSWORD,
			},
		};
	}
);
