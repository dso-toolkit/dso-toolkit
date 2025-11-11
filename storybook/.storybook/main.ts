import { readdirSync } from "fs";
import { fileURLToPath } from "node:url";
import { dirname, parse, resolve } from "path";

import { StorybookConfig } from "@storybook/web-components-vite";

function getVersion() {
  if (process.env.CI && process.env.DT_REF) {
    return process.env.DT_REF;
  }
  return undefined;
}

const config: StorybookConfig = {
  typescript: { check: true },
  staticDirs: ["../../packages/dso-toolkit/storybook-assets"],
  env: (config) => {
    const corePath = dirname(fileURLToPath(new URL("../../node_modules/dso-toolkit/package.json", import.meta.url)));
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
  refs: (_config, { configType }) => {
    if (configType === "PRODUCTION") {
      return {
        angular: {
          title: "Angular",
          url: `//storybook.dso-toolkit.nl/!angular/${getVersion() ?? "master"}`,
        },
        react: {
          title: "React",
          url: `//storybook.dso-toolkit.nl/!react/${getVersion() ?? "master"}`,
        },
      };
    }
    return {};
  },
  addons: ["@storybook/addon-a11y", "@storybook/addon-docs"],
  stories: ["../src/components/**/*.{core-,css-}stories.ts", "../src/example-pages/**/*.stories.ts"],
  core: {
    builder: "@storybook/builder-vite", // ✅ geen pad
    disableTelemetry: true,
  },
  framework: "@storybook/web-components-vite", // ✅ geen pad
};

export default config;
