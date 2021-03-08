import $ from 'jquery';

import events from '../events';
import * as storage from '../storage';

function getTreeUrl(urlPath) {
  const parser = document.createElement('a');
  parser.href = urlPath;
  const pathParts = parser.pathname.split('/');
  pathParts.push(pathParts.pop());
  return pathParts.join('/');
}

export default class Tree {

  constructor(el) {
    this._el = $(el);
    this._id = this._el[0].id;
    this._state = storage.get(`tree.${this._id}.state`, []);
    this._collections = $.map(this._el.find('[data-behaviour="collection"]'), c => new TreeCollection(c, this));

    for (let key in this._collections) {
      const collection = this._collections[key];
      if (collection.containsCurrentItem()) {
        this._state.push(collection.id);
      }
    }
    this._state = jQuery.unique(this._state);
    this._applyState();
    events.on('main-content-preload', (e, url) => {
      this.selectItem(getTreeUrl(url));
    });
  }

  selectItem(url) {
    this._el.find('.is-current').removeClass('is-current');
    this._el.find(`[href="${url}"]`).parent().addClass('is-current');
  }

  _applyState() {
    for (let key in this._collections) {
      const collection = this._collections[key];
      if (this._state.indexOf(collection.id) > -1) {
        collection.open(true);
      } else {
        collection.close(true);
      }
    }
  }

  saveState() {
    this._state = this._collections.filter(c => c.isOpen).map(c => c.id);
    storage.set(`tree.${this._id}.state`, this._state);
  }

  filter(value) {
    const cleanRegex = /[ -]/g;
    const items = $('*[data-role="item"]', this._el);
    value = (value || '').toLowerCase().replace(cleanRegex, '');
    if (value) {
      items.each((i, e) => {
        const item = $(e);
        const text = $('a, button', item).text().trim().toLowerCase().replace(cleanRegex, '');
        if (text.indexOf(value) < 0) {
          item.removeClass('is-filtered').hide();
        }
        else {
          item.addClass('is-filtered').show();
        }
      });
      this._collections.map(collection => {
        if (collection.hasVisibleItem) {
          collection.show();
          collection.open(true);
        }
        else {
          collection.hide();
        }
      });
    }
    else {
      items.removeClass('is-filtered').show();
      this._collections.map(collection => collection.show());
      this._applyState();
    }
  }
}

class TreeCollection {

  constructor(el, tree) {
    this._tree = tree;
    this._el = $(el);
    this._toggle = this._el.find('> h3 > [data-role="toggle"]');
    this._itemsWrapper = this._el.find('[data-role="items"]:not(> [data-behaviour] [data-role="items"])');
    this._isOpen = true;
    this._toggle.attr('aria-expanded', 'true');
    this._toggle.on('click', this.toggle.bind(this));
  }

  get id() {
    return this._el[0].id;
  }

  get isOpen() {
    return this._isOpen;
  }

  get hasVisibleItem() {
    return !!this._el.find('.is-filtered').length;
  }

  containsCurrentItem() {
    return !!this._itemsWrapper.find('[data-state="current"]').length;
  }

  open(silent) {
    this._el.removeClass('is-closed');
    this._isOpen = true;
    this._toggle.attr('aria-expanded', 'true');
    if (!silent) this._tree.saveState();
  }

  close(silent) {
    this._el.addClass('is-closed');
    this._isOpen = false;
    this._toggle.attr('aria-expanded', 'false');
    if (!silent) this._tree.saveState();
  }

  show() {
    this._el.show();
  }

  hide() {
    this._el.hide();
  }

  toggle() {
    this._isOpen ? this.close() : this.open();
    return false;
  }
}
