/**
 * Data collection permissions are discrete, that is having one action (e.g., write access)
 * does not imply having another action (e.g., read access).
 * It is the application's responsibility to manage the hierarchy of actions,
 * that is to automatically grant an action (e.g., read access) when granting another action of greater level (e.g., write access).
 * This constraint is in place to make access check easier (e.g., checking for read access only requires checking the read action).
 */
export enum DataCollectionAction {
  /**
   * Grants read access to a data collection.
   */
  read = 'data_collection__read',
  /**
   * This supposes the `read` permission.
   * Grants update access to a data collection.
   */
  update = 'data_collection__update',
  /**
   * This supposes the `read`, `create` and `update` permissions.
   * Grants the permission to grant and revoke from other users `read`, `create` and `update` permissions on a data collection.
   */
  manage = 'data_collection__manage',
}
