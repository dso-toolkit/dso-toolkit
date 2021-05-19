import $ from 'jquery';

import { get, set } from '../storage';

export default class Browser {

  constructor(el) {
    this._el = $(el);
    this._tabs = this._el.find('.dso-browser-navbar-item');
    this._tabPanels = this._el.find('.dso-browser-navbar-item-panel');
    this._fileSwitcher = this._el.find('[data-role="switcher"]');
    this._codeViews = this._el.find('[data-role="code"]');
    this._resourcePreview = this._el.find('[data-role="resource-preview"]');
    this._activeClass = 'is-active';
    this._initTabs();
  }

  _initTabs() {
    const ac = this._activeClass;
    const tabs = this._tabs;
    const selectedIndex = Math.min(tabs.length - 1, get(`browser.selectedTabIndex`, 0));
    tabs.on('click', e => {
      const link = $(e.target).closest('a');
      const tab = link.parent();
      tabs.removeClass(ac).find('a').attr('aria-selected', 'false').removeAttr('aria-current');
      set(`browser.selectedTabIndex`, tabs.index(tab));
      tab.addClass(ac).find('a').attr('aria-selected', 'true').attr('aria-current', 'page');
      this._tabPanels.removeClass(ac).removeAttr('aria-current');
      this._tabPanels.filter(link.attr('href')).addClass(ac).attr('aria-current', true);
      return false;
    });
    tabs.removeClass('is-active').find('a').attr('aria-selected', 'false').removeAttr('aria-current');
    tabs.eq(selectedIndex).find('a').trigger('click');
  }
}
