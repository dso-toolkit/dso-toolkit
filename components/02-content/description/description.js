// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function () {
  return {
    dsoDescription(term, options) {
      return [
        `<a id="${encodeURI(term)}-term" href="#${encodeURI(term)}-content" class="dso-description-term${this['description-hidden'] ? '' : ' dso-is-open'}" aria-expandend="${this['description-hidden'] ? 'false' : 'true'}" aria-controls="${encodeURI(term)}-content">${term}</a>`,
        `<span id="${encodeURI(term)}-content" class="dso-description-content ${this['description-hidden'] ? ' dso-description-collapsed' : ' dso-description-expanded'}">`,
          `<a href="#${encodeURI(term)}-term">`,
            `<span class="sr-only">Verbergen</span>`,
          `</a>`,
          `<span>${options.fn(this)}</span>`,
        `</span>`
      ].join('');
    }
  };
};
