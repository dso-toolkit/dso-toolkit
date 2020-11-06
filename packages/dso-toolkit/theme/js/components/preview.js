import $ from 'jquery';

import events from '../events';
import * as storage from '../storage';

export default class Preview {
  constructor(el) {
    this._el = $(el);
    this._id = this._el[0].id;
    this._handle = this._el.find('[data-role="resize-handle"]');
    this._iframe = this._el.children('[data-role="window"]');
    this._resizer = this._el.children('[data-role="resizer"]');
    this._init();
  }

  _init() {
    const dir = $('html').attr('dir');
    const initialWidth = storage.get(`preview.width`, this._resizer.outerWidth());
    let handleClicks = 0;

    if (initialWidth == this._el.outerWidth()) {
      this._resizer.css('width', '100%');
    } else {
      this._resizer.outerWidth(initialWidth);
    }

    this._handle.on('mousedown', e => {
      handleClicks++;

      setTimeout(function () {
        handleClicks = 0;
      }, 400);

      if (handleClicks === 2) {
        this._resizer.css('width', 'calc(100% + 0.75rem)');
        return false;
      }
    });
  }

  disableEvents() {
    this._el.addClass('is-disabled');
  }

  enableEvents() {
    this._el.removeClass('is-disabled');
  }
}
