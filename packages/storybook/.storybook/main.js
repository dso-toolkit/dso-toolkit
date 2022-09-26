const { sep } = require('path');

module.exports = {
  staticDirs: [
    '../../sources/storybook-assets',
    '../../css/dist',
    { from: '../../core/dist', to: '/core' }
  ],
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
  previewHead: head => (`
    ${head}
    <link rel="stylesheet" href="dso.css">
    <script type="module" src="core/dso-toolkit/dso-toolkit.esm.js"></script>
  `),
  previewBody: body => process.env.DSO_ENV === 'development'
    ? (`
      ${body}
      <iframe title="Stencil Dev Server Connector ⚡" src="/~dev-server" style="display:block;width:0;height:0;border:0;visibility:hidden" aria-hidden="true"></iframe>
    `)
    : body,
  webpackFinal: async (config, { configType }) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');

    if (process.env.DSO_ENV === 'development') {
      config.entry = config.entry.filter(singleEntry => !singleEntry.includes(`${sep}webpack-hot-middleware${sep}`))
    }

    return config;
  },
  core: {
    builder: "webpack5"
  }
};
