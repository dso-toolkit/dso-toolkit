/* eslint-env node */

const path = require('path');

const fractal = module.exports = require('@frctl/fractal').create();
const collator = require('./.fractal/collator.js');

const nunjucksFilters = require('./nunjucks/filters.js');
const nunjucksGlobals = require('./nunjucks/globals.js');
const nunjucksExtensions = require('./nunjucks/extensions.js');

fractal.web.set('builder.dest', __dirname + '/build/library');

fractal.set('project.title', 'DSO Toolkit | Component Library');

const nunj = require("@frctl/nunjucks")({
  env: {
    // Nunjucks environment opts: https://mozilla.github.io/nunjucks/api.html#configure
  },
  filters: {
    ...nunjucksFilters
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
fractal.components.set('label', 'Componenten');

fractal.docs.engine(nunj);
fractal.docs.set('path', path.join(__dirname, 'docs'));
fractal.docs.set('label', 'Documentatie');

fractal.web.set('static.path', path.join(__dirname, 'build/toolkit'));
fractal.web.set('server.syncOptions', {
  files: ['build/toolkit/**/*'],
  notify: false
});

const theme = require('@frctl/mandelbrot')({
  favicon: '/_assets/images/favicon.ico',
  nav: ['docs', 'components'],
  format: 'yaml',
  styles: [
    // 'default',
    // '/_statics/custom-mandelbrot-stylesheet.css',
    '/styles/dso.css'
  ],
  scripts: [
    'default',
    '/dso-toolkit-scripts.js'
  ],
  lang: 'nl'
});

theme.addLoadPath(__dirname + '/.fractal/theme-overrides');
theme.addStatic(__dirname + '/.fractal/statics', '_statics');
theme.addStatic(__dirname + '/assets', '_assets');

fractal.web.theme(theme);