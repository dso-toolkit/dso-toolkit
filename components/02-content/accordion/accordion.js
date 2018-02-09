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

    panel(title, context, options) {
      let o = options || context;
      let icon = '';

      return handlebars
        .compile('{{> \'@icon\' }}')({ icon: context.icon })
        .then(i => {
          icon = context.icon && i.trim();

          return o.fn(context);
        })
        .then(content => `
          <div class="panel">
            <div class="section-toggle">
              <span class="toggle-icon fa fa-angle-right"></span>
              <h2>
                <a data-toggle="collapse" data-parent="#accordion" href="#${context.id}" aria-expanded="false" aria-controls="${context.id}">${title}</a>${icon ? '\n' + icon : ''}
              </h2>
            </div>
            <div class="section-body collapse" id="${context.id}">
              ${content.trim()}
            </div>
          </div>
        `.trim());
    }
  };
};
