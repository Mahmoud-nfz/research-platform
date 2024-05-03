import { Column, Entity, Index, ManyToOne, RelationId } from 'typeorm';
import { User } from './user.entity';
import { Base } from './base.entity';

@Entity()
@Index(['user', 'subjectId', 'action'], { unique: true })
export class Permission extends Base {
	@Column({ type: 'varchar' })
	action: string;

	@Column({ type: 'uuid' })
	subjectId: string;

	@Index()
	@ManyToOne(() => User, { nullable: false })
	user: User;

	@RelationId((permission: Permission) => permission.user)
	userId: string;

	constructor(data: Partial<Permission>) {
		super(data);
		Object.assign(this, data);
	}
}
