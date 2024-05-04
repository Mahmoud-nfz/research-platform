import { Base } from '../base.entity';
import { DataCollection } from '../data-collections/data-collection.entity';

export class File extends Base {
	name: string;
	dataCollection: DataCollection;
	dataCollectionId: string;
	size: number;
	path: string;
	hash: string;
	uploadedAt: Date | null;

	constructor(data: Partial<File>) {
		super(data);
		Object.assign(this, data);
	}
}
