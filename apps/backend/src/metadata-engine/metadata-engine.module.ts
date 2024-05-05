import { ConfigService } from '@/config';
import { Global, Module, OnApplicationBootstrap } from '@nestjs/common';
import {
	ElasticsearchModule,
	ElasticsearchService,
} from '@nestjs/elasticsearch';
import { IndexFactory, PropertiesFactory } from './_metadata';
import * as metadataSchemas from './schemas';

@Global()
@Module({
	imports: [
		ElasticsearchModule.registerAsync({
			inject: [ConfigService],
			useFactory: (configService: ConfigService) => {
				const elasticsearchConfig = configService.getElasticsearchConfig();
				return {
					...elasticsearchConfig,
				};
			},
		}),
	],
	exports: [ElasticsearchModule],
})
export class MetadataEngineModule implements OnApplicationBootstrap {
	constructor(private readonly elasticsearchService: ElasticsearchService) {}

	async onApplicationBootstrap() {
		// ensure that mappings are created at startup
		Object.values(metadataSchemas).forEach((SchemaMetadata) => {
			const indexMetadata = IndexFactory.createForClass(SchemaMetadata);
			this.elasticsearchService.indices
				.exists({ index: indexMetadata.index })
				.then((exists) => {
					if (exists) return;
					this.elasticsearchService.indices.create({
						...indexMetadata,
						mappings: {
							properties: PropertiesFactory.createForClass(SchemaMetadata),
							...(indexMetadata.mappings?.properties ?? {}),
						},
					});
				});
		});
	}
}
