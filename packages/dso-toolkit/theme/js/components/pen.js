import $ from 'jquery';

import events from '../events';
import * as storage from '../storage';

import Browser from './browser';
import Preview from './preview';

export default class Pen {
  constructor(el) {
    this._el = $(el);
    this._id = this._el[0].id;
    this._previewPanel = this._el.find('[data-behaviour="preview"]');
    this._browser = this._el.find('[data-behaviour="browser"]');
    this._handle = this._el.children('[data-role="resize-handle"]');
    this._init();
  }

  _init() {
    const initialHeight = storage.get(`pen.previewHeight`, (this._el.outerHeight() / 2));
    const preview = new Preview(this._previewPanel);
    const browser = new Browser(this._browser);
    let state = storage.get(`pen.previewState`, 'open');
    let handleClicks = 0;
    let dblClick = false;

    if (state === 'open') {
      this._previewPanel.outerHeight(initialHeight);
      storage.set(`pen.previewHeight`, initialHeight);
    } else {
      this._previewPanel.css('height', '100%');
    }

    this._handle.on('mousedown', e => {
      dblClick = false;
      handleClicks++;

      setTimeout(function () {
        handleClicks = 0;
      }, 400);

      if (handleClicks === 2) {
        dblClick = true;
        handleClicks = 0;
        return false;
      }
    });
  }
}
