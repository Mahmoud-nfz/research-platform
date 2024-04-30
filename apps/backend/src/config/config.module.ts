import { ConfigService } from '@/config/config.service';
import * as configs from '@/config/configs';
import { DynamicModule, Global, Module } from '@nestjs/common';
import {
  ConfigModule as ConfigurationModule,
  ConfigModuleOptions,
} from '@nestjs/config';

@Global()
@Module({})
export class ConfigModule extends ConfigurationModule {
  static override forRoot(options?: ConfigModuleOptions): DynamicModule {
    const defaultModule = super.forRoot({
      envFilePath: [
        '.env.local',
        '.env',
        '.env.production.local',
        '.env.production',
        '.env.test.local',
        '.env.test',
        '.env.development.local',
        '.env.development',
      ],
      load: Object.keys(configs)
        .filter((key) => typeof configs[key] === 'function')
        .map((key) => configs[key]),
      expandVariables: true,
      isGlobal: true,
      cache: true,
      ...options,
    });

    return {
      ...defaultModule,
      module: ConfigModule,
      imports: [...(defaultModule.imports || [])],
      providers: [ConfigService, ...(defaultModule.providers || [])],
      exports: [ConfigService],
      global: true,
    };
  }
}
