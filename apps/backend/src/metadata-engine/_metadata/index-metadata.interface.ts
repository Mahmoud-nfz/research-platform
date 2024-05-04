import { IndicesCreateRequest } from '@elastic/elasticsearch/lib/api/types';

export interface IndexMetadata {
	// eslint-disable-next-line @typescript-eslint/ban-types
	target: Function;
	arg: IndicesCreateRequest;
}
