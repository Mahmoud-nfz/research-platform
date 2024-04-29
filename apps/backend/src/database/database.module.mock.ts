import { FactoryProvider, Global, Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseSnakeNamingStrategy } from './database-snake-naming.strategy';
import {
  PostgreSqlContainer,
  StartedPostgreSqlContainer,
} from '@testcontainers/postgresql';
import { BuisnessEntities } from './entities';
import { ProviderTokens } from '@/common/provider-tokens';

const MockDBContainerProvider: FactoryProvider = {
  provide: ProviderTokens.MOCK_DB_CONTAINER,
  useFactory: async () => {
    return new PostgreSqlContainer().start();
  },
};

@Global()
@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ProviderTokens.MOCK_DB_CONTAINER],
      useFactory: (postgresContainer: StartedPostgreSqlContainer) => {
        return {
          type: 'postgres',
          url: postgresContainer.getConnectionUri(),
          synchronize: true,
          autoLoadEntities: true,
          ssl: false,
          namingStrategy: new DatabaseSnakeNamingStrategy(),
          dropSchema: true,
        };
      },
    }),
    TypeOrmModule.forFeature(BuisnessEntities),
  ],
  controllers: [],
  providers: [MockDBContainerProvider],
  exports: [TypeOrmModule, MockDBContainerProvider],
})
export class DatabaseModuleMock {}
