import type { StorybookConfig } from "@storybook/web-components-vite";

function getVersion() {
  if (process.env.CI && process.env.DT_REF) {
    return process.env.DT_REF;
  }
  return undefined;
}

const config: StorybookConfig = {
  typescript: { check: true },
  staticDirs: ["../../packages/dso-toolkit/storybook-assets"],
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
  previewHead: (head) =>
    process.env.CI
      ? `
      ${head}
      <link
        rel="preload"
        href="/assets/fonts/Asap/Asap-Italic-VariableFont_wdth,wght.ttf"
        as="font"
        type="font/ttf"
        crossorigin
        data-dt-postbuild-href
      >
      <link
        rel="preload"
        href="/assets/fonts/Asap/Asap-VariableFont_wdth,wght.ttf"
        as="font"
        type="font/ttf"
        crossorigin
        data-dt-postbuild-href
      >
      <link
        rel="preload"
        href="/assets/di.svg"
        as="image"
        type="image/svg+xml"
        data-dt-postbuild-href
      >
    `
      : head,
  // Onderstaande method is uitgezet in #2241, gaan we verder onderzoeken in #2302
  // previewBody: (body) =>
  //   !process.env.CI
  //     ? `
  //     ${body}
  //     <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
  //   `
  //     : body,
  async viteFinal(config) {
    // Merge custom configuration into the default config
    const { mergeConfig } = await import("vite");

    return mergeConfig(config, {
      // Add dependencies to pre-optimization
    });
  },
  core: {
    builder: "@storybook/builder-vite",
    disableTelemetry: true,
  },
  framework: "@storybook/web-components-vite",
};

export default config;
