import { ROLE_PERMISSIONS } from "../common/constants/rolePermissions.js";

const allowPermissions =
  (...requiredPermissions) =>
  (req, res, next) => {
    const role = req.user.role;

    const permissions = ROLE_PERMISSIONS[role] || [];

    const hasPermission = requiredPermissions.every((permission) =>
      permissions.includes(permission),
    );

    if (!hasPermission) {
      return res.status(403).json({
        success: false,
        message: "Permission denied",
      });
    }

    next();
  };

export default allowPermissions;
