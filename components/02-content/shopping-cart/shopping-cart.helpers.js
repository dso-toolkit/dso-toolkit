// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

function accumulateItems(items) {
  return items.reduce((t, item) => t.concat(item.subitems), []);
}

module.exports = {
  countSubitems(items) {
    return accumulateItems(items).length
  },
  hasWarning(items) {
    return items && (items.some(a => a.subitems) ? accumulateItems(items) : items)
      .some(a => a.warning);
  }
};
