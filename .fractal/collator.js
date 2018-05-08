module.exports = (markup, item) =>
  `<!-- Start: @${item.handle} -->\n` +
  (item.context.__title || item.context.__explanation
    ? `
      <div class="dso-example-wrapper">
        <div class="dso-example-text" aria-hidden="true">
          ${item.context.__title ? `<h2>${item.context.__title}</h2>` : ''}
          ${item.context.__explanation
            ? [].concat(item.context.__explanation).map(e => `<p>${e}</p>`).join('\n')
            : ''}
        </div>
        <div class="dso-example">
          ${markup}
        </div>
      </div>`
  : `${markup}`) +
  `\n<!-- End: @${item.handle} --><hr />\n`;
