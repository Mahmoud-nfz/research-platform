import { Type } from '@nestjs/common';
import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';
import { MetadataStorage } from './metadata.storage';

export class IndexFactory {
	static createForClass(target: Type<unknown>): IndicesCreateRequest {
		if (!target) {
			throw new Error(
				`Target class "${target}" passed in to the "TemplateFactory#createForClass()" method is "undefined".`
			);
		}

		return MetadataStorage.getIndexMetadataByTarget(target).arg;
	}
}
