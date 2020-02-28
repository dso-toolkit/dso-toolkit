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
      const handleType = self.type;

      const termMap = {
        success: 'succes',
        warning: 'waarschuwing',
        info: 'info',
        danger: 'gevaar'
      };

      let html = (
        `<div class="dso-accordion-section${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') + (self.sections ? ' dso-nested-accordion' : '') }">
          <${header} class="dso-section-handle">`);

      html += handleType === 'button' ? (`\n<button type="button">`) : (`\n<a href="#">`);

      const term = self.state;
      if (termMap[term]) {
        html += (`<span class="sr-only">${termMap[term]}: </span>`);
      }

      html += title;

      const status = self.status;
      if (status) {
        html += (`<span class="dso-status">${status}</span>`);
      }

      const attachments = self.attachments;
      if (typeof attachments === 'number') {
        html += (`<span class="dso-attachments-counter">${attachments} <span class="sr-only">bijlage${attachments === 1 ? '' : 'n'}</span></span>`)
      }

      html += handleType === 'button' ? (`</button>\n</${header}>`) : (`</a>\n</${header}>`);

      if (self.open) {
        html += (
          `<div class="dso-section-body">
            ${options.fn(self)}
          </div>`
        );
      }

      html += `</div>`;

      return html.trim();
    }
  };
};
