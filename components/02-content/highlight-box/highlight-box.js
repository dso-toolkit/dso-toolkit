// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = {
  highlightBox(options) {
    return `
      ${options.fn(this)}
    `.trim();
  }
};
