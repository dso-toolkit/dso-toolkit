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

  config.nav = config.nav || ['components', 'docs'];
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

    const hydrate = async function (html, options) {
      const result = await renderToString(html, Object.assign({
        clientHydrateAnnotations: false,
        prettyHtml: false,
        removeHtmlComments: true,
        removeAttributeQuotes: false,
        removeBooleanAttributeQuotes: true,
        removeEmptyAttributes: true,
        removeScripts: true,
        removeUnusedStyles: false
      }, options || {}));
      const $ = cheerio.load(result.html);

      $('[class*="sc-"]').removeClass(function (index, className) {
        return className
          .split(' ')
          .filter(c => c.startsWith('sc-'))
          .join(' ');
      });

      $('.hydrated')
        .removeClass('hydrated')
        .find('[class=""]')
        .removeAttr('class');

      $('slot-fb')
        .each((index, element) => {
          const $element = $(element);

          if (element.nextSibling) {
            $element.remove();
          }
          else {
            $element.replaceWith($element.html());
          }
        });

      return $;
    };

    env.engine.addGlobal('hydrateForPreview', async function (html, entity) {
      const $ = cheerio.load(html);

      const dsoCustomElements = $('*')
        .filter((index, element) => /^dso-/i.test(element.tagName))
        .get();

      if (dsoCustomElements.length === 0 || (entity.meta.webComponent && !entity.meta.markup)) {
        return html;
      }

      $('.container').prepend('<h2>Web Component preview</h2>');
      const $raw = $('body > *:not(script):not(style):not(link)');
      const raw = $.html($raw);

      const $hydrated = await hydrate(html, {
        removeHtmlComments: true,
        removeAttributeQuotes: false,
        removeBooleanAttributeQuotes: false,
        removeEmptyAttributes: false,
        removeScripts: false,
        removeUnusedStyles: false
      });

      $hydrated('style[sty-id]').remove();

      $hydrated('[slot]').removeAttr('slot');

      $hydrated('*')
        .filter((index, element) => /^dso-/i.test(element.tagName))
        .get()
        .sort((a, b) => {
          const $a = $hydrated(a);
          const $b = $hydrated(b);

          if ($a.parents().length - $b.parents().length > 0) {
            return -1;
          }

          if ($a.parents().length - $b.parents().length < 0) {
              return 1;
          }

          return 0;
        })
        .forEach(element => {
          const $element = $hydrated(element);

          $element.replaceWith($element.html());
        });

      $hydrated('svg.di use[href^="/icon-assets/"]').each((index, element) => {
        const $element = $hydrated(element);
        const href = $element.attr('href');

        $element.attr('href', href.replace('/icon-assets/', '../../'));
      });

      $hydrated('body')
        .find('.container')
          .prepend('<h2>Markup component preview</h2>')
        .end()
        .prepend('<hr id="custom-elements-raw">')
        .prepend(raw);

      return prettier.format($hydrated.html(), {
        printWidth: 120,
        parser: 'html'
      });
    });

    env.engine.addGlobal('hydrate', async function (html, options) {
      options = Object.assign(
        {
          stripRoot: true
        },
        options || {}
      );

      const $ = await hydrate(html);

      return prettier.format($(options.stripRoot ? 'body > *' : 'body').html(), {
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
