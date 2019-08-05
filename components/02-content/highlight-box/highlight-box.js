// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = {
  highlightBox(options) {
    return `
      <div class="${['highlight-box', this.modifier].filter(c => c).join(' ')}">
        ${options.fn(this)}
      </div>
    `.trim();
  }
};
