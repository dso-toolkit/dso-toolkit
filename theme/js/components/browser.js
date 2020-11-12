import $ from 'jquery';

import { get, set } from '../storage';

export default class Browser {

  constructor(el) {
    this._el = $(el);
    this._tabs = this._el.find('[data-role="tab"]');
    this._tabPanels = this._el.find('[data-role="tab-panel"]');
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
      tabs.removeClass(ac).find('a').attr('aria-selected', 'false');
      set(`browser.selectedTabIndex`, tabs.index(tab));
      tab.addClass(ac).find('a').attr('aria-selected', 'true');
      this._tabPanels.removeClass(ac);
      this._tabPanels.filter(link.attr('href')).addClass(ac);
      return false;
    });
    tabs.removeClass('is-active').find('a').attr('aria-selected', 'false');
    tabs.eq(selectedIndex).find('a').trigger('click');
  }
}
