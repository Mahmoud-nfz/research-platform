import { Type } from '@nestjs/common';
import { MetadataStorage } from './metadata.storage';
import {
	MappingProperty,
	MappingTypeMapping,
} from '@elastic/elasticsearch/lib/api/types';

export class PropertiesFactory {
	static createForClass(
		target: Type<unknown>
	): MappingTypeMapping['properties'] {
		if (!target) {
			throw new Error(
				`Target class "${target}" passed in to the "TemplateFactory#createForClass()" method is "undefined".`
			);
		}

		const properties = MetadataStorage.getPropertyMetadatasByTarget(target);

		return properties.reduce(
			(prev, curr) => ({
				...prev,
				[curr.propertyKey]: curr.arg,
			}),
			{} as Record<string, MappingProperty>
		);
	}
}
