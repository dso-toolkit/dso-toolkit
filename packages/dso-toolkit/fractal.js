/* eslint-env node */

const path = require('path');

const fractal = module.exports = require('@frctl/fractal').create();
const collator = require('./fractal/collator.js');

const nunjucksFilters = require('./fractal/nunjucks/filters.js');
const shoppingCartFilters = require('./components/Componenten/shopping-cart/shopping-cart.filters');
const nunjucksGlobals = require('./fractal/nunjucks/globals.js');
const nunjucksExtensions = require('./fractal/nunjucks/extensions.js');

fractal.web.set('builder.dest', __dirname + '/build/library');

fractal.set('project.title', 'DSO Toolkit | Component Library');

const nunj = require("@frctl/nunjucks")({
  env: {
    // Nunjucks environment opts: https://mozilla.github.io/nunjucks/api.html#configure
  },
  filters: {
    ...nunjucksFilters,
    ...shoppingCartFilters
  },
  globals: {
    ...nunjucksGlobals
  },
  extensions: {
    ...nunjucksExtensions(fractal)
  }
});

fractal.components.engine(nunj);
fractal.components.set('ext', '.njk');
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.status', 'wip');
fractal.components.set('default.collator', collator.defaultCollator);
fractal.components.set('default.collated', 'true');
fractal.components.set('label', 'Componenten');

fractal.docs.engine(nunj);
fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.docs.set('label', 'Documentatie');

fractal.web.set('static.path', path.join(__dirname, 'build/toolkit'));
fractal.web.set('server.syncOptions', {
  files: ['build/toolkit/**/*', 'theme/dist/**/*'],
  notify: false
});

const theme = require('./theme')({
  favicon: '/theme/favicon.ico',
  nav: ['docs', 'components'],
  format: 'yaml',
  panels: ['notes', 'component', 'html', 'view', 'context'], // Todo: 'info'
  styles: [
    '/styles/dso.css',
    '/_highlight.js_styles/github.css'
  ],
  scripts: [
    'default'
  ],
  lang: 'nl'
});

theme.addStatic(path.dirname(require.resolve('highlight.js/styles/github.css')), '_highlight.js_styles');

// Add @dso-toolkit/core, only works after running `yarn workspace @dso-toolkit/core build`
// This is not the right way to include this, because require.resolve() follows the "main"
// property. It just happens to work because we're getting path.dirname() from it and taking
// it from there.
theme.addStatic(path.dirname(require.resolve('@dso-toolkit/core')), '@dso-toolkit_core');

fractal.web.theme(theme);
