export abstract class Base {
  id: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date;

  constructor(values: Partial<Base>) {
    Object.assign(this, values);
  }
}

export enum UserStatus {
  active = 0,
  pending_email_activation = 1,
}

export class User extends Base {
  firstName: string;
  lastName: string;
  email: string;
  status: UserStatus;
  refreshToken?: string;
  accessToken?: string;

  constructor(values: Partial<User>) {
    super(values);
    Object.assign(this, values);
  }
}

export class Subject extends Base {
  public static actions: Record<string, string>;
}

export enum ProjectAction {
  read = 'project__read',
  update = 'project__update',
  create = 'project__create',
  manage = 'project__manage',
}

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
