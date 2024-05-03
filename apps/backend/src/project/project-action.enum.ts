/**
 * Project permissions are discrete, that is having one action (e.g., write access)
 * does not imply having another action (e.g., read access).
 * It is the application's responsibility to manage the hierarchy of actions,
 * that is to automatically grant an action (e.g., read access) when granting another action of greater level (e.g., write access).
 * This constraint is in place to make access check easier (e.g., checking for read access only requires checking the read action).
 */
export enum ProjectAction {
	/**
	 * Grants unparalleled read access to all project data collections,
	 * even if a data collection was added after the user recieved this permission.
	 */
	read = 'project__read',
	/**
	 * This supposes the `read` permission.
	 * Grants unparalleled update access to all project data collections,
	 * even if a data collection was added after the user recieved this permission.
	 */
	update = 'project__update',
	/**
	 * This grants the permission to create new data collections within the project.
	 * The user who is granted this permission is considered the owner of the data collections created by him.
	 * He as well as the project owner have full control on data collections created by him (The user who is granted this permission).
	 */
	create = 'project__create',
	/**
	 * This supposes the `read`, `create` and `update` permissions.
	 * Grants the permission to grant and revoke from other users `read`, `create` and `update` permissions on a project.
	 */
	manage = 'project__manage',
}
