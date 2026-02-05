import type { StorybookConfig } from "@storybook/angular";

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
  stories: ["../components/*/*.stories.ts"],
  addons: [
    {
      name: "@storybook/addon-docs",
      options: {
        transcludeMarkdown: true,
      },
    },
    "@storybook/addon-a11y",
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
  framework: "@storybook/angular",
  core: {
    disableTelemetry: true,
  },
};

export default config;
