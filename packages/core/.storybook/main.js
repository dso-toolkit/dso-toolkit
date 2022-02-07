const { sep } = require('path');

module.exports = {
  features: {
    // https://github.com/storybookjs/storybook/blob/next/MIGRATION.md#deprecated-implicit-postcss-loader
    postcss: false
  },
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true
      }
    },
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html',
    '@storybook/addon-a11y'
  ],
  stories: [
    '../src/**/*.stories.ts'
  ],
  previewHead: head => process.env.DSO_ENV === 'development' || process.env.DSO_ENV === 'cypress' || process.env.DSO_ENV === 'leaflet' || process.env.DSO_ENV === 'react-leaflet' || process.env.DSO_ENV === 'production'
    ? (`
      ${head}
      <link rel="stylesheet" href="./dso-toolkit/dso-toolkit.css" />
      <script type="module" src="./dso-toolkit/dso-toolkit.esm.js"></script>
      <script nomodule src="./dso-toolkit/dso-toolkit.js"></script> <!-- This path doesn't exist with Stencil 2.3.0 -->
    `)
    // Todo: Research loading like below
    // <script type="module">
    //   import { defineCustomElements } from './esm/loader.js';
    //   defineCustomElements();
    // </script>
    : head,
  previewBody: body => process.env.DSO_ENV === 'development'
    ? (`
      ${body}
      <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
    `)
    : body,
  webpackFinal: async (config, { configType }) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');

    if (process.env.DSO_ENV === 'cypress') {
      config.entry = config.entry.filter(singleEntry => !singleEntry.includes(`${sep}webpack-hot-middleware${sep}`))
    }

    return config;
  }
};
