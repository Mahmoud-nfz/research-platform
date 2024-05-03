export abstract class Base {
	id: string;
	createdAt: Date;
	updatedAt: Date;
	deletedAt: Date;

	constructor(values: Partial<Base>) {
		Object.assign(this, values);
	}
}
