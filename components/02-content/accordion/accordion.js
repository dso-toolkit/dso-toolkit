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

      var termsEnglish = ["success", "warning", "info", "danger"];
      var termsDutch = ["succes", "waarschuwing", "info", "gevaar"];
      // var stateTerm = termsEnglish.indexOf(self.state);
      // var dutchTerm = termsDutch.slice(stateTerm, stateTerm + 1);
      var dutchTerm = termsDutch[termsEnglish.indexOf(self.state)]

      let html = (
        `<div class="dso-accordion-section${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') + (self.sections ? ' dso-nested-accordion' : '') }">
          <${header} class="dso-section-handle">
            <a href="#"><span class="sr-only">${dutchTerm}: </span>${ title }</a>
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
