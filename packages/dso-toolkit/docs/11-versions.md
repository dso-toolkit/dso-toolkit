---
label: Versies
---

De DSO Toolkit wordt continu bijgewerkt met de laatste iteraties en nieuwste onderdelen. Bekijk de changelog voor de wijzigingen per release van de toolkit. We werken met <a href="https://semver.org/" class="extern">Semantic Versioning</a>. Een duidelijke manier van het structureren van versienummers. Hierin maken we onderscheid in drie cijfers:

`Major.Minor.Patch`

* Major: Wanneer er een wijziging niet compatible is met de vorige release;
* Minor: Wanneer er functionaliteit wordt toegevoegd;
* Patch: Bugfixes en kleine toevoegingen;

## Changelog

<a href="https://github.com/dso-toolkit/dso-toolkit/blob/master/CHANGELOG.md" class="extern">De CHANGELOG.md is beschikbaar via onze GitHub repository</a>.

## Roadmap

Zie op GitHub waar we de komende tijd aan werken in de <a href="https://github.com/dso-toolkit/dso-toolkit/milestones" class="extern">DSO Toolkit Milestones</a>.

## Releases

Onderstaand overzicht toont alle releases van de DSO Toolkit.

<div id="versions-container"></div>

<script>
  document.addEventListener("DOMContentLoaded", function(event) { 
    getAllVersions().then(function (releases) {
      var $versionsContainer = $('#versions-container');

      releases.forEach(function (release) {
        var $col = $('<div><h3>' + release.label + '</h3><ul></ul></div>');
        var $list = $col.find('ul');

        release.versions.reverse().forEach(function (version, index) {
          $list.append($('<li><a href="/' + version.version + '">' + (version.label || version.version) + '</a></li>'));
        });

        $versionsContainer.append($col);
      })
    });
  });
</script>