module.exports = (markup, item) =>
  `<!-- Start: @${item.handle} -->\n` +
  (item.context.__title || item.context.__explanation || item.context.__switches
    ? `
      <div class="dso-example-wrapper">
        ${item.context.__title || item.context.__explanation
          ? `<div class="dso-example-text" aria-hidden="true">
              ${item.context.__title ? `<h2>${item.context.__title}</h2>` : ''}
              ${item.context.__explanation
                ? [].concat(item.context.__explanation).map(e => `<p>${e}</p>`).join('\n')
                : ''}
            </div>`
          : ''}
        ${item.context.__switches && item.context.__switches.length > 0
          ? item.context.__switches.map(s => `<input type="checkbox" id="${s.name}-switch" /><label for="${s.name}-switch">${s.label}</label>`)
          : ''}
        <div class="dso-example">
          ${markup}
        </div>
      </div>`
  : `${markup}`) +
  `\n<!-- End: @${item.handle} --><hr />\n`;
