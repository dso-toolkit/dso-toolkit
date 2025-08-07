/// <reference types="vite/client" />

interface ViteTypeOptions {
  strictImportMetaEnv: unknown;
}

interface ImportMetaEnv {
  readonly VITE_ICONS: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
