import { fileURLToPath } from "node:url";

import { StorybookConfig } from "@storybook/web-components-vite";

// `dso-toolkit`'s package.json "exports" only exposes the build output (dist/, loader/,
// src/variables/*) as koppelvlak; `src/**/readme.md?raw` imports used by stories fall
// outside that map. Resolve them directly against the workspace source so Vite/TS can
// still load the readme's without widening the public package exports.
const dsoToolkitSrc = fileURLToPath(new URL("../../packages/dso-toolkit/src", import.meta.url));

const config: StorybookConfig = {
  typescript: { check: true },
  staticDirs: ["../assets"],
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  stories: ["../src/components/**/*.stories.ts", "../src/example-pages/**/*.stories.ts"],
  previewHead: (head) =>
    process.env.CI
      ? `
      ${head}
      <link
        rel="preload"
        href="/assets/fonts/Asap/Asap-Italic-VariableFont_wdth,wght.ttf"
        as="font"
        type="font/ttf"
        crossorigin
        data-dt-postbuild-href
      >
      <link
        rel="preload"
        href="/assets/fonts/Asap/Asap-VariableFont_wdth,wght.ttf"
        as="font"
        type="font/ttf"
        crossorigin
        data-dt-postbuild-href
      >
    `
      : head,
  // Onderstaande method is uitgezet in #2241, gaan we verder onderzoeken in #2302
  // previewBody: (body) =>
  //   !process.env.CI
  //     ? `
  //     ${body}
  //     <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
  //   `
  //     : body,
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      resolve: {
        alias: [
          // Keep this before any "dso-toolkit" catch-all alias so "dso-toolkit/dist/..."
          // and "dso-toolkit/loader/..." keep resolving via the package's own exports map.
          { find: /^dso-toolkit\/src\//, replacement: `${dsoToolkitSrc}/` },
        ],
      },
    });
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  framework: "@storybook/web-components-vite",
};

export default config;
