// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js
// ToDo: Multiple accordion's are impossible: The @id of each .accordion is fixed.

module.exports = function (fractal) {
  const handlebars = fractal.components.engine().handlebars;

  return {
    accordion(options) {
      return `
        <div class="dso-accordion" id="accordion">
          ${options.fn(this)}
        </div>
      `.trim();
    },

    accordionSection(title, options) {
      var self = this;

      let html = (
        `<div class="dso-accordion-section${(self.state ? ' dso-accordion-' + self.state : '') + (self.open ? ' dso-open' : '') }">
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
