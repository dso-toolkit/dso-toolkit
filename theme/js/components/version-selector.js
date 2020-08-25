'use strict';

const $ = global.jQuery;

class VersionSelector {
  constructor() {
    this._getVersions(versions => {
      this._render(versions);
    });
  }

  get currentComponent() {
    return window.location.pathname.split('/').slice(2).join('/') || null;
  }

  get currentVersion() {
    return window.location.pathname.split('/')[1] || '';
  }

  toggleSelector() {
    const button = $('#version_selector_button');
    const dropdownMenu = $('#version_selector_dropdown_menu');
    if (button.attr('aria-expanded') === 'true') {
      dropdownMenu.hide();
      button.attr('aria-expanded', 'false');
    }
    else {
      dropdownMenu.show();
      button.attr('aria-expanded', 'true');
    }
  }

  _getVersions(callback) {
    const versionRequest = new XMLHttpRequest();
    versionRequest.addEventListener('load', function () {
      const jsonVersions = JSON.parse(this.responseText);

      const versions = jsonVersions.versions.reduce(
        function (total, v) {
          if (!v.branch) {
            total.releases = [v].concat(total.releases).slice(0, 5);
          } else if (v.branch === 'topic') {
            total.topicBranches.push(v);
          }

          return total;
        },
        { releases: [], topicBranches: [] }
      );

      callback(versions);
    });
    versionRequest.open('GET', '/versions.json?t=' + new Date().getTime());
    versionRequest.send();
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

    container.prepend(
      '<li>' +
      '<div class="dropdown open">' +
      '<button type="button" class="btn btn-default dropdown-toggle" id="version_selector_button" aria-haspopup="true" aria-expanded="true" />' +
      '<div class="dropdown-menu dso-checkable" id="version_selector_dropdown_menu">' +
      '<h2 class="dso-group-label">Versies</h2>' +
      '<ul aria-labelledby="version_selector_button" id="version_selector_releases"></ul>' +
      '<ul aria-labelledby="version_selector_button" id="version_selector_master"></ul>' +
      '<h2 class="dso-group-label">Branch releases</h2>' +
      '<ul aria-labelledby="version_selector_button" id="version_selector_branches"></ul>' +
      '</div>' +
      '</div>' +
      '</li>'
    );

    $('#version_selector_releases').append(versions.releases.map(createListItem));
    $('#version_selector_master').append([{ version: 'master' }].map(createListItem));
    $('#version_selector_branches').append(versions.topicBranches.map(createListItem));

    const button = $('#version_selector_button');
    button.on('click', this.toggleSelector).trigger('click');
    if (this.currentVersion) {
      const versionLabel = this.currentVersion[0] === '_' ? `#${this.currentVersion.substr(1)}` : this.currentVersion;
      button.append(`<span class="sr-only">Geselecteerde versie: </span>${versionLabel}<span class="sr-only">; Selecteer versies</span>`);
    } else {
      button.text('Selecteer versies');
    }

    if (this.currentVersion === versions.releases[0].version) {
      container.prepend(
        '<li><span class="dso-search dso-label navbar-text"><span class="sr-only">Geselecteerde versie is de </span>laatste versie</span></li>'
      );
    }
  }
}

module.exports = VersionSelector;
