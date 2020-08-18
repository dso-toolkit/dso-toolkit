const $ = require('./jquery');

global.getAllVersions = function getAllVersions() {
  return $.ajax('https://www.dso-toolkit.nl/versions.json').then(function (results) {
    return results.versions.reduce(function (branches, item) {
      var branchLabel = getBranchLabel(item);
      var branch = branches.filter(function (r) {
        return r.label === branchLabel;
      })[0];

      if (!branch) {
        branch = {
          label: branchLabel,
          versions: []
        };

        branches.push(branch);
      }

      branch.versions.push(item);

      return branches;
    }, []).reverse();
  });
}

function getBranchLabel(item) {
  if (item.branch) {
    return item.branch;
  }

  var versions = item.version.split('.');

  return versions[0] + '.' + versions[1] + '.x';
}
