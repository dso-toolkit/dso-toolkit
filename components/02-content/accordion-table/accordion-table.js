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

    accordionTableHead(tablehead) {
      let tableHeadHtml = `<thead>`;
      tableHeadHtml += (
        `<tr class="dso-accordion-head">
          <th>
            ${ tablehead }
          </th>
        </tr>`);
      tableHeadHtml += `</thead>`;

      return tableHeadHtml.trim();
    },

    accordionTableSection(title, options) {
      var self = this;

      let tableBodyHtml = `<tbody>`;

      tableBodyHtml += (
        `<tr class="dso-accordion-section${(self.state ? ' dso-' + self.state : '') + (self.open ? ' dso-open' : '') }">
          <td class="dso-section-handle">
            <a href="#">${ title }</a>
          </td>
        </tr>`);

      if (self.open) {
        tableBodyHtml += (
          `<tr class="dso-section-body">
            <td>
              ${options.fn(self)}
            </td>
          </tr>`);
      }

      tableBodyHtml += `</tbody>`;

      return tableBodyHtml.trim();
    }
  };
};
