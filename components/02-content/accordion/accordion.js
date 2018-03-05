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
        <div class="accordion" id="accordion">
          ${options.fn(this)}
        </div>
      `.trim();
    },

    accordionSection(title, options) {
      var self = this;
      var icon = this.icon;

      let html = (
        `<div class="accordion-section${(self.state ? ' accordion-' + self.state : '') + (self.open ? ' open' : '') }">
          <div class="section-handle">
            <a href="#">
              ${ title }`);

              if (icon) {
                html += (
                  `<span class="check-icon ${ icon }"></span>`);
              }

            html += `</a>
          </div>`;

      if (self.open) {
        html += (
          `<div class="section-body">
            ${options.fn(self)}
          </div>`);
      }

      html += `</div>`;

      return html.trim();
    }
  };
};
