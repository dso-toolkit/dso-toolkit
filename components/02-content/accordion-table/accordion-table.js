// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function () {
  return {
    accordionTable(options) {
      const classNames = ['dso-accordion-table', this.modifiers].filter(c => c).join(' ');

      return `
        <table class="${classNames}">
          ${options.fn(this)}
        </table>
      `.trim();
    },

    accordionTableSection(title, options) {
      var self = this;

      let html = (
        `<tr class="dso-accordion-section${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') }">
          <td class="dso-section-handle">
            <a href="#">${ title }</a>
          </td>
        </tr>`);

      if (self.open) {
        html += (
          `<tr class="dso-section-body">
            <td>
              ${options.fn(self)}
            </td>
          </tr>`);
      }

      // html += `</tr>`;

      return html.trim();
    }
  };
};
