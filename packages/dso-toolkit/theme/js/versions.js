import VersionSelectorService from './components/version-selector-service';

window.getAllVersions = function getAllVersions() {
  return VersionSelectorService.getVersions().then(function (versions) {
    return versions.reduce(function (branches, item) {
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
    return item.branch === 'topic' ? 'branch releases' : item.branch;
  }

  var versions = item.version.split('.');

  return `v${versions[0]}`;
}
