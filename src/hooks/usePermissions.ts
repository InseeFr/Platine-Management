import { useMaybeUser, useUser } from "./useAuth";

type User = ReturnType<typeof useUser>;
type PermissionRequirement = string[] | ((user: User) => boolean);

const permissions = {
  ACCESS_APP: [import.meta.env.VITE_ADMIN_LDAP_ROLE, import.meta.env.VITE_USER_LDAP_ROLE],
  ACCESS_SETTINGS: [import.meta.env.VITE_ADMIN_LDAP_ROLE],
  EDIT_PAGE: ["admin", "user"],
  READ_PAGE: ["user"],
  DELETE_SITE: (user: User) => user.preferred_username === "admin",
} satisfies Record<string, PermissionRequirement>;

export const useHasPermission = (permissionKey: keyof typeof permissions) => {
  const user = useMaybeUser();
  const permission = permissions[permissionKey];

  // For unknown permission, refuse access by default
  if (!permission || !user) {
    return false;
  }

  // User need to have a role that is within the requested permission array
  if (Array.isArray(permission)) {
    for (const role of permission) {
      if (user.inseegroupedefaut.includes(role)) {
        return true;
      }
    }
    return false;
  }

  // Permission is a function, use it to know if the user can do this action
  return permission(user);
};
