import { StorybookConfig } from "@storybook/web-components-webpack5";
import { readdirSync } from "fs";
import { sep, resolve, dirname, parse, join } from "path";

function getVersion() {
  if (process.env.CI) {
    if (typeof process.env.TRAVIS_TAG === "string" && process.env.TRAVIS_TAG[0] === "v") {
      return process.env.TRAVIS_TAG.substring(1);
    }
    if (
      typeof process.env.TRAVIS_BRANCH === "string" &&
      (process.env.TRAVIS_BRANCH[0] === "#" || process.env.TRAVIS_BRANCH === "master")
    ) {
      return process.env.TRAVIS_BRANCH.replace(/#/, "_");
    }
  }

  return undefined;
}

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
      from: "../../packages/core/dist/dso-toolkit",
      to: "/core",
    },
    {
      from: "../../node_modules/iframe-resizer/js",
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
  refs: (config, { configType }) => {
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
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@whitespace/storybook-addon-html"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  stories: ["../src/components/**/*.{core-,css-,}stories.ts"],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="dso-toolkit/dist/dso.css">
    <script type="module" src="core/dso-toolkit.esm.js"></script>
    <script src="iframe-resizer/iframeResizer.contentWindow.min.js"></script>
  `,
  // Onderstaande method is uitgezet in #2241, gaan we verder onderzoeken in #2302
  // previewBody: (body) =>
  //   !process.env.CI
  //     ? `
  //     ${body}
  //     <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
  //   `
  //     : body,
  webpackFinal: async (config, { configType }) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin");

    return config;
  },
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: getAbsolutePath("@storybook/web-components-webpack5"),
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

function getAbsolutePath(value: string): any {
  return dirname(require.resolve(join(value, "package.json")));
}
