/* eslint-env node */

const path = require('path');

const fractal = module.exports = require('@frctl/fractal').create();
const helpers = require('./.fractal/helpers.js')(fractal);
const collator = require('./.fractal/collator.js');

fractal.web.set('builder.dest', __dirname + '/build/library');

fractal.set('project.title', 'DSO Component Library');

const hbs = require('@frctl/handlebars')({
  helpers
});

fractal.components.engine(hbs);
fractal.components.set('path', path.join(__dirname, 'components'));
fractal.components.set('default.status', 'wip');
fractal.components.set('default.collator', collator.defaultCollator);

fractal.docs.engine(hbs);
fractal.docs.set('path', path.join(__dirname, 'docs'));

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
    'default',
    '/_statics/custom-mandelbrot-stylesheet.css'
  ]
});

theme.addLoadPath(__dirname + '/.fractal/theme-overrides');
theme.addStatic(__dirname + '/.fractal/statics', '_statics');
theme.addStatic(__dirname + '/assets', '_assets');

fractal.web.theme(theme);
