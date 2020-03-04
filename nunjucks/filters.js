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
  }
};
