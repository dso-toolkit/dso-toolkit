const { readdirSync } = require("fs");
const { sep, resolve, dirname, parse } = require("path");

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

module.exports = {
  staticDirs: [
    "../../packages/dso-toolkit/storybook-assets",
    { from: "../../packages/dso-toolkit", to: "/dso-toolkit" },
    { from: "../../packages/core/dist/dso-toolkit", to: "/core" },
    { from: "../../node_modules/iframe-resizer/js", to: "iframe-resizer" },
  ],
  features: {
    // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
    postcss: false,
  },
  env: (config) => {
    const corePath = dirname(require.resolve("dso-toolkit/package.json"));
    const iconsPath = resolve(corePath, "src/icons");
    const icons = readdirSync(iconsPath)
      .map((f) => parse(f))
      .filter((p) => p.ext === ".svg")
      .map((p) => p.name);

    return { ...config, ICONS: icons.join(",") };
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
  },
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-essentials",
    "@whitespace/storybook-addon-html",
    "@storybook/addon-a11y",
  ],
  stories: ["../src/components/**/*.stories.ts", "../src/example-pages/**/*.ts"],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="dso-toolkit/dist/dso.css">
    <script type="module" src="core/dso-toolkit.esm.js"></script>
    <script src="iframe-resizer/iframeResizer.contentWindow.min.js"></script>
  `,
  previewBody: (body) =>
    !process.env.CI
      ? `
      ${body}
      <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
    `
      : body,
  webpackFinal: async (config, { configType }) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin");

    if (!process.env.CI) {
      config.entry = config.entry.filter((singleEntry) => !singleEntry.includes(`${sep}webpack-hot-middleware${sep}`));
    }

    return config;
  },
  core: {
    builder: "webpack5",
    disableTelemetry: true,
  },
};
