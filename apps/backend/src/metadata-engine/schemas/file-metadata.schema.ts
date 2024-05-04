import { File } from '@/database/entities';
import { Property } from '..';
import { Index } from '..';
import { MetadataIndex } from '../metadata-index.enum';

@Index({
	index: MetadataIndex.files,
	settings: {
		analysis: {
			tokenizer: {
				unix_path_hierarchy: {
					type: 'path_hierarchy',
					delimiter: '/',
				},
			},
			analyzer: {
				path: {
					type: 'custom',
					tokenizer: 'unix_path_hierarchy',
					filter: ['trim'],
				},
			},
		},
	},
})
export class FileMetadata implements Partial<File> {
	@Property({ type: 'keyword' })
	id: string;
	@Property({ type: 'text' })
	name: string;
	@Property({ type: 'keyword' })
	dataCollectionId: string;
	@Property({ type: 'keyword' })
	hash: string;
	@Property({ type: 'integer' })
	size: number;
	@Property({ type: 'text', analyzer: 'path' })
	path: string;

	constructor(file: File) {
		this.id = file.id;
		this.name = file.name;
		this.dataCollectionId = file.dataCollectionId;
		this.hash = file.hash;
		this.size = file.size;
		this.path = file.path;
	}
}
