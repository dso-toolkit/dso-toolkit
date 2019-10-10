'use strict';

module.exports = fractal => Object.assign({
  frame: function (path, element) {
    const { handlebars } = fractal.docs.engine();

    let html = `
<div class="dso-toolkit-window">
  <div class="dso-toolkit-titlebar-stoplight">
    <div class="dso-toolkit-titlebar-close"></div>
    <div class="dso-toolkit-titlebar-minimize"></div>
    <div class="dso-toolkit-titlebar-fullscreen"></div>
  </div>
  <iframe src="${path}" frameborder="0" scrolling="no" onload="DsoToolkitResizeIframe(this${typeof element === 'string' ? `, '${element}'` : ''})"></iframe>
</div>`;

    return new handlebars.SafeString(html);
  },
  concat: function (obj1, obj2) {
    return obj1.concat(obj2);
  },
  ifattr: function (attrName, comparer, value) {
    if (arguments.length === 3) {
      if (comparer === true) {
        return attrName;
      }
      else if (comparer) {
        return attrName + '="' + (typeof value !== "object" ? value : comparer) + '"';
      }
    }
    else if (arguments.length === 4 || arguments.length === 5) {
      if (comparer === value) {
        return attrName + '="' + (typeof arguments[4] !== "object" ? arguments[4] : arguments[3]) + '"';
      }
    }

    return '';
  },
  helpTextId: function (id) {
    return 'helpTextId_' + id;
  },
  radioId: function (name, index) {
    return ['radio', name, index].join('_');
  },
  merge: function () {
    return slice
      .call(arguments, 0, -1)
      .concat(arguments[arguments.length - 1].hash)
      .map(argument => {
        let keys = Object.keys(argument);

        return keys
          .filter(key => key[0] !== '_')
          .map(key => ({ [key]: argument[key] }))
          .reduce((accumulator, value) => Object.assign(accumulator, value), {})
      })
      .reduce((accumulator, currentValue) => Object.assign(accumulator, currentValue), {});
  },
  not: function (value) {
    return !value;
  },
  toString: function (value) {
    return value.toString();
  },
  in: function (haystack, needle) {
    return haystack.indexOf(needle) !== -1;
  },
  join: function (list, character) {
    return list.join(character);
  },
  prefix: function (list, value) {
    return list.map(item => value + item);
  },
  eq: function (valueOne, valueTwo) {
    return valueOne === valueTwo;
  },
  ne: function (valueOne, valueTwo) {
    return valueOne !== valueTwo;
  },
  lt: function (valueOne, valueTwo) {
    return valueOne < valueTwo;
  },
  gt: function (valueOne, valueTwo) {
    return valueOne > valueTwo;
  },
  lte: function (valueOne, valueTwo) {
    return valueOne <= valueTwo;
  },
  gte: function (valueOne, valueTwo) {
    return valueOne >= valueTwo;
  },
  and: function () {
    return [...arguments].slice(0, -1).every(a => !!a);
  },
  or: function (valueOne, valueTwo) {
    return valueOne || valueTwo;
  },
  add: function () {
    return [...arguments].slice(0, -1).reduce((t, n) => t + n, 0);
  },
  multiply: function () {
    return [...arguments].slice(0, -1).reduce((t, n) => t * n, 1);
  },
  subtract: function (value, number) {
    return value - number;
  },
  map: function (array, property) {
    return array.map(a => a[property]);
  }
},
require('../components/02-content/_dialog/dialog.js')(fractal),
require('../components/02-content/accordion/accordion.js')(fractal),
require('../components/02-content/highlight-box/highlight-box.js')(fractal),
require('../components/02-content/progress-block/progress-block.js'),
require('../components/02-content/shopping-cart/shopping-cart.helpers.js')
);
