import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';
import { MetadataStorage } from './metadata.storage';

export function Property(arg: MappingProperty) {
	return (target: Record<string, any>, propertyKey: string | symbol): void => {
		MetadataStorage.addPropertyMetadata({
			target: target.constructor,
			propertyKey: propertyKey as string,
			arg,
		});
	};
}
