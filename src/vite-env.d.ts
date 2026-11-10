/// <reference types="vite/client" />

interface ImportMetaEnv {
  /** Absolute origin of the deployed site, used for canonical URLs and sitemap. */
  readonly VITE_SITE_URL?: string;
  /** HTTPS endpoint that accepts contact form POSTs. Leave unset to disable submits. */
  readonly VITE_CONTACT_ENDPOINT?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
