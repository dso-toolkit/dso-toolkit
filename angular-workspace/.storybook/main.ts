import { dirname, join } from "path";
import { StorybookConfig } from "@storybook/angular";

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
      from: "../../node_modules/iframe-resizer/js",
      to: "iframe-resizer",
    },
  ],
  stories: ["../components/*/*.stories.ts"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
      },
    },
    getAbsolutePath("@storybook/addon-links"),
    getAbsolutePath("@storybook/addon-essentials"),
    getAbsolutePath("@storybook/addon-interactions"),
    getAbsolutePath("@storybook/addon-a11y"),
  ],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="dso-toolkit/dist/dso.css">
    <script src="iframe-resizer/iframeResizer.contentWindow.js"></script>
  `,
  // Onderstaande method is uitgezet in #2241, gaan we verder onderzoeken in #2302
  // previewBody: (body) =>
  //   !process.env.CI
  //     ? `
  //       ${body}
  //       <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
  //     `
  //     : body,
  webpackFinal: async (config, { configType }) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== "ProgressPlugin");

    return config;
  },
  framework: {
    name: getAbsolutePath("@storybook/angular"),
    options: {},
  },
  core: {
    disableTelemetry: true,
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
