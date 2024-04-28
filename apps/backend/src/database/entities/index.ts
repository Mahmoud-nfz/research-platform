import { DataCollection } from './data-collection.entity';
import { Permission } from './permission.entity';
import { Project } from './project.entity';
import { User } from './user.entity';

export * from './base.entity';
export * from './data-collection.entity';
export * from './permission.entity';
export * from './project.entity';
export * from './subject.entity';
export * from './user.entity';

export const BuisnessEntities = [User, DataCollection, Permission, Project];
