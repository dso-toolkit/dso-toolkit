// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = {
  highlightBox(options) {
    const { step, icon, label, modifier } = options.hash;

    return `
      <div class="${[
        'highlight-box',
        this.modifier,
        modifier,
        step ? 'dso-has-counter' : false
      ].filter(c => c).join(' ')}">
        ${step || (typeof icon !== 'undefined' && typeof label !== 'undefined')
          ? (
            `<div class="dso-step-counter">
              ${icon && label
                ? `<span class="${icon}" aria-hidden="true"><span class="sr-only">${label}</span>`
                : step}
            </div>`
          )
          : ''}
        ${options.fn(this)}
      </div>
    `.trim();
  }
};
