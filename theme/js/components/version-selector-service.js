"use strict";

const $ = require("./../jquery");

class VersionSelectorService {
  static _versions;

  static _versionsPromise;

  static getVersions = function () {
    if (this._versionsPromise) {
      return this._versionsPromise;
    } else if (this._versions) {
      return Promise.resolve(this._versions);
    }

    this._versionsPromise = $.ajax(
      'https://www.dso-toolkit.nl/versions.json?t=' + new Date().getTime()
    ).then((results) => {
      this._versionsPromise = undefined;
      return (this._versions = results.versions);
    });

    return this._versionsPromise;
  };
}

module.exports = VersionSelectorService;
