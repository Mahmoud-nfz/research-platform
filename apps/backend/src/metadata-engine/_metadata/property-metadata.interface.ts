import { MappingProperty } from '@elastic/elasticsearch/lib/api/types';

export interface PropertyMetadata {
	// eslint-disable-next-line @typescript-eslint/ban-types
	target: Function;
	propertyKey: string;
	arg: MappingProperty;
}
