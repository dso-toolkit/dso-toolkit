"use strict";

const $ = require("./../jquery");

class VersionSelectorService {
  static _versionsPromise;

  static getVersions = function () {
    if (this._versionsPromise) {
      return this._versionsPromise;
    }

    this._versionsPromise = $.ajax(
      'https://www.dso-toolkit.nl/versions.json?t=' + new Date().getTime()
    ).then((results) => {
      return results.versions;
    });

    return this._versionsPromise;
  };
}

module.exports = VersionSelectorService;
