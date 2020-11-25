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
  document.addEventListener("DOMContentLoaded", function () {
    getAllVersions().then(function (releases) {
      const versionsContainer = document.querySelector("#versions-container");
      releases.forEach(function (release) {
        const div = document.createElement("div");
        versionsContainer.appendChild(div);
        const h3 = document.createElement("h3");
        div.appendChild(h3);
        h3.textContent = release.label;
        const ul = document.createElement("ul");
        div.appendChild(ul);
        release.versions.reverse().forEach(function (version) {
          const li = document.createElement("li");
          ul.appendChild(li);
          const a = document.createElement("a");
          li.appendChild(a);
          a.setAttribute("href", "/" + version.version);
          a.textContent = version.label || version.version;
        });
      });
    });
  });
</script>