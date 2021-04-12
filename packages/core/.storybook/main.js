module.exports = {
  stories: [
    '../src/**/*.stories.ts'
  ],
  addons: [
    {
      name: '@storybook/addon-docs',
      options: {
        transcludeMarkdown: true
      }
    },
    '@storybook/addon-essentials',
    '@whitespace/storybook-addon-html'
  ]
}
