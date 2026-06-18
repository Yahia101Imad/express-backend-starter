import { ROLES } from "./roles.js";
import { PERMISSIONS } from "./permissions.js";

export const ROLE_PERMISSIONS = {
  [ROLES.ADMIN]: [
    PERMISSIONS.USER_READ,
    PERMISSIONS.USER_CREATE,
    PERMISSIONS.USER_UPDATE,
    PERMISSIONS.USER_DELETE,
    PERMISSIONS.DASHBOARD_VIEW,
  ],

  [ROLES.USER]: [],
};
