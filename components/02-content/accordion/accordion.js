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
      const self = this;
      const header = options.hash.header || 'div';

      const termMap = {
        success: 'succes',
        warning: 'waarschuwing',
        info: 'info',
        danger: 'gevaar'
      };

      let html = (
        `<div class="dso-accordion-section${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') + (self.sections ? ' dso-nested-accordion' : '') }">
          <${header} class="dso-section-handle">
            <a href="#">`);

      const term = self.state;

      // Success

      if (termMap[term]) {
        html += (`<span class="sr-only">${termMap[term]}: </span>`);
      }

      html += (`${title}</a>
      </${header}>`);

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
