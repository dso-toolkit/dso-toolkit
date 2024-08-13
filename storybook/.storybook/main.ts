import { StorybookConfig } from "@storybook/web-components-webpack5";
import { readdirSync } from "fs";
import { resolve, dirname, parse, join } from "path";

// Niet op `true` inchecken (#2316)
const testStoryStoryV7 = false;

function getVersion() {
  if (process.env.CI && process.env.DT_REF) {
    return process.env.DT_REF;
  }

  return undefined;
}

const config: StorybookConfig = {
  experimental_indexers: (existingIndexers) => {
    if (!testStoryStoryV7) {
      return existingIndexers;
    }

    return existingIndexers.map((indexer) => {
      const test = indexer.test.toString();

      if (test.endsWith(`(m?js|ts)x?$/${indexer.test.flags}`)) {
        return {
          ...indexer,
          test: /\.(core\-stories|css\-stories)\.(ts)x?$/,
        };
      }

      return indexer;
    });
  },
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
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@whitespace/storybook-addon-html"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  stories: testStoryStoryV7
    ? ["../src/components/**/*.{core-,css-}stories.ts"]
    : ["../src/components/**/*.{core-,css-,}stories.ts", "../src/example-pages/**/*.ts"],
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
  webpackFinal: async (config) => {
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
    storyStoreV7: testStoryStoryV7,
  },
};

export default config;

function getAbsolutePath(value: string): string {
  return dirname(require.resolve(join(value, "package.json")));
}
