// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function () {
  return {
    dsoDescription(term, options) {
      return [
        `<a id="${this._self.handle}-term" href="#${this._self.handle}-content" class="dso-description-term${this['open'] ? ' dso-open' : ''}" aria-expanded="${this['open'] ? 'true' : 'false'}" aria-controls="${this._self.handle}-content">${term}</a>`,
        `<span id="${this._self.handle}-content" class="dso-description-content">`,
          `${options.fn(this)}`,
          `<a href="#${this._self.handle}-term">`,
            `<span class="sr-only">Verbergen</span>`,
          `</a>`,
        `</span>`
      ].join('');
    }
  };
};
