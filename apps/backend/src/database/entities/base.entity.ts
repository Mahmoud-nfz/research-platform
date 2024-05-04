import {
	CreateDateColumn,
	DeleteDateColumn,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from 'typeorm';

export abstract class Base {
	@PrimaryGeneratedColumn('uuid')
	id: string;
	@CreateDateColumn()
	createdAt: Date;
	@UpdateDateColumn()
	updatedAt: Date;
	@DeleteDateColumn()
	deletedAt: Date | null;

	constructor(values: Partial<Base>) {
		Object.assign(this, values);
	}
}
