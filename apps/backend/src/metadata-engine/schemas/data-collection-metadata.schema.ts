import { DataCollection } from '@/database/entities';
import { Property } from '..';
import { Index } from '..';
import { MetadataIndex } from '../metadata-index.enum';

@Index({
	index: MetadataIndex.data_collections,
})
export class DataCollectionMetadata implements Partial<DataCollection> {
	@Property({ type: 'keyword' })
	id: string;
	@Property({ type: 'text' })
	name: string;
	@Property({ type: 'keyword' })
	ownerId: string;
	@Property({ type: 'keyword' })
	projectId: string;
	@Property({ type: 'keyword' })
	tags: string[];
	@Property({ type: 'text' })
	description: string;
	@Property({ type: 'keyword' })
	imageUrl: string;

	constructor(dataCollection: DataCollection) {
		this.id = dataCollection.id;
		this.name = dataCollection.name;
		this.ownerId = dataCollection.ownerId;
		this.projectId = dataCollection.projectId;
		this.tags = dataCollection.tags;
		this.description = dataCollection.description;
		this.imageUrl = dataCollection.imageUrl;
	}
}
