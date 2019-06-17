// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = function (fractal) {
  return {
    dialog(context, options) {
      const { handlebars } = fractal.components.engine();

      var self = this;

      const html = (
`<div class="${['dso-modal', context.confirm && 'dso-confirm'].filter(c => c).join(' ')}" tabindex="-1" role="dialog" aria-labelledby="${context.id}">
  <div class="dso-dialog" role="document">
    <div class="dso-header">
      <h2 id="${context.id}">${context.heading}</h2>
      <button type="button" class="dso-close" aria-label="Sluiten"></button>
    </div>
    <div class="dso-body">
      ${options.fn(self)}
    </div>
    <div class="dso-footer">
      ${(context.buttons || []).map(b => handlebars.compile(`{{> '@button' }}`)(b)).join('')}
    </div>
  </div>
</div>
`);

      return html.trim();
    }
  };
};
