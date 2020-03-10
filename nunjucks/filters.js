const shoppingCartFilters = require('../components/02-content/shopping-cart/shopping-cart.filters');

module.exports = {
  split: function(input, separator) {
    return input.split(separator);
  },
  map: function(arr, property) {
    return arr.map(function (item) {
      return item[property];
    });
  },
  includes: function(arr, value) {
    return arr.includes(value);
  },
  prefix: function (arr, prefix) {
    return arr.map(value => `${prefix}${value}`)
  },
  ...shoppingCartFilters
};
