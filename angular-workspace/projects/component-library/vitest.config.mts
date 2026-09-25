import { fileURLToPath } from "node:url";

import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    setupFiles: [fileURLToPath(new URL("./vitest-setup.ts", import.meta.url))],
  },
});
