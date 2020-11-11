import $ from 'jquery';

export default class VersionSelectorService {
  static _versionsPromise;

  static getVersions = function () {
    if (VersionSelectorService._versionsPromise) {
      return VersionSelectorService._versionsPromise;
    }

    VersionSelectorService._versionsPromise = $.ajax(
      'https://www.dso-toolkit.nl/versions.json?t=' + new Date().getTime()
    ).then((results) => {
      return results.versions;
    });

    return VersionSelectorService._versionsPromise;
  };
}
