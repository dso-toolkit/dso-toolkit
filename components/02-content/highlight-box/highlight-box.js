// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function (fractal) {
  return {
    highlightBox(options) {
      const { handlebars } = fractal.components.engine();
      const { step, icon, label, modifier } = options.hash;

      return `
        <div class="${[
          'highlight-box',
          this.modifier,
          modifier,
          (step || (icon && label)) ? 'dso-has-counter' : false
        ].filter(c => c).join(' ')}">
          ${step || (typeof icon !== 'undefined' && typeof label !== 'undefined')
            ? (
              `<div class="dso-step-counter">
                ${icon && label
                  ? handlebars.compile(`{{> '@icon' }}`)({ icon, label })
                  : step}
              </div>`
            )
            : ''}
          ${options.fn(this)}
        </div>
      `.trim();
    }
  };
};
