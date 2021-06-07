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
  previewHead: head => process.env.DSO_ENV === 'development' || process.env.DSO_ENV === 'cypress' // Todo: 'production'
    ? (`
      ${head}
      <link rel="stylesheet" href="./dso.css" />
    `)
    : head,
  webpackFinal: async (config, { configType }) => {
    // Remove annoying webpack build progress spamming the console. This only goes for build progress: everything else is still logged
    config.plugins = config.plugins.filter(({ constructor }) => constructor.name !== 'ProgressPlugin');

    // if (process.env.DSO_ENV === 'cypress') {
    //   config.entry = config.entry.filter(singleEntry => !singleEntry.includes(`${sep}webpack-hot-middleware${sep}`))
    // }

    return config;
  }
};
