import { dirname, join, parse, resolve } from "path";
import { StorybookConfig } from "@storybook/react-webpack5";
import { readdirSync } from "fs";

const config: StorybookConfig = {
  typescript: {
    check: true,
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
  addons: [
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("storybook-addon-jsx"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="dso-toolkit/dist/dso.css">
    <script src="iframe-resizer/child/index.umd.js"></script>
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
  framework: {
    name: getAbsolutePath("@storybook/react-webpack5"),
    options: {},
  },
  docs: {
    autodocs: true,
  },
  features: {
    storyStoreV7: false,
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}
