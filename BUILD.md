De DSO Toolkit en componenten library zijn twee losse projecten in een repository.

De toolkit bestaat uit een .js, .css en wat assets. De styling is gebaseerd op Bootstrap 3.3.7. De toolkit wordt gemaakt met SASS en Rollup.js. De repository is aangesloten op IP-TEAMCITY en heeft twee build projecten: Build en Release.
* "Build" draait uit de dev of master branch. Het resultaat wordt automatisch naar dso-toolkit.nl gedeployed. Zie README.md voor verdere uitleg over de channels.
* "Release" wordt handmatig gestart. Zodra een maintainer op RUN drukt wordt er een dialoog geopend waar aangevinkt moet worden of het een LATEST release is, en welk versienummer. Dan wordt er een build gestart welke naar een VERSION wordt gedist op dso-toolkit.nl

De componenten bibliotheek is gemaakt met Fractal. De Fractal onderdelen staan in `/components` en `/docs`. De broncode van de toolkit staat in `/src`