import $ from 'jquery';

import VersionSelectorService from './version-selector-service';

export default class VersionSelector {
  constructor() {
    this._getVersions().then((versions) => this._render(versions));
  }

  get currentComponent() {
    return window.location.pathname.split('/').slice(2).join('/') || null;
  }

  get currentVersion() {
    return window.location.pathname.split('/')[1] || '';
  }

  _toggleSelector(e, hint) {
    e.stopPropagation();
    const navItem = $('#version_selector_nav_item');
    const button = $('#version_selector_button');
    const dropdownMenu = $('#version_selector_dropdown_menu');

    if (button.attr('aria-expanded') === 'true' || hint === 'close') {
      navItem.removeClass('open');
      dropdownMenu.hide();
      button.attr('aria-expanded', 'false');
      $(window).off('.version-selector');
    }
    else {
      navItem.addClass('open');
      dropdownMenu.show();
      button.attr('aria-expanded', 'true');
      $(window).on('click.version-selector', this._windowClicked.bind(this));
      $(window).on('keydown.version-selector', this._windowKeyDown.bind(this));
    }
  }

  _windowClicked(e) {
    if ($(e.target).parents('.toolkit-version-selector').length === 1) {
      return;
    }

    this._toggleSelector(e, 'close');
  }

  _windowKeyDown(e) {
    if (e.key == 'Escape') {
      this._toggleSelector(e, 'close');
    }
  }

  _getVersions() {
    return VersionSelectorService.getVersions().then((versions) =>
      versions.reduce(
        function (total, v) {
          if (!v.branch) {
            total.releases = [v].concat(total.releases).slice(0, 5);
          }
          else if (v.branch === 'topic') {
            total.topicBranches.push(v);
          }

          return total;
        },
        { releases: [], topicBranches: [] }
      )
    )
  }

  _render(versions) {
    const container = $('.toolkit-version-selector');

    const createListItem = version => {
      const li = $('<li/>');
      const a = $('<a/>');
      li.append(a);
      a.attr('href', `/${version.version}${this.currentComponent ? '/' + this.currentComponent : ''}`);
      a.text(version.label || version.version);
      if (this.currentVersion === version.version) {
        li.addClass('dso-checked');
      }

      return li;
    };

    container.prepend(`
      <li class="navbar-text dropdown" id="version_selector_nav_item">
        <button type="button" class="btn btn-link" id="version_selector_button" aria-haspopup="true" aria-expanded="true">
          <span class="label"></span>
          <dso-icon icon="chevron-down"></dso-icon>
        </button>
        <div class="dropdown-menu dso-checkable" id="version_selector_dropdown_menu">
          <h2 class="dso-group-label">Versies</h2>
          <ul aria-labelledby="version_selector_button" id="version_selector_releases"></ul>
          <ul aria-labelledby="version_selector_button" id="version_selector_all_versions">
            <li>
              <a href="/master/docs/versions.html">Alle versies</a>
            </li>
          </ul>
          <h2 class="dso-group-label">Branch releases</h2>
          <ul aria-labelledby="version_selector_button" id="version_selector_branches"></ul>
        </div>
      </li>
    `);

    $('#version_selector_releases').append(versions.releases.map(createListItem));
    $('#version_selector_branches').append([{ version: 'master' }].concat(versions.topicBranches).map(createListItem));

    const button = $('#version_selector_button');
    button.on('click', this._toggleSelector.bind(this)).trigger('click');

    const buttonLabel = button.find('> span.label');
    if (this.currentVersion) {
      const versionLabel = this.currentVersion[0] === '_' ? `#${this.currentVersion.substr(1)}` : this.currentVersion;
      buttonLabel.append(`<span class="sr-only">Geselecteerde versie: </span>${versionLabel}<span class="sr-only">; Selecteer versies</span>`);
    }
    else {
      buttonLabel.text('Selecteer versies');
    }

    if (this.currentVersion === versions.releases[0].version) {
      container.prepend(
        '<li><span class="dso-search dso-label navbar-text"><span class="sr-only">Geselecteerde versie is de </span>laatste versie</span></li>'
      );
    }
  }
}
