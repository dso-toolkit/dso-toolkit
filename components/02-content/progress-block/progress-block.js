// Notes:
// ------
// * Each change to this file needs a restart of the fractal instance
// * Exported methods are merged as helpers in fractal.js

module.exports = {
  progressBlock(options) {
    const offset = Object.assign({
      top: 245,
      bottom: 444
    }, options.hash);

    return `
      <div class="well progress-block" data-spy="affix" data-offset-top="${ offset.top }" data-offset-bottom="${ offset.bottom }">
        ${options.fn(this)}
      </div>
    `.trim();
  }
};
