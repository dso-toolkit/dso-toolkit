# Changelog `@dso-toolkit/leaflet`
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## NEXT

## v1.2.5 - 2022-09-29

Niet alle event-emitters hebben React bindings ([#1706](https://github.com/dso-toolkit/dso-toolkit/issues/1706))

## v1.2.4 - 2022-06-23

Version bumps:

* `@dso-toolkit/core@>=39`
* `leaflet@^1.8.0`

## v1.2.3 - 2022-06-20

Version bump `@dso-toolkit/core@>=38`.

## v1.2.2 - 2022-05-04

In `package.json:exports` de property `"./": "./"` teruggezet. Deze property is niet geen onderdeel van de Node Exports Map specificatie, maar het wordt wel gebruikt door afnemers.

## v1.2.1 - 2022-05-04

Version bump `@dso-toolkit/core@^36.1.0`.

## v1.2.0 - 2022-03-02

### Added
* Ondersteuning voor `LayerOptions.minZoom` en `LayerOptions.maxZoom` ([#1432](https://github.com/dso-toolkit/dso-toolkit/issues/1432)). **Let op:** Eigen `minZoom/maxZoom` + `disabled` implementaties kunnen het beste worden ontmanteld.

## v1.1.0 - 2022-02-18

### Added
* `leaflet` en `react-leaflet` packages "MapControls" layers disabled state ([#1431](https://github.com/dso-toolkit/dso-toolkit/issues/1431))

### Fixed
* Map Buttons visual fixes ([#1412](https://github.com/dso-toolkit/dso-toolkit/issues/1412))

## v1.0.2 - 2022-01-17
Re-release of `v1.0.1` because of wrong build artifacts ([#1398](https://github.com/dso-toolkit/dso-toolkit/issues/1398))

## v1.0.1 - 2021-07-02

### Changed
* Map Control Button styling ([#1021](https://github.com/dso-toolkit/dso-toolkit/issues/1021))

## v1.0.0 - 2021-06-23
Initial release
