'use strict';

const prettier = require('prettier');
const _ = require('lodash');
const Path = require('path');
const beautifyHTML = require('js-beautify').html;

module.exports = function (theme, env, app) {

  env.engine.addFilter('url', function (item) {
    if (item.isDoc) {
      if (!item.path) {
        return '/';
      }
      return theme.urlFromRoute('page', { path: item.path });
    } else if (item.isComponent || item.isVariant) {
      return theme.urlFromRoute('component', { handle: item.handle });
    } else if (item.isAssetSource) {
      return theme.urlFromRoute('asset-source', { name: item.name });
    } else if (item.isAsset) {
      return Path.join('/', app.get('web.assets.mount'), item.srcPath);
    }
    throw new Error(`Cannot generate URL for ${item}`);
  });

  env.engine.addFilter('beautify', function (str) {
    const defaults = {
      indent_size: 4,
      preserve_newlines: true,
      max_preserve_newlines: 1
    };

    let beautifyOptions = theme.getOption('beautify') || {};

    if (typeof beautifyOptions === 'function') {
      return beautifyOptions(str);
    }

    beautifyOptions = _.merge({}, defaults, beautifyOptions);

    return beautifyHTML(str, beautifyOptions);
  });

  env.engine.addFilter('prettier', function (str) {
    return prettier.format(str, {
      printWidth: 120,
      parser: 'html'
    });
  });

  env.engine.addFilter('componentPath', function (str) {
    return Path.relative(process.cwd(), Path.join(app.components.get('path'), Path.relative(Path.resolve(app.components.get('path')), Path.resolve(str))));
  });

  env.engine.addFilter('linkRefs', function (str, item) {
    if (!(item.isComponent || item.isVariant)) {
      return str;
    }
    const refs = item.references;
    return str.replace(new RegExp(`(${refs.map(r => `\@${r.handle}`).join('|')})`, 'g'), (handle) => {
      try {
        let url = theme.urlFromRoute('component', {
          handle: handle.replace('@', '')
        });
        const pathify = env.engine.getGlobal('path');
        url = pathify.call(this, url);
        return `<a href="${url}">${handle}</a>`;
      } catch (e) {
        return handle;
      }
    });
  });

};
