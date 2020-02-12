// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function () {
  return {
    accordionLight(options) {
      const classNames = ['dso-accordion-light', this.modifiers].filter(c => c).join(' ');

      return `
        <div class="${classNames}">
          ${options.fn(this)}
        </div>
      `.trim();
    },

    accordionLightSection(title, options) {
      const self = this;
      const header = 'h3';

      let html = (
        `<${header} class="dso-section-handle${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') }">
          <button>`);

      html += title;

      html += (`</button>\n</${header}>
        <div class="dso-section-body">
          ${options.fn(self)}
        </div>`
      );

      return html.trim();
    }
  };
};
