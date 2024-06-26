import { ConfigKey } from '@/config/config-key.enum';
import { validate } from '@/config/config.validator';
import { registerAs } from '@nestjs/config';
import { LogLevel } from '@/logger/logger.types';
import {
	IsBooleanString,
	IsEnum,
	IsOptional,
	IsPort,
	IsUrl,
} from 'class-validator';

export enum Environment {
	dev = 'development',
	prod = 'production',
	test = 'test',
}

export interface MiscConfig {
	environment: Environment;
	debug: boolean;
	level: LogLevel;
	port: number;
	allowedOrigines: {
		frontend: string;
	};
}

class EnvVariables {
	@IsEnum(Environment)
	@IsOptional()
	NODE_ENV?: Environment;
	@IsBooleanString()
	@IsOptional()
	DEBUG?: 'true' | 'false';
	@IsEnum(LogLevel)
	@IsOptional()
	LOG_LEVEL: LogLevel = LogLevel.trace;
	@IsOptional()
	@IsPort()
	PORT?: string;
	@IsUrl({ allow_underscores: true, require_tld: false })
	FRONTEND_URL: string;
}

export const miscConfig = registerAs(ConfigKey.misc, (): MiscConfig => {
	const envVariables = validate(EnvVariables);
	return {
		environment: envVariables.NODE_ENV ?? Environment.dev,
		debug:
			envVariables.DEBUG !== undefined
				? envVariables.DEBUG === 'true'
				: (envVariables.NODE_ENV ?? Environment.dev) === Environment.dev,
		level: envVariables.LOG_LEVEL,
		port: parseInt(envVariables.PORT ?? '3001'),
		allowedOrigines: {
			frontend: envVariables.DEBUG,
		},
	};
});
