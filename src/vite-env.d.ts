/// <reference types="vite-envs/client" />
type ImportMetaEnv = {
  // Auto-generated by `npx vite-envs update-types` and hot-reloaded by the `vite-env` plugin
  VITE_API_ENDPOINT: string;
  VITE_AUTH_TYPE: string;
  VITE_OIDC_CLIENT_ID: string;
  VITE_OIDC_ISSUER: string;
  VITE_IDENTITY_PROVIDER: string;
  VITE_ADMIN_LDAP_ROLE: string;
  VITE_USER_LDAP_ROLE: string;
  VITE_APP_URL: string;
  BASE_URL: string;
  MODE: string;
  DEV: boolean;
  PROD: boolean;
  // @user-defined-start
  /*
   * Here you can define your own special variables
   * that would be available on `import.meta.env` but
   * that vite-envs does not know about.
   * This section will be preserved thanks to the special comments.
   * Example:
   */
  SSR: boolean;
  // @user-defined-end
};

interface ImportMeta {
  // Auto-generated by `npx vite-envs update-types`

  url: string;

  readonly hot?: import("vite-envs/types/hot").ViteHotContext;

  readonly env: ImportMetaEnv;

  glob: import("vite-envs/types/importGlob").ImportGlobFunction;
}

type ObjectKeys<T> = T extends object
  ? (keyof T)[]
  : T extends number
  ? []
  : T extends Array<any> | string
  ? string[]
  : never;

interface ObjectConstructor {
  keys<T>(o: T): ObjectKeys<T>;
}
