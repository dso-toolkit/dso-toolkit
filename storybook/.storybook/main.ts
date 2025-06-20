import { readdirSync } from "fs";
import { dirname, parse, resolve } from "path";

import { StorybookConfig } from "@storybook/web-components-webpack5";

function getVersion() {
  if (process.env.CI && process.env.DT_REF) {
    return process.env.DT_REF;
  }

  return undefined;
}

const config: StorybookConfig = {
  typescript: {
    check: true,
  },
  staticDirs: ["../../packages/dso-toolkit/storybook-assets"],
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
  addons: [
    "@storybook/addon-essentials",
    "@whitespace/storybook-addon-html",
    "@storybook/addon-a11y",
    "@storybook/addon-webpack5-compiler-babel",
  ],
  stories: ["../src/components/**/*.{core-,css-}stories.ts", "../src/example-pages/**/*.stories.ts"],
  previewHead: (head) => `
    ${head}
    <link
      rel="preload"
      href="/static/packages/dso-toolkit/assets/fonts/Asap/Asap-Italic-VariableFont_wdth,wght.ttf"
      as="font"
      type="font/ttf"
      crossorigin
      data-dt-postbuild-href
    >
    <link
      rel="preload"
      href="/static/packages/dso-toolkit/assets/fonts/Asap/Asap-VariableFont_wdth,wght.ttf"
      as="font"
      type="font/ttf"
      crossorigin
      data-dt-postbuild-href
    >
    <link
      rel="preload"
      href="/static/packages/dso-toolkit/dist/di.svg"
      as="image"
      type="image/svg+xml"
      data-dt-postbuild-href
    >
  `,
  // Onderstaande method is uitgezet in #2241, gaan we verder onderzoeken in #2302
  // previewBody: (body) =>
  //   !process.env.CI
  //     ? `
  //     ${body}
  //     <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
  //   `
  //     : body,
  webpackFinal: async (config) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin");

    return config;
  },
  core: {
    disableTelemetry: true,
  },
  framework: "@storybook/web-components-webpack5",
};

export default config;
