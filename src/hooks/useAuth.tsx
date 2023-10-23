import { createContext, type PropsWithChildren, useState, useContext } from "react";
import { useAsyncEffect } from "./useAsyncEffect";
import {
  getKeycloakConfiguration,
  getAppConfiguration,
  createKeycloakOidcClient,
} from "../functions/keycloak";

type ContextValue = {
  username: string | null;
  roles: string[];
};

const initialValue = { username: null, roles: [] };

const AuthContext = createContext<ContextValue>(initialValue);

type Props = PropsWithChildren<{
  authTypeb: "oidc" | "anonymous";
}>;

const anonymousUser = {
  username: "Guest",
  roles: [],
};

export function AuthProvider({ authTypeb, children }: Props) {
  const [authType, setAuthType] = useState<Props["authTypeb"] | null>(null);
  const [user, setUser] = useState<ContextValue>(initialValue);
  useAsyncEffect(async () => {
    if (authType !== "oidc") {
      return;
    }
    const configuration = await getKeycloakConfiguration();
    const client = await createKeycloakOidcClient({
      url: configuration["auth-server-url"],
      realm: configuration["realm"],
      clientId: configuration["resource"],
    });
    if (!client.isUserLoggedIn) {
      await client.login();
    }
    if (!client.isUserLoggedIn) {
      throw new Error("User should be authentified after one login attempt");
    }
    setUser({
      username: client.oidcUser.preferred_username,
      roles: client.oidcUser.inseegroupedefaut,
    });
  }, [authType]);

  useAsyncEffect(async () => {
    // Charger via le JSON le type de configuration à faire
    const configuration = await getAppConfiguration();
    setAuthType(configuration.authType === "oidc" ? "oidc" : "anonymous");
  }, []);

  return (
    <AuthContext.Provider value={authType === "anonymous" ? anonymousUser : user}>
      {children}
    </AuthContext.Provider>
  );
}

export const useIsAuthenticated = (): boolean => {
  return useContext(AuthContext).username !== null;
};

export const useHasRole = (role: string): boolean => {
  const value = useContext(AuthContext);
  return value.roles.includes(role);
};

export const useAuth = (): { username: string; roles: string[] } => {
  const value = useContext(AuthContext);
  if (value.username === null) {
    throw new Error("useAuth hook should not be called on unauthenticated components");
  }
  return {
    username: value.username,
    roles: value.roles,
  };
};
