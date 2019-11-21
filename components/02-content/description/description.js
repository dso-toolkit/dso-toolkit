// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function () {
  return {
    description(term, options) {
      return [
        `<span class="dso-description-term${this['description-hidden'] ? '' : ' dso-is-open'}">${term}</span>`,
        `<span class="dso-description-content" aria-hidden="${!!this['description-hidden']}">`,
          `<button type="button">`,
            `<span class="sr-only">Sluiten</span>`,
          `</button>`,
          `<span>${options.fn(this)}</span>`,
        `</span>`
      ].join('');
    }
  };
};
