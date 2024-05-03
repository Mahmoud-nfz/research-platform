import { Project } from '../projects/project.entity';
import { Subject } from '../subject.entity';
import { User } from '../users/user.entity';

export class DataCollection extends Subject {
	name: string;
	owner: User;
	ownerId: string;
	project: Project;
	projectId: string;
	imageUrl: string;
	description: string;
	tags: string[];

	constructor(data: Partial<DataCollection>) {
		super(data);
		Object.assign(this, data);
	}
}
