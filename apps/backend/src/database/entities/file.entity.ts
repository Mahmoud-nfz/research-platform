import { Column, Entity, Index, ManyToOne, RelationId } from 'typeorm';
import { Base } from './base.entity';
import { DataCollection } from './data-collection.entity';

@Entity()
export class File extends Base {
	@Column({ type: 'varchar' })
	name: string;

	@ManyToOne(() => DataCollection, { nullable: false })
	dataCollection: DataCollection;

	@RelationId((file: File) => file.dataCollection)
	dataCollectionId: string;

	@Column({ type: 'int8', comment: 'size in bytes' })
	size: number;

	@Index()
	@Column({ type: 'varchar', unique: true })
	path: string;

	@Index()
	@Column({ type: 'varchar' })
	hash: string;

	@Column({ type: 'timestamptz', nullable: true })
	uploadedAt: Date | null;

	constructor(data: Partial<File>) {
		super(data);
		Object.assign(this, data);
	}
}
