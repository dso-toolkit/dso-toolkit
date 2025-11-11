// This file has been automatically migrated to valid ESM format by Storybook.
import { createRequire } from "node:module";
import { fileURLToPath } from "node:url";
import { readdirSync } from "fs";
import { dirname, parse, resolve } from "path";

import { StorybookConfig } from "@storybook/angular";

const require = createRequire(import.meta.url);

const config: StorybookConfig = {
  typescript: {
    check: true,
  },
  staticDirs: [
    "../../packages/dso-toolkit/storybook-assets",
    {
      from: "../../packages/dso-toolkit",
      to: "/dso-toolkit",
    },
    {
      from: "../../node_modules/@iframe-resizer",
      to: "iframe-resizer",
    },
  ],
  env: (config) => {
    const corePath = dirname(require.resolve("dso-toolkit/package.json"));
    const iconsPath = resolve(corePath, "src/icons");
    const icons = readdirSync(iconsPath)
      .map((f) => parse(f))
      .filter((p) => p.ext === ".svg")
      .map((p) => p.name);

    return {
      ...config,
      ICONS: icons.join(","),
    };
  },
  stories: ["../components/*/*.stories.ts"],
  addons: [
    {
      name: getAbsolutePath("@storybook/addon-docs"),
      options: {
        transcludeMarkdown: true,
      },
    },
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  // Onderstaande method is uitgezet in #2241, gaan we verder onderzoeken in #2302
  // previewBody: (body) =>
  //   !process.env.CI
  //     ? `
  //       ${body}
  //       <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
  //     `
  //     : body,
  webpackFinal: async (config) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin");

    return config;
  },
  framework: getAbsolutePath("@storybook/angular"),
  core: {
    disableTelemetry: true,
  },
};

export default config;

function getAbsolutePath(value: string): any {
  return dirname(fileURLToPath(import.meta.resolve(`${value}/package.json`)));
}
