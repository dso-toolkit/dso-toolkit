'use strict';

module.exports = fractal => Object.assign({
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
  and: function (valueOne, valueTwo) {
    return valueOne && valueTwo;
  },
  or: function (valueOne, valueTwo) {
    return valueOne || valueTwo;
  },
  add: function (value, number) {
    return value + number;
  },
  subtract: function (value, number) {
    return value - number;
  }
},
require('../components/02-content/accordion/accordion.js')(fractal),
require('../components/02-content/accordion-table/accordion-table.js')(fractal),
require('../components/02-content/highlight-box/highlight-box.js'),
require('../components/02-content/progress-block/progress-block.js')
);
