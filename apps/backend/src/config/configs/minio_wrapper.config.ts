import { IsVercelMs } from '@/common';
import { ConfigKey } from '@/config/config-key.enum';
import { validate } from '@/config/config.validator';
import { registerAs } from '@nestjs/config';
import { IsNotEmpty, IsOptional, IsString, IsUrl } from 'class-validator';

export interface MinioWrapperConfig {
	httpUrl: string;
	wsUrl: string;
	apiKey: string;
	jwt: {
		secret: string;
		maximumAge: string;
	};
}

class EnvVariables {
	@IsUrl({
		require_tld: false,
		allow_underscores: true,
		protocols: ['ws', 'wss'],
	})
	MINIO_WRAPPER_WS_URL: string;
	@IsUrl({
		require_tld: false,
		allow_underscores: true,
		protocols: ['http', 'https'],
	})
	MINIO_WRAPPER_HTTP_URL: string;
	@IsString()
	@IsNotEmpty()
	MINIO_WRAPPER_JWT_SECRET: string;
	@IsVercelMs()
	@IsOptional()
	MINIO_WRAPPER_JWT_MAXIMUM_AGE?: string;
	@IsString()
	@IsNotEmpty()
	MINIO_WRAPPER_API_KEY: string;
}

export const minioWrapperConfig = registerAs(
	ConfigKey.minio_wrapper,
	(): MinioWrapperConfig => {
		const envVariables = validate(EnvVariables);
		return {
			wsUrl: envVariables.MINIO_WRAPPER_WS_URL,
			httpUrl: envVariables.MINIO_WRAPPER_HTTP_URL,
			jwt: {
				secret: envVariables.MINIO_WRAPPER_JWT_SECRET,
				maximumAge: envVariables.MINIO_WRAPPER_JWT_MAXIMUM_AGE,
			},
			apiKey: envVariables.MINIO_WRAPPER_API_KEY,
		};
	}
);
