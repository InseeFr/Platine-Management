import { routes } from "core/properties";

// Role in oidcUser i.e role in LDAP !
// ToDo : verify reel value
export const ACCESS_APP_ROLE_ADMIN = "coleman-admin";
export const ACCESS_APP_ROLE_USER = "coleman-user";
export const ACCESS_APP_ROLES = [ACCESS_APP_ROLE_ADMIN, ACCESS_APP_ROLE_USER];

// Role retrieved in getRole method : role in api database
// ToDo refactor
export const ADMIN_ROLE = "admin";
export const GESTIONNAIRE_ROLE = "gestionnaire";

export const canAccessToApp = (roles = []) =>
  ACCESS_APP_ROLES.reduce((canAccess, appRole) => {
    return canAccess || roles.includes(appRole);
  }, false);

export const canManageUser = (roles = []) => roles.includes(ADMIN_ROLE);

export const getRoutesForUser = roles =>
  routes.filter(({ id }) => {
    switch (id) {
      case "users":
        return canManageUser(roles);
      default:
        return true;
    }
  });
