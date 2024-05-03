import { Subject } from '../subject.entity';
import { User } from '../users/user.entity';
import { ProjectAction } from './project-action.enum';

export class Project extends Subject {
	public static actions = ProjectAction;
	name: string;
	owner: User;
	ownerId: string;
	imageUrl: string;
	description: string;
	tags: string[];

	constructor(data: Partial<Project>) {
		super(data);
		Object.assign(this, data);
	}
}
