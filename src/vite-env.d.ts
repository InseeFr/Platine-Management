/// <reference types="vite/client" />
interface ImportMetaEnv {
  readonly VITE_API_ENDPOINT: string;
  readonly VITE_AUTH_TYPE: string;
  readonly VITE_OIDC_CLIENT_ID: string;
  readonly VITE_OIDC_ISSUER: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
