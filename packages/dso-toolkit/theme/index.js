'use strict';

const cheerio = require('cheerio');
const prettier = require('prettier');
const Path = require('path');
const _ = require('lodash');
const Theme = require('@frctl/fractal').WebTheme;

const { renderToString } = require('../hydrate');

module.exports = function (options) {

  const config = _.defaultsDeep(_.clone(options || {}), {
    skin: 'default',
    rtl: false,
    lang: 'en',
    styles: 'default',
    scripts: 'default',
    format: 'json',
    static: {
      mount: 'theme',
    },
    favicon: null
  });

  config.nav = config.nav || ['components', 'docs', 'assets'];
  config.styles = [].concat(config.styles).concat(config.stylesheet).filter(url => url).map(url => (url === 'default' ? `/${config.static.mount}/css/${config.skin}.css` : url));
  config.scripts = [].concat(config.scripts).filter(url => url).map(url => (url === 'default' ? `/${config.static.mount}/theme.js` : url));
  config.favicon = config.favicon || `/${config.static.mount}/favicon.ico`;

  const theme = new Theme(Path.join(__dirname, 'views'), config);

  theme.setErrorView('pages/error.nunj');

  theme.addStatic(Path.join(__dirname, 'dist'), `/${config.static.mount}`);

  theme.addRoute('/', {
    handle: 'overview',
    view: 'pages/doc.nunj',
  });

  theme.addRoute('/docs', {
    redirect: '/'
  });

  theme.addRoute('/components', {
    redirect: '/'
  });

  theme.addRoute('/assets', {
    redirect: '/'
  });

  theme.addRoute('/assets/:name', {
    handle: 'asset-source',
    view: 'pages/assets.nunj'
  }, function (app) {
    return app.assets.visible().map(asset => ({ name: asset.name }));
  });

  theme.addRoute('/components/preview/:handle', {
    handle: 'preview',
    view: 'pages/components/preview.nunj'
  }, getHandles);

  theme.addRoute('/components/render/:handle', {
    handle: 'render',
    view: 'pages/components/render.nunj'
  }, getHandles);

  theme.addRoute('/components/detail/:handle', {
    handle: 'component',
    view: 'pages/components/detail.nunj'
  }, getHandles);

  theme.addRoute('/docs/:path([^\?]+?)', {
    handle: 'page',
    view: 'pages/doc.nunj'
  }, function (app) {
    return app.docs.filter(d => (!d.isHidden && d.path !== '')).flatten().map(page => ({ path: page.path }));
  });

  theme.on('init', function (env, app) {
    require('./filters')(theme, env, app);

    env.engine.addGlobal('panels', function (entity) {
      return entity.meta.webComponent && entity.meta.markup
        ? ['notes', 'component', 'html', 'statified', 'view', 'context']
        : ['notes', 'component', 'html', 'view', 'context'];
    });

    env.engine.addGlobal('hydrate', async function (html) {
      const result = await renderToString(html, {
        clientHydrateAnnotations: false,
        prettyHtml: false,
        removeHtmlComments: true,
        removeAttributeQuotes: false,
        removeBooleanAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeScripts: true,
        removeUnusedStyles: false
      });
      const $ = cheerio.load(result.html);

      const markup = $('body > *')
        .find('[class*="sc-"]')
          .removeClass(function (index, className) {
            return className
              .split(' ')
              .filter(c => c.startsWith('sc-'))
              .join(' ');
          })
        .end()
        .html();

      return prettier.format(markup, {
        printWidth: 120,
        parser: 'html'
      });
    });
  });

  let handles = null;

  function getHandles(app) {
    app.components.on('updated', () => (handles = null));
    if (handles) {
      return handles;
    }
    handles = [];
    app.components.flatten().each(comp => {
      handles.push(comp.handle);
      if (comp.variants().size > 1) {
        comp.variants().each(variant => handles.push(variant.handle));
      }
    });
    handles = handles.map(h => ({ handle: h }));
    return handles;
  }

  return theme;
};
