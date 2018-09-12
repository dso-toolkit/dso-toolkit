'use strict';

const slug = require('slug');

slug.defaults.mode ='rfc3986';
slug.defaults.modes['rfc3986'] = {
    replacement: '-',      // replace spaces with replacement
    symbols: true,         // replace unicode symbols or not
    remove: null,          // (optional) regex to remove characters
    lower: true,           // result in lower case
    charmap: slug.charmap, // replace special characters
    multicharmap: slug.multicharmap // replace multi-characters
};

module.exports = function (filename) {
  let name = filename.replace(/[/\\_]/g, '-').replace('.svg', '');

  return slug(name);
};
