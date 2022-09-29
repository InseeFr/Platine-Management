import { routes } from "core/properties";

export const ADMIN_ROLE = "admin";
export const GESTIONNAIRE_ROLE = "gestionnaire";

export const canManageUser = roles => roles.includes(ADMIN_ROLE);

export const getRoutesForUser = roles =>
  routes.filter(({ id }) => {
    switch (id) {
      case "users":
        return canManageUser(roles);
      default:
        return true;
    }
  });
