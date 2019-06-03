// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function () {
  return {
    accordion(options) {
      const classNames = ['dso-accordion', this.modifiers].filter(c => c).join(' ');

      return `
        <div class="${classNames}">
          ${options.fn(this)}
        </div>
      `.trim();
    },

    accordionSection(title, options) {
      var self = this;

      let html = (
        `<div class="dso-accordion-section${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') + (self.sections ? ' dso-nested-accordion' : '') }">
          <div class="dso-section-handle">
            <a href="#">${ title }</a>
          </div>`);

      if (self.open) {
        html += (
          `<div class="dso-section-body">
            ${options.fn(self)}
          </div>`);
      }

      html += `</div>`;

      return html.trim();
    }
  };
};
