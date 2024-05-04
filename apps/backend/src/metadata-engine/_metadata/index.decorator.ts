import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';
import { MetadataStorage } from './metadata.storage';
import { Type } from '@nestjs/common';

export function Index(arg: IndicesCreateRequest) {
	return (target: Type<unknown>): void => {
		MetadataStorage.addIndexMetadata({
			target,
			arg,
		});
	};
}
