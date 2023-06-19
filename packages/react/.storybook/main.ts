import { StorybookConfig } from "@storybook/react-webpack5";

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
      from: "../../../node_modules/iframe-resizer/js",
      to: "iframe-resizer",
    },
  ],
  addons: ["@storybook/addon-essentials", "storybook-addon-jsx", "@storybook/addon-a11y"],
  stories: ["../src/**/*.stories.@(ts|tsx)"],
  previewHead: (head) => `
    ${head}
    <link rel="stylesheet" href="dso-toolkit/dist/dso.css">
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
    return config;
  },
  core: {
    disableTelemetry: true,
  },
  framework: {
    name: "@storybook/react-webpack5",
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
