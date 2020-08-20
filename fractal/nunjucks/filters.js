const path = require('path');

module.exports = {
  docPath: function docPath(inputPath) {
    const pathWithExtension = path.extname(inputPath) !== '';
    const ext = process.env.DSO_RENDER_MODE === 'static' && !pathWithExtension
      ? '.html'
      : '';

    return `../..${inputPath}${ext}`;
  },
  split: function split(input, separator) {
    return input.split(separator);
  },
  map: function map(arr, property) {
    return arr.map(function (item) {
      return item[property];
    });
  },
  includes: function includes(arr, value) {
    return arr.includes(value);
  },
  in: function (value, arr) {
    return arr.includes(value);
  },
  find: function find(arr, property, value) {
    return arr.find(item => item[property] === value);
  },
  get: function get(arr, property) {
    return arr[property];
  },
  prefix: function prefix(arr, prefix) {
    return arr.map(value => `${prefix}${value}`);
  }
};
