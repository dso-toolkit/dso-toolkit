// This file has been automatically migrated to valid ESM format by Storybook.
import { readdirSync } from "fs";
import { createRequire } from "node:module";
import { dirname, parse, resolve } from "path";

import type { StorybookConfig } from "@storybook/react-vite";

const requireFn = createRequire(import.meta.url);

const config: StorybookConfig = {
  typescript: {
    check: true,
    reactDocgen: false,
  },
  staticDirs: [
    "../../dso-toolkit/storybook-assets",
    {
      from: "../../dso-toolkit",
      to: "/dso-toolkit",
    },
    {
      from: "../../../node_modules/@iframe-resizer",
      to: "iframe-resizer",
    },
  ],
  env: (config) => {
    const corePath = dirname(requireFn.resolve("dso-toolkit/package.json"));
    const iconsPath = resolve(corePath, "src/icons");
    const icons = readdirSync(iconsPath)
      .map((f) => parse(f))
      .filter((p) => p.ext === ".svg")
      .map((p) => p.name);

    return {
      ...config,
      VITE_ICONS: icons.join(","),
    };
  },
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  stories: ["../src/**/*.stories.tsx"],
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
      esbuild: {
        // Preserve function/class names for Storybook source code display
        // Without this, React.ForwardRef shows instead of actual component names
        keepNames: true,
      },
    });
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  framework: "@storybook/react-vite",
};

export default config;
