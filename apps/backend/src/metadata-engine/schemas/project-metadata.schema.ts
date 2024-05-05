import { Project } from '@/database/entities';
import { Property } from '..';
import { Index } from '..';
import { MetadataIndex } from '../metadata-index.enum';

@Index({
	index: MetadataIndex.projects,
})
export class ProjectMetadata implements Partial<Project> {
	@Property({ type: 'keyword' })
	id: string;
	@Property({ type: 'text' })
	name: string;
	@Property({ type: 'keyword' })
	ownerId: string;
	@Property({ type: 'keyword' })
	tags: string[];
	@Property({ type: 'text' })
	description: string;
	@Property({ type: 'keyword' })
	imageUrl: string;

	constructor(project: Project) {
		this.id = project.id;
		this.ownerId = project.ownerId;
		this.tags = project.tags;
		this.description = project.description;
		this.imageUrl = project.imageUrl;
	}
}
