// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

function accumulateActivities(items) {
  return items.reduce((t, item) => t.concat(item.activities), []);
}

module.exports = {
  countActivities(items) {
    return accumulateActivities(items).length
  },
  hasWarning(itemsOrActivities) {
    return (itemsOrActivities.some(a => a.activities) ? accumulateActivities(itemsOrActivities) : itemsOrActivities)
      .some(a => a.warning);
  }
};
