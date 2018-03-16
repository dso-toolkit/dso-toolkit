module.exports = (markup, item) =>
  item.context.__title || item.context.__explanation
    ? `
      <!-- Start: @${item.handle} -->
      <div class="dso-example-wrapper">
        <div class="dso-example-text">
          ${item.context.__title ? `<h2>${item.context.__title}</h2>` : ''}
          ${item.context.__explanation
            ? [].concat(item.context.__explanation).map(e => `<p>${e}</p>`).join('\n')
            : ''}
        </div>
        <div class="dso-example">
          ${markup}
        </div>
      </div>
      <hr />
      <!-- End: @${item.handle} -->`
  : `${markup}<hr />`;
