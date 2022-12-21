# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## NEXT

### Added
* Storybook Composition ([#1869](https://github.com/dso-toolkit/dso-toolkit/issues/1869)).
* Angular package publish naar NPM met Nx workspaces ([#1928](https://github.com/dso-toolkit/dso-toolkit/issues/1928))
* **core:** `dso-accordion-section` scrolled de content into view als dat nodig is bij uitklappen. Sections kunnen ook programmatisch in beeld gescrolled worden met `scrollSectionIntoView()`.\
`toggleSection()` is uitgebreid met een param `scrollIntoView: boolean = true`. Door de param op false te zetten toggled de sectie zonder dat er gescrolled wordt. ([#1875](https://github.com/dso-toolkit/dso-toolkit/issues/1875))

## Changed
* Meta packages `@dso-toolkit/css` en `@dso-toolkit/sources` fuseren naar `dso-toolkit` ([#1871](https://github.com/dso-toolkit/dso-toolkit/issues/1871)).

## 48.0.0

### Added
* **core + react + sources + css:** Tabel class `.dso-table-vertical-lines` kan op `table` gezet worden om verticale borders toe te voegen ([#1913](https://github.com/dso-toolkit/dso-toolkit/issues/1913))\
Voor tabellen in `<dso-ozon-content>` staan verticale borders altijd aan.
* **angular:** Angular componenten documentatie in Angular Storybook toegevoegd ([#1908](https://github.com/dso-toolkit/dso-toolkit/issues/1908)).
* **core:** Webcomponent Accordion: Animaties ([#1846](https://github.com/dso-toolkit/dso-toolkit/issues/1846))

### Fixed
* **core + css + sources:** `<dso-modal>` Grijze overlay toont soms bovenop de modal. ([#1902](https://github.com/dso-toolkit/dso-toolkit/issues/1902))\
Dit is ook fixed in de `<dso-table>` vergroot tabel modal.
* percy.cy.ts faalt incidenteel ([#1899](https://github.com/dso-toolkit/dso-toolkit/issues/1899)).

### Changed
* **BREAKING core + react + sources:** De api van `<dso-tooltip>` is gewijzigd. De tooltip vereist nu altijd een uniek `[id]` attribuut, dit id moet te vinden zijn op het element beschreven wordt met `[aria-describedby]`. Zie onderstaand voorbeeld. ([#1782](https://github.com/dso-toolkit/dso-toolkit/issues/1782))
```
<button type="button" aria-describedby="ariaId">Hover of focus me</button>
<dso-tooltip position="bottom" id="ariaId">Tooltip</dso-tooltip>
```
* **BREAKING** Nieuw documentatieplatform. Zie blog op www.dso-toolkit.nl voor meer informatie ([#1868](https://github.com/dso-toolkit/dso-toolkit/issues/1868)).
* **core:** `dso-table` modal benut nu de volledige hoogte van de pagina ([#1879](https://github.com/dso-toolkit/dso-toolkit/issues/1879))
* **core:** `dso-selectable` focus-styling verbeterd ([#1845](https://github.com/dso-toolkit/dso-toolkit/issues/1845))

## 47.0.1

### Fixed
* **core:** Core importeert `ModalRole` uit sources ([#1912](https://github.com/dso-toolkit/dso-toolkit/issues/1912)).

## 47.0.0

### Deprecated
* Icoon `status-danger` is deprecated en gaat worden verwijderd. `status-warning-inline` of `status-error` kunnen gebruikt worden om het icoon mee te vervangen. Zie issue voor andere nieuwe iconen. ([#1812](https://github.com/dso-toolkit/dso-toolkit/issues/1812))

### Changed
* **BREAKING: all:** Verhuizen voorbeeldpagina's ([#1844](https://github.com/dso-toolkit/dso-toolkit/issues/1844))\
  Door een documentatie discrepentie is er mogelijk sprake van een breaking change. Op `.form-group.dso-static` werd zowel `.has-edit` als `.dso-edit` gecommuniceerd. Dit is uniform gemaakt en alleen `.dso-edit` wordt nu ondersteund:
  ```html
  <div class="form-group dso-static dso-edit">
  ```
* **BREAKING: all:** Aanpassing iconenset en alert notificaties. Alert component heeft niet langer `.alert-danger` dit moet worden vervangen met `.alert-error` ([#1812](https://github.com/dso-toolkit/dso-toolkit/issues/1812))
* **sources + storybook:** anchorTemplate() en buttonTemplate() toepassen ([#1867](https://github.com/dso-toolkit/dso-toolkit/issues/1867))
* Percy omgelegd naar Cypress en Storybook ([#1851](https://github.com/dso-toolkit/dso-toolkit/issues/1851))

### Added
* **core + react + sources + storybook:** `<dso-card>` Web component ([#1800](https://github.com/dso-toolkit/dso-toolkit/issues/1800))\
  En ook `<dso-card-container>` om de card in op te nemen. Dit component ondersteund `mode="list"` en `mode="grid"`
* `eslint-plugin-lit` rules ([#1873](https://github.com/dso-toolkit/dso-toolkit/issues/1873))

### Fixed
* **core:** Accordion compact: inspring klopt niet ([#1883](https://github.com/dso-toolkit/dso-toolkit/issues/1883))
* TemplateContainer valt onterecht terug op CSS implementatie ([#1890](https://github.com/dso-toolkit/dso-toolkit/issues/1890))
* **core + css:** Header: smalle viewport: Menu toont niet bij dropdownmenu never, en sub-logo valt buiten de header ([#1889](https://github.com/dso-toolkit/dso-toolkit/issues/1889))
* **core:** `<dso-ozon-content>` kan lege titels/bijschrift div renderen bij image-overlay via Figuur node ([#1881](https://github.com/dso-toolkit/dso-toolkit/issues/1881))

## 46.0.0

### Deprecated
* `<dso-tooltip>` Het element wat beschreven wordt met de tooltip zal in plaats van `id` een `aria-describedby` nodig hebben. Meer informatie in het issue. ([#1782](https://github.com/dso-toolkit/dso-toolkit/issues/1782))\


### Added
* **BREAKING: core + css + react + sources:** `<dso-modal>` Web component ([#1793](https://github.com/dso-toolkit/dso-toolkit/issues/1793))\
De optional `.dso-confirm` class op `div.dso-modal` is verwijderd. Deze class was verantwoordelijk voor `button:first-child { float: left; }`
* **core + css + sources + dso-toolkit:** Prettier en ESLint ([#1441](https://github.com/dso-toolkit/dso-toolkit/issues/1441))
* **sources:** Highlightbox banner-image ([#1813](https://github.com/dso-toolkit/dso-toolkit/issues/1813))
* **core + react:** Modal Webcomponent: Mogelijk maken sluitkruis te verbergen ([#1884](https://github.com/dso-toolkit/dso-toolkit/issues/1884))

### Fixed
* **core:** Overlay toont geen shadow in Safari ([#1840](https://github.com/dso-toolkit/dso-toolkit/issues/1840))
* **sources:** Tiles component en pagina's: decoratieve afbeeldingen moeten alt="" krijgen ([#1841](https://github.com/dso-toolkit/dso-toolkit/issues/1841))
* **core:** ViewerGrid: dsoMainSizeChange 'end' fires too early ([1847](https://github.com/dso-toolkit/dso-toolkit/issues/1847))

### Changed
* **css + sources:** Document header: state toevoegen tbv sticky maken ([#1809](https://github.com/dso-toolkit/dso-toolkit/issues/1809))
* **core + css + react:** Webcomponent Accordion: Algemene verbeteringen ([#1826](https://github.com/dso-toolkit/dso-toolkit/issues/1826))
* **core + css + sources:** Aanpassing chevrons in accordion component ([#1827](https://github.com/dso-toolkit/dso-toolkit/issues/1827))
* **all:** Package updates ([#1852](https://github.com/dso-toolkit/dso-toolkit/issues/1852))
* **core + sources:** Icoon toevoegen - meerdere kaartlagen ([#1859](https://github.com/dso-toolkit/dso-toolkit/issues/1859))
* **core + css + sources + dso-toolkit:** Prettier en ESLint ([#1441](https://github.com/dso-toolkit/dso-toolkit/issues/1441))

## 45.2.0

### Added
* **core + react + sources:** `<dso-table>` Web component ([#1627](https://github.com/dso-toolkit/dso-toolkit/issues/1627))
* **core + react + sources:** `<dso-table>` Tabel kunnen openen in modal ([#1759](https://github.com/dso-toolkit/dso-toolkit/issues/1759))

### Fixed
* **sources:** Icon button lijnt niet goed verticaal uit in de highlightbox ([#1761](https://github.com/dso-toolkit/dso-toolkit/issues/1761))
* **core:** Pagination Web Component: Prev en Next pages gedragen zich als First en Last ([#1833](https://github.com/dso-toolkit/dso-toolkit/issues/1833))
* **core + sources:** Ozon content - lijst: lijst is geen html lijst ([#1792](https://github.com/dso-toolkit/dso-toolkit/issues/1792))
* **core:** Dropdown menu header wordt niet goed getoond ([#1814](https://github.com/dso-toolkit/dso-toolkit/issues/1814))
* **core:** Helpcenter panel: role=dialog op modal zetten ([#1835](https://github.com/dso-toolkit/dso-toolkit/issues/1835))

### Changed
* **core:** Helpcenterpanel - Responsive maken ([#1781](https://github.com/dso-toolkit/dso-toolkit/issues/1781))
* **core + css:** Header styling verbeteringen ([#1763](https://github.com/dso-toolkit/dso-toolkit/issues/1763))
* **core + css + sources + dso-toolkit:** Overstappen naar Sass modules (@use ipv @import) ([#1805](https://github.com/dso-toolkit/dso-toolkit/issues/1805))

## 45.1.0

### Added
* **core + css + react + sources:** Accordion web component ([#1696](https://github.com/dso-toolkit/dso-toolkit/issues/1696))

### Fixed
* **core:** Helpcenter Panel: iframe content laden alleen als de panel open is ([#1678](https://github.com/dso-toolkit/dso-toolkit/issues/1678))
* **core:** Viewer grid: Focus trap negeert focusable elements in shadow-dom ([#1756](https://github.com/dso-toolkit/dso-toolkit/issues/1756))
* **css + sources + storybook:** Styling issues Document header ([#1760](https://github.com/dso-toolkit/dso-toolkit/issues/1760))
* **core:** Viewer grid: resize knopjes hebben geen label ([#1709](https://github.com/dso-toolkit/dso-toolkit/issues/1709))

### Changed
* `@mixin di()` en `@mixin di-variant()` uit @dso-toolkit/core verwijderen ([#1752](https://github.com/dso-toolkit/dso-toolkit/issues/1752))
* `@mixin di()` verhuizen van `packages/sources` naar `packages/css` ([#1804](https://github.com/dso-toolkit/dso-toolkit/issues/1804))
* **core + sources:** Pagination: Werkvorm afstemmen met beschikbare ruimte ([#1772](https://github.com/dso-toolkit/dso-toolkit/issues/1772))
* **core + sources** Ozon content <Figuur> Titel, bijschrift, en bron mapping ([#1730](https://github.com/dso-toolkit/dso-toolkit/issues/1730))
* **core:** Helpcenterpanel - stop background scroll and trap focus ([#1770](https://github.com/dso-toolkit/dso-toolkit/issues/1770))
* TemplateContainer ipv. ES6 imports voor component dependencies ([#1808](https://github.com/dso-toolkit/dso-toolkit/issues/1808))

## 45.0.1

### Fixed
* **core:** Fixed: packages/dso-toolkit/src/styles/components/_navbar.scss heeft relatief pad ([#1801](https://github.com/dso-toolkit/dso-toolkit/issues/1801))

## 45.0.0

### Fixed
* **BREAKING: core + css + react + sources:** Niet alle event-emitters hebben React bindings ([#1706](https://github.com/dso-toolkit/dso-toolkit/issues/1706)) **Custom event properties hebben een dso prefix gekreken ([#1789](https://github.com/dso-toolkit/dso-toolkit/pull/1789))**
* **css:** Elementen verdwijnen achter `dso-document-list-item` ([#1764](https://github.com/dso-toolkit/dso-toolkit/issues/1764))
* **core:** Header: Dropdown menu toont soms niet in kleine viewport ([#1727](https://github.com/dso-toolkit/dso-toolkit/issues/1727))
* **core:** Header: dropdownmenu 'always' werkt bij initiele render niet ([#1796](https://github.com/dso-toolkit/dso-toolkit/issues/1796))
* **sources:** Label mist max-width: 100% ([#1766](https://github.com/dso-toolkit/dso-toolkit/issues/1766))
* **sources:** Tertiare button heeft een kapotte underline ([#1788](https://github.com/dso-toolkit/dso-toolkit/issues/1788))
* **sources:** Badge component hoogte aanpassen ([#1704](https://github.com/dso-toolkit/dso-toolkit/issues/1704))

### Changed
* **BREAKING: core + css:** Info: sluitknopje in DOM onderaan ([#1707](https://github.com/dso-toolkit/dso-toolkit/issues/1707))\
Het sluitknopje is verplaatst, zie PR voor geldige markup ([#1765](https://github.com/dso-toolkit/dso-toolkit/pull/1765))
* **BREAKING: css + sources:** Invalid velden: `aria-errormessage` in plaats van `aria-describedby` gebruiken ([#1715](https://github.com/dso-toolkit/dso-toolkit/issues/1715))
* **BREAKING: core:** Progress bar / indicator: WCAG verbeteringen ([#1714](https://github.com/dso-toolkit/dso-toolkit/issues/1714))\
`Progress Bar` en `Progress Indicator` labels staan nu als eerste element en worden gevolgd door het visuele `progress` kenmerk ([#1748](https://github.com/dso-toolkit/dso-toolkit/pull/1748))
* **core + sources + storybook:** Autosuggest: null kunnen meegeven aan suggestions voor 'nog niet gezocht' ([#1784](https://github.com/dso-toolkit/dso-toolkit/issues/1784))
* **core + css + dso-toolkit:** Verhuizen van global stijling naar `@dso-toolkit/css/` ([#1751](https://github.com/dso-toolkit/dso-toolkit/issues/1751))
* **core + css + sources:** /sources variables en mixins verhuizen naar /sources/components ([#1777](https://github.com/dso-toolkit/dso-toolkit/issues/1777))
* **core:** `dso-map-controls`: naam sluitknopje ([#1722](https://github.com/dso-toolkit/dso-toolkit/issues/1722))
* **css + dso-toolkit:** Verhuizen van dso-toolkit/libs/bootstrap ([#1771](https://github.com/dso-toolkit/dso-toolkit/issues/1771))
* **css + dso-toolkit:** Gedateerde componenten/styling opruimen ([#1458](https://github.com/dso-toolkit/dso-toolkit/issues/1458))
* **sources:** Afstand tussen chevron en tekst verkleinen ([#1725](https://github.com/dso-toolkit/dso-toolkit/issues/1725))

## 44.0.0

### Fixed
* **core + sources:** `ExtIoRef`: href ontbreekt ([#1728](https://github.com/dso-toolkit/dso-toolkit/issues/1728))
* **core:** `dso-ozon-content[interactive]` hanteert ongewenste styling ([#1737](https://github.com/dso-toolkit/dso-toolkit/issues/1737))

### Changed
* **core + css:** De HTML/CSS Storybook en Core Storybook zijn gefuseerd. ([#1438](https://github.com/dso-toolkit/dso-toolkit/issues/1438))
* **core:** Autosuggest: `aria-owns` op de input vervangen met `aria-controls` ([#1716](https://github.com/dso-toolkit/dso-toolkit/issues/1716))
* **css + dso-toolkit:** Panel verhuizen naar @dso-toolkit/css ([#1476](https://github.com/dso-toolkit/dso-toolkit/issues/1476))
* **core:** Label: a11y - bij truncate `aria-roledescription` meegeven en verwijder knopje "Verwijder <X>" tekst ([#1721](https://github.com/dso-toolkit/dso-toolkit/issues/1721))
* **core + css + sources + storybook** Label-group en Label component; WCAG verbeteringen (WCAG SC 1.3.1)  ([#1712](https://github.com/dso-toolkit/dso-toolkit/issues/1712))
* **dso-toolkit + css:** Ontmantelen van `.dso-normalize` ([#1749](https://github.com/dso-toolkit/dso-toolkit/issues/1749))
* **dso-toolkit** Nieuwe Homepage etaleren ([#1684](https://github.com/dso-toolkit/dso-toolkit/issues/1684))
* **core:** Label: Bij truncaten gaten opvullen ([#1734](https://github.com/dso-toolkit/dso-toolkit/issues/1734))

### Added
* **css + sources:** Legenda afbeelding toevoegen in Card component ([#1682](https://github.com/dso-toolkit/dso-toolkit/issues/1682))
* **core:** Viewer grid: toegankelijkheid bediening breedte kaartpaneel ([#1708](https://github.com/dso-toolkit/dso-toolkit/issues/1708))

### Deprecated
* **BREAKING: css + storybook + sources:** Button selectors van Bootstrap deprecaten ([#1663](https://github.com/dso-toolkit/dso-toolkit/issues/1663))

## 43.1.0

### Added
* **core + react + sources** `dso-autosuggest` vertraging op loading state ([#1625](https://github.com/dso-toolkit/dso-toolkit/issues/1625))
* **core + sources:** Ozon Content `<Figuur>` omzetten naar `<dso-image-overlay>` ([#1659](https://github.com/dso-toolkit/dso-toolkit/issues/1659))

### Fixed
* **sources:** Form Group Input Number: label lijnt niet met nummer ([#1672](https://github.com/dso-toolkit/dso-toolkit/issues/1672))
* **react** React Storybook: Bij Date Picker worden de actions niet getoond ([#1664](https://github.com/dso-toolkit/dso-toolkit/issues/1664))
* **css:** Als de tekst te lang is dan loopt ie over de 'Hele document bekijken'-knop heen ([#1652](https://github.com/dso-toolkit/dso-toolkit/issues/1652))
* **css:** Viewer Grid: .document-list-item mist margin right voor .dso-document-list-item-type ([#1649](https://github.com/dso-toolkit/dso-toolkit/issues/1649))
* **core** DsoToggletip: Error: button not found ([#1670](https://github.com/dso-toolkit/dso-toolkit/issues/1670))
* **core + css:** Gebruiker kan tekstgrootte niet wijzigen dmv browser-instellingen (WCAG SC 1.4.4) ([#1647](https://github.com/dso-toolkit/dso-toolkit/issues/1647))

### Changed
* **core:** Afbeelding in dso-image-overlay alleen zoomable maken als de afbeelding niet in de container past ([#1695](https://github.com/dso-toolkit/dso-toolkit/issues/1695))

## 43.0.0

### Changed
* **BREAKING: css:** Document Item uitbreiden met container voor regels ([#1657](https://github.com/dso-toolkit/dso-toolkit/issues/1657))\
het element `.dso-document-list-item` omvat het hele item (heading + content). Wrap de huidige content in `.dso-document-list-item-heading` (dit is het grijze vlak). `.dso-document-list-item-content` kan gebruikt worden om content onder de heading te tonen in een wit vlak. ([#1687](https://github.com/dso-toolkit/dso-toolkit/pull/1687))
* **core + css + dso-toolkit:** Formulier stijling overzetten ([#1194](https://github.com/dso-toolkit/dso-toolkit/issues/1194))
* **dso-toolkit + sources + css:** Form Buttons verhuizen naar @dso-toolkit/css ([#1668](https://github.com/dso-toolkit/dso-toolkit/issues/1668))

### Fixed
* **BREAKING: css:** Aanpassing document header ([#1681](https://github.com/dso-toolkit/dso-toolkit/issues/1681))\
`.dso-document-header-type` en `.dso-document-header-owner` horen nu in een `.dso-document-header-owner-wrapper` te staan. Eventuele badges horen nu in een `.dso-document-header-badges` te staan
* **core** Pagination prev/next button niet tonen als `current-page` out of bounds of undefined is ([#1680](https://github.com/dso-toolkit/dso-toolkit/issues/1680))
* **core** Ozon Content: In Storybook markeren als "verwijderd" verschuift de elementen ([#1658](https://github.com/dso-toolkit/dso-toolkit/issues/1658))

### Added
* **dso-toolkit** Helpcentrum voorbeeldpagina's ([#1455](https://github.com/dso-toolkit/dso-toolkit/issues/1455))
* **core + css + dso-toolkit + sources:** List component uitbreiden met `img-list` variant ([#1622](https://github.com/dso-toolkit/dso-toolkit/issues/1622))
* **core + sources:** `dso-ozon-content` uitbreiden met IntloRef ([#1655](https://github.com/dso-toolkit/dso-toolkit/issues/1655))
* **dso-toolkit + sources:** Spinners in knoppen etaleren ([#1690](https://github.com/dso-toolkit/dso-toolkit/issues/1690))
* **core + react + sources** `dso-autosuggest` uitbreiden met not found state ([#1626](https://github.com/dso-toolkit/dso-toolkit/issues/1626))
* **core:** Tree View: Scroll to item ([#1434](https://github.com/dso-toolkit/dso-toolkit/issues/1434))
* **core + react:** Lange labels kunnen afbreken. `dso-label` is uitgebreid met het `truncate` attribuut. Labels breken hier af en kunnen volledig getoond worden door op de tekst te hoveren. ([#1314](https://github.com/dso-toolkit/dso-toolkit/issues/1314))
* **core** `dso-tooltip` sluiten met escape knop ([#1689](https://github.com/dso-toolkit/dso-toolkit/issues/1689))

## 42.0.0

### Changed
* **BREAKING: core + sources:** Header: Removed `menuItemClick` event emitter. Added `headerClick` event emitter, deze emit wanneer de gebruiker op een menu item, profiel link, user home, login/logout klikt. Het navigeren (anchor) wordt niet door het component met event.preventDefault() afgevangen. Fixed: Als er geen menu items zijn toont de overige functionaliteit niet. ([#1669](https://github.com/dso-toolkit/dso-toolkit/issues/1669))
* **BREAKING: core + sources:** Header: Login and Logout renderen als `<button>` wanneer er geen url is opgegeven. `is-logged-in` is vervangen met `auth-status: 'none' | 'loggedOut' | 'loggedIn'` ([#1662](https://github.com/dso-toolkit/dso-toolkit/issues/1662))
* **sources:** Content-security-policy issue met SVG spritesheet voor iconen met style="fill: #hex;" ([#1676](https://github.com/dso-toolkit/dso-toolkit/issues/1676))

### Removed
* **BREAKING: core + css + dso-toolkit + sources:** Conclusion definitief verwijderen ([#1643](https://github.com/dso-toolkit/dso-toolkit/issues/1643))

## 41.0.1

### Fixed
* **react:** `@dso-toolkit/react` heeft verkeerde `@dso-toolkit/core` peerDependency ([#1673](https://github.com/dso-toolkit/dso-toolkit/issues/1673))

## 41.0.0

### Changed
* **BREAKING: css + sources:** Form Group: Search Bar naar @dso-toolkit/css: ([#1614](https://github.com/dso-toolkit/dso-toolkit/issues/1614)) **Class `dso-filter` is hernoemd naar `dso-form-group-search-bar` ([#1642](https://github.com/dso-toolkit/dso-toolkit/pull/1642))**
* **BREAKING: core + react:** Pagination: bugfix: Vorige en volgende pagina emitten altijd de eerste en laatge pagina. Changed: Het navigeren (anchor) wordt niet meer door het component met event.preventDefault(). Added: selectPage event emit nu `isModifiedEvent` wanneer een pagina is geselecteerd met een modifier key (Ctrl/Alt/Shift/Meta) ([#1667](https://github.com/dso-toolkit/dso-toolkit/issues/1667))
* **dso-toolkit + sources + css:** `.dso-justify-form-groups` onderbrengen in @dso-toolkit/css ([#1646](https://github.com/dso-toolkit/dso-toolkit/issues/1646))
* **css:** Info button staat niet op dezelfde regel als het label over twee regels loopt ([#1623](https://github.com/dso-toolkit/dso-toolkit/issues/1623))

## 40.1.0

### Added
* **core + react:** Pagination Web Component ([#1638](https://github.com/dso-toolkit/dso-toolkit/issues/1638))
* **core + sources:** dso-tooltip voorzien van positioning strategy parameter ([#1641](https://github.com/dso-toolkit/dso-toolkit/issues/1641))
* **core**: `dso-ozon-content` met prefix en suffix ([#1628](https://github.com/dso-toolkit/dso-toolkit/issues/1628))

### Fixed
* **core:** Datepicker bugs: Backspace zet cursor soms onterecht aan het einde van de input, MacOS Cmd + v en soortgelijke commands worden afgebroken ([#1597](https://github.com/dso-toolkit/dso-toolkit/issues/1597))

### Changed
* **css** `dso-icons.svg`: Inline `<style>` elementen met `color: <kleur>` vervangen met `fill="<kleur>"` tbv. Content-security-policy issue met SVG spritesheet voor iconen ([#1600](https://github.com/dso-toolkit/dso-toolkit/issues/1600))
* **dso-toolkit + css:** packages\dso-toolkit\src\styles\mixins\_grid.scss mergen met packages\sources\src\styling\grid\grid.scss ([#1644](https://github.com/dso-toolkit/dso-toolkit/issues/1644))
* **dso-toolkit + css:** Component "Tabs" verhuizen naar @dso-toolkit/css ([#1645](https://github.com/dso-toolkit/dso-toolkit/issues/1645))

## 40.0.0

### Added
* **core:** dso-header logout link verrijken met logoutClick event ([#1605](https://github.com/dso-toolkit/dso-toolkit/issues/1605))

### Deprecated
* **BREAKING: dso-toolkit:** Conclusion ([#1624](https://github.com/dso-toolkit/dso-toolkit/issues/1624))

### Added
* **BREAKING: core:** Nieuw component `<dso-responsive-element />` ([#1456](https://github.com/dso-toolkit/dso-toolkit/issues/1456)) **Zie markup voorschriften van Viewer Grid. De componenten `.dso-tile-grid`, `.dso-document-list` en `.dso-document-list-item` moeten nu expliciet gebruik maken van `<dso-reponsive-element>`.**

### Changed
* **css + sources:** Accordion button en link implementatie etaleren ([#1481](https://github.com/dso-toolkit/dso-toolkit/issues/1481))
* **dso-toolkit + css:** Form Group: Confirm naar @dso-toolkit/css ([#1611](https://github.com/dso-toolkit/dso-toolkit/issues/1611))
* **dso-toolkit + sources + css:** Header margins in legends aanpassen ([#1572](https://github.com/dso-toolkit/dso-toolkit/issues/1572))
* **dso-toolkit + css:** Form Group: Select verhuizen naar @dso-toolkit/css ([#1615](https://github.com/dso-toolkit/dso-toolkit/issues/1615))
* **dso-toolkit + css:** Form Group: Static verhuizen naar @dso-toolkit/css ([#1616](https://github.com/dso-toolkit/dso-toolkit/issues/1616))
* **dso-toolkit + css:** Form Group: Textarea verhuizen naar @dso-toolkit/css ([#1617](https://github.com/dso-toolkit/dso-toolkit/issues/1617))
* **dso-toolkit + css:** Form Group: Input Number naar @dso-toolkit/css ([#1613](https://github.com/dso-toolkit/dso-toolkit/issues/1613))
* **dso-toolkit + css:** Form Group: Files naar @dso-toolkit/css ([#1612](https://github.com/dso-toolkit/dso-toolkit/issues/1612))

### Fixed
* **dso-toolkit + core:** `dso-info` in `.formgroup.dso-radios, .form-group.dso-checkboxes` mist `aria-describedby` ([#1399](https://github.com/dso-toolkit/dso-toolkit/issues/1399))
* **core:** Map controls: onjuist toetsenbord gedrag keuzerondjes ([#1573](https://github.com/dso-toolkit/dso-toolkit/issues/1573))
* **sources:** Anchor states en Tile Active zijn inconsistent ([#1368](https://github.com/dso-toolkit/dso-toolkit/issues/1368))

## 39.0.0

### Added
**react**: Support voor `react@^18.2.0`, `react-dom@^18.2.0` `leaflet@1.8.0`, `react-leaflet@^4.0.0` en `@react-leaflet/core@^2.0.0` ([#1579](https://github.com/dso-toolkit/dso-toolkit/issues/1579))

### Changed
* **dso-toolkit + sources:** Definition list marge tussen dd + dt's verkleinen naar 8px ([#1565](https://github.com/dso-toolkit/dso-toolkit/issues/1565))
* **dso-toolkit + sources:** Woordafbreking alleen als deze niet op een eigen regel past ([#1585](https://github.com/dso-toolkit/dso-toolkit/issues/1585))
* **BREAKING: core + sources:** Update Documentheader ([#1515](https://github.com/dso-toolkit/dso-toolkit/issues/1515)) **Story `with search results` opgeknipt in 3 losse stories; `Filterblok`, `Document Header`, `Document Item` ([#1599](https://github.com/dso-toolkit/dso-toolkit/pull/1599))**

### Fixed
* **core:** Controls in verborgen Map Controls paneel met toetsenbord focus bereikbaar ([#1574](https://github.com/dso-toolkit/dso-toolkit/issues/1574))

## 38.1.1

### Fixed
* **core:** `error TS2304: Cannot find name 'MainSize'` ([#1598](https://github.com/dso-toolkit/dso-toolkit/issues/1598))

### Changed
* **dso-toolkit + css:** Form: "Radios" verhuizen naar @dso-toolkit/css + Storybook ([#1560](https://github.com/dso-toolkit/dso-toolkit/issues/1560))

## 38.1.0

### Added
* **sources + core:** dso-viewer-grid: Initiële breedte van het linkerpaneel "main" instelbaar ([#1556](https://github.com/dso-toolkit/dso-toolkit/issues/1556))
* **core:** dso-ozon-content met `[interactive]` als interactief element visualiseren + click event emitten ([#1569](https://github.com/dso-toolkit/dso-toolkit/issues/1569))

### Changed
* **dso-toolkit + css:** Form: "Checkboxes" verhuizen naar @dso-toolkit/css + Storybook ([#1559](https://github.com/dso-toolkit/dso-toolkit/issues/1559))
* **dso-toolkit + css:** Overblijfselen "Search Bar" verhuizen naar `@dso-toolkit/css` ([#1466](https://github.com/dso-toolkit/dso-toolkit/issues/1466))
* **dso-toolkit:** NPM dependency `jquery-pjax` van een versie voorzien ([#1594](https://github.com/dso-toolkit/dso-toolkit/issues/1594))

### Fixed
* **core:** Dropdown menu sluit niet meer bij selecteren van item ([#1580](https://github.com/dso-toolkit/dso-toolkit/issues/1580))
* **css + dso-toolkit + sources:** Shopping Cart 'non-collapsable' variant toevoegen ([#1581](https://github.com/dso-toolkit/issues/1581))
* **core:** @dso-toolkit/core "focus-trap" is onterecht een devDependency ([#1591](https://github.com/dso-toolkit/issues/1591))

## 38.0.0

### Added
* **sources + core:** Autosuggest loading state toevoegen ([#1582](https://github.com/dso-toolkit/dso-toolkit/issues/1582))

### Changed
* **BREAKING: dso-toolkit + css + sources:** Wijziging ondermarges dso-rich-content en highlightbox ([#1558](https://github.com/dso-toolkit/dso-toolkit/issues/1558)) **Markup changes, see PR ([#1571](https://github.com/dso-toolkit/dso-toolkit/pull/1571))**
* **core:** WCAG verbeteringen voor helpcenter-panel ([#1577](https://github.com/dso-toolkit/dso-toolkit/issues/1577))

### Fixed
* **BREAKING: css + core + dso-toolkit + sources:** Toegankelijkheidsissues met tooltip en toggletip ([#1548](https://github.com/dso-toolkit/dso-toolkit/issues/1548)) **Markup changes, see PR ([#1578](https://github.com/dso-toolkit/dso-toolkit/pull/1578))**

## 37.0.0

### Added
* **core:** `<dso-ozon-content inline>` en ondersteuning voor `<Opschrift>` ([#1530](https://github.com/dso-toolkit/dso-toolkit/issues/1530))
* **core:** `<dso-ozon-content deleted>` voor het markeren van verwijderde content ([#1518](https://github.com/dso-toolkit/dso-toolkit/issues/1518))
* **sources + dso-toolkit + css + core:** Badge; `badge-outline` toevoegen ([#1534](https://github.com/dso-toolkit/dso-toolkit/issues/1534))

### Removed
* **BREAKING: css:** .input-group verwijderen ([#1462](https://github.com/dso-toolkit/dso-toolkit/issues/1462))
* **dso-toolkit + css + core:** sr-only tekst uit badges verwijderen ([#1570](https://github.com/dso-toolkit/dso-toolkit/issues/1570))

### Fixed
* **BREAKING: dso-toolkit + css:** Shopping cart: ontbrekend aria-expanded attribuut op button ([#1511](https://github.com/dso-toolkit/dso-toolkit/issues/1511)) **Markup changes, see PR ([#1562](https://github.com/dso-toolkit/dso-toolkit/pull/1562))**
* **css:** Accordion: overflow: hidden van section-handle af ([#1522](https://github.com/dso-toolkit/dso-toolkit/issues/1522))

### Changed
* **dso-toolkit + css:** Form verhuizen naar `@dso-toolkit/css` ([#1461](https://github.com/dso-toolkit/dso-toolkit/issues/1461))
* **css + core + dso-toolkit + sources:** dso-icon heeft relatieve maatvoering ([#1542](https://github.com/dso-toolkit/dso-toolkit/issues/1542))
* **css + core + dso-toolkit + sources:** Step counter icoon moet op bosgroen staan ([#1557](https://github.com/dso-toolkit/dso-toolkit/issues/1557))
* **dso-toolkit + css:** Uitbreiding Shopping Cart met functie 'alles verwijderen' ([#1510](https://github.com/dso-toolkit/dso-toolkit/issues/1510))
* **dso-toolkit + css:** Shopping cart: labels knoppen ([#1512](https://github.com/dso-toolkit/dso-toolkit/issues/1512))

## 36.3.0

### Added
* **core:** Viewer Grid: Resize buttons emitten `sizeChangeEvent` ([#1553](https://github.com/dso-toolkit/dso-toolkit/issues/1553))

## 36.2.0

### Added
* **dso-toolkit:** Card Panel als patroon etaleren bij voorbeeldpagina's ([#1539](https://github.com/dso-toolkit/dso-toolkit/issues/1539))

### Fixed
* **dso-toolkit:** Correctie alt attributen in img tags voor whitebox en tile ([#1540](https://github.com/dso-toolkit/dso-toolkit/issues/1540))
* **core:** Accessibility issues na package updates ([#1532](https://github.com/dso-toolkit/dso-toolkit/issues/1532))
* **core:** Date Picker forceert ruimte voor kalender ([#1324](https://github.com/dso-toolkit/dso-toolkit/issues/1324))

### Changed
* **css:** Cards marge heading verkleinen ([#1514](https://github.com/dso-toolkit/dso-toolkit/issues/1514))
* **css + dso-toolkit:** Modal verhuizen naar `@dso-toolkit/css` ([#1463](https://github.com/dso-toolkit/dso-toolkit/issues/1463))

## 36.1.0

### Added
* **dso-toolkit:** Illustraties helpcentrum ([#1535](https://github.com/dso-toolkit/dso-toolkit/issues/1535))

### Fixed
* **react:** Update `@dso-toolkit/react` peer dependency `"@dso-toolkit/core": "*"` naar laatste versie ([#1545](https://github.com/dso-toolkit/dso-toolkit/issues/1545))
* **css:** Paragraaf in Card heading zorgt voor overbodige marge ([#1513](https://github.com/dso-toolkit/dso-toolkit/issues/1513))
* **core:** `@stencil/core` als dependency opnemen ([#1546](https://github.com/dso-toolkit/dso-toolkit/issues/1546))

## 36.0.0

### Added
* **css + core + dso-toolkit + sources:** Z-index register ([#1429](https://github.com/dso-toolkit/dso-toolkit/issues/1429))
* **sources:** Contrast mode styling radiobuttons en checkboxes ([#1521](https://github.com/dso-toolkit/dso-toolkit/issues/1521))
* **css + sources:** Nieuw component "Button row" ([#1492](https://github.com/dso-toolkit/dso-toolkit/issues/1492))

### Fixed
* **core:** dso-ozon-content toont geen noten ([#1529](https://github.com/dso-toolkit/dso-toolkit/issues/1529))

### Changed
* **dso-toolkit:** Component button row toevoegen aan Voorbeeldpagina's ([#1493](https://github.com/dso-toolkit/dso-toolkit/issues/1493))
* **core:** Look en feel Tree View aangepast. ([#1508](https://github.com/dso-toolkit/dso-toolkit/issues/1508))
* **all:** Package updates ([#1500](https://github.com/dso-toolkit/dso-toolkit/issues/1500))
* **core:** Ozon Content: Noten "Description" vervangen met "Toggle Noot" compositie ([#1288](https://github.com/dso-toolkit/dso-toolkit/issues/1288))
* **core + sources:** Header component uitbreiden met MenuItemClick event ([#1525](https://github.com/dso-toolkit/dso-toolkit/issues/1525))
* **core + sources:** Variant van Header zonder menu. ([#1491](https://github.com/dso-toolkit/dso-toolkit/issues/1491))

### Removed
* **BREAKING: css:** Removed Description variant `note` ([#1288](https://github.com/dso-toolkit/dso-toolkit/issues/1288))

## 35.0.0

### Added
* **BREAKING: core:** `<dso-ozon-content />` XML support 🎉 ([#1390](https://github.com/dso-toolkit/dso-toolkit/issues/1390))
* **css:** Nieuw component "Tile Grid" en "Tile" uitgebreid met variant "theme" ([#1443](https://github.com/dso-toolkit/dso-toolkit/issues/1443))
* **core:** Nieuw component "Image Overlay": `<dso-image-overlay>` ([#1444](https://github.com/dso-toolkit/dso-toolkit/issues/1444))
* **core:** Autosuggest uitbreiding voor verwijzing naar object bij suggestie ([#1494](https://github.com/dso-toolkit/dso-toolkit/issues/1494))

### Changed
* **css + dso-toolkit + sources:** "Rich Content" verhuizen naar `@dso-toolkit/sources` ([#1465](https://github.com/dso-toolkit/dso-toolkit/issues/1465))
* **css + core + dso-toolkit:** "Row Equal Heights" verhuizen naar `@dso-toolkit/css`. ([#1459](https://github.com/dso-toolkit/dso-toolkit/issues/1459))

### Fixed
* **sources:** Storybook assets worden niet gebundled bij het builden ([#1520](https://github.com/dso-toolkit/dso-toolkit/issues/1520))

## 34.2.1

De change uit GitHub issue [#1472](https://github.com/dso-toolkit/dso-toolkit/issues/1472) "Vertical margin lijsten en Definition List optimalisatie" is in deze release opnieuw geïmplementeerd.

### Fixed
* **css:** List Group within Rich Content has extra left padding, regression in 34.2.0 ([#1503](https://github.com/dso-toolkit/dso-toolkit/issues/1503))

## 34.2.0

### Improvements
* **core + dso-toolkit:** Header verbeteringen ([#1457](https://github.com/dso-toolkit/dso-toolkit/issues/1457))
* **css:** Vertical margin lijsten en Definition List optimalisatie ([#1472](https://github.com/dso-toolkit/dso-toolkit/issues/1472))

### Added
* **css + dso-toolkit:** Navigation block - Link list in `<nav>` ([#1454](https://github.com/dso-toolkit/dso-toolkit/issues/1454))
* **core:** Viewer Grid - Filterpaneel ([#1445](https://github.com/dso-toolkit/dso-toolkit/issues/1445))
* **core:** Toelichting kaartlaag in Map Controls altijd initieel gesloten weergeven ([#1479](https://github.com/dso-toolkit/dso-toolkit/issues/1479))

### Changed
* **core:** Header spec "should show/remove overflowmenu" tijdelijk uitschakelen ([#1502](https://github.com/dso-toolkit/dso-toolkit/issues/1502))

### Fixed
* **sources:** dso-icon in button size moet 24px zijn ([#1486](https://github.com/dso-toolkit/dso-toolkit/issues/1486))

## 34.1.0

### Changed
* **core:** Sticky resize knoppen voor viewer grid ([#1373](https://github.com/dso-toolkit/dso-toolkit/issues/1373))
* **css + dso-toolkit + sources:** CSS Component Shopping Cart verhuizing ([#1253](https://github.com/dso-toolkit/dso-toolkit/issues/1253))

### Documentation
* **dso-toolkit:** Documentatie Label, Datepicker en paginatitel update ([#1469](https://github.com/dso-toolkit/dso-toolkit/issues/1469))

### Fixed
* **core:** Afmetingen van viewer grid panelen en animaties daartussen ([#1451](https://github.com/dso-toolkit/dso-toolkit/issues/1451))
* **dso-toolkit:** Form "Files" .dso-primary heeft geen zichtbare focus ([#1453](https://github.com/dso-toolkit/dso-toolkit/issues/1453))
* **css:** Card List heeft boven en onder geen border + `chevron-right` lijnt niet met linktekst ([#1452](https://github.com/dso-toolkit/dso-toolkit/issues/1452))
* **core + react:** Date Picker direction="left" werkt niet ([#1475](https://github.com/dso-toolkit/dso-toolkit/issues/1475))
* **core + react:** Date Picker invoer via input geeft geen fout bij datum buiten opgegeven range ([#1482](https://github.com/dso-toolkit/dso-toolkit/issues/1482))
* **core + react:** Date Picker invoer via input geeft geen fout bij niet toegestane karakters ([#1482](https://github.com/dso-toolkit/dso-toolkit/issues/1482))
* **core + react:** Date Picker invoer via input moet niet toegestane karakters blokkeren ([#1482](https://github.com/dso-toolkit/dso-toolkit/issues/1482))
* **core:** Kaartlagen in MapControls is niet scrollbaar ([#1478](https://github.com/dso-toolkit/dso-toolkit/issues/1478))

## 34.0.0

### Added
* Toelichting bij Layers in MapControls ([#1432](https://github.com/dso-toolkit/dso-toolkit/issues/1432))

### Changed
* **BREAKING: core + css + sources:** Viewer Grid als Web Component ([#1403](https://github.com/dso-toolkit/dso-toolkit/issues/1403)). **Let op:** Het HTML/CSS component `.dso-viewer-grid` is niet meer beschikbaar.
* **BREAKING: sources:** CSS Component Image varianten `img-rounded` en `img-thumbnail` deprecated ([#1188](https://github.com/dso-toolkit/dso-toolkit/issues/1188))
* **BREAKING: css + dso-toolkit + sources:** CSS Component List verhuizing ([#1397](https://github.com/dso-toolkit/dso-toolkit/issues/1397))
  De volgende selectors zijn niet meer beschikbaar:
  * `a.list-group-item`
  * `button.list-group-item`
  * `.list-group-item.disabled` en `.list-group-item.active`
  * `.list-group-item-heading` en `.list-group-item-text`
  * `.list-group-item-success`, `.list-group-item-info`, `.list-group-item-warning`, `.list-group-item-danger`
* **dso-toolkit:** Voorbeeldpagina conclusie Vergunningcheck aanpassen 'Opslaan in Mijn Omgevingswet' ([#1430](https://github.com/dso-toolkit/dso-toolkit/issues/1430))
* **css + dso-toolkit + sources:** CSS Component Pagination verhuizing ([#1254](https://github.com/dso-toolkit/dso-toolkit/issues/1254))
* **dso-toolkit:** Validatie bij verplichte confirmatie checkbox aanpassen ([#1420](https://github.com/dso-toolkit/dso-toolkit/issues/1420))
* Stylelint ([#1437](https://github.com/dso-toolkit/dso-toolkit/issues/1437))

### Fixed
* **core:** Tree View: Lange labels vallen onder caret ([#1433](https://github.com/dso-toolkit/dso-toolkit/issues/1433))
* **core:** Map Controls bevat een `form` zonder submit button ([#1426](https://github.com/dso-toolkit/dso-toolkit/issues/1426))
* **core:** Web Component `dso-info` kruis in sluitenknop heeft dezelfde kleur als achtergrond ([#1449](https://github.com/dso-toolkit/dso-toolkit/issues/1449))

## 33.3.0

### Added
* **core + dso-toolkit + sources:** Web Component Header ([#1404](https://github.com/dso-toolkit/dso-toolkit/issues/1404))

### Fixed
* **core:** Date Picker met shadowRoot is met extern label element niet toegankelijk ([#1164](https://github.com/dso-toolkit/dso-toolkit/issues/1164))
* **core + sources:** Map Buttons visual fixes ([#1412](https://github.com/dso-toolkit/dso-toolkit/issues/1412))

### Changed
* **css + dso-toolkit:** Accordion bevindingen en verbeteringen ([#1419](https://github.com/dso-toolkit/dso-toolkit/issues/1419))
* **dso-toolkit:** Search bar: verwijderen varianten zonder label ([#1239](https://github.com/dso-toolkit/dso-toolkit/issues/1239))
* **core + css + dso-toolkit + sources:** Verbeteringen Tooltip en Toggletip ([#1362](https://github.com/dso-toolkit/dso-toolkit/issues/1362))
* **core + sources:** Map Controls layers uitgebreid met `disabled` state ([#1406](https://github.com/dso-toolkit/dso-toolkit/issues/1406))

## 33.2.0

### Added
* **css + dso-toolkit + sources:** CSS Component Navbar ([#1252](https://github.com/dso-toolkit/dso-toolkit/issues/1252))
* **dso-toolkit:** Voorbeeldpagina's Mijn Omgevingsloket ([#1307](https://github.com/dso-toolkit/dso-toolkit/issues/1307))
* **dso-toolkit:** Voorbeeldpagina: Stelselcatalogus Begrip ([#1407](https://github.com/dso-toolkit/dso-toolkit/issues/1407))
* **core + react + sources:** Autosuggest: events dsoSearch en dsoSelect ([#1415](https://github.com/dso-toolkit/dso-toolkit/issues/1415))

### Fixed
* **core + sources:** Datepicker bugs: Backspace leegt veld, min max in storybook ([#1395](https://github.com/dso-toolkit/dso-toolkit/issues/1395))
* **core:** Autosuggest escape selecteert onterecht de eerste suggestie ([#1411](https://github.com/dso-toolkit/dso-toolkit/issues/1411))

### Changed
* **dso-toolkit:** Toekomstbestendig logo ([#1296](https://github.com/dso-toolkit/dso-toolkit/issues/1296))
* **core + dso-toolkit + css:** Icon only buttons moeten sr-only hebben ([#1210](https://github.com/dso-toolkit/dso-toolkit/issues/1210)) **See PR ([#1413](https://github.com/dso-toolkit/dso-toolkit/pull/1413))**
* **dso-toolkit:** Voorbeeldpagina: Vergunningcheck Conclusie ([#1396](https://github.com/dso-toolkit/dso-toolkit/issues/1396))

## 33.1.0

### Added
* **css:** Accordion tests ([#1192](https://github.com/dso-toolkit/dso-toolkit/issues/1192))
* **css + dso-toolkit + sources:** Lange lijsten in definition list tonen als kolommen ([#1378](https://github.com/dso-toolkit/dso-toolkit/issues/1378))

### Fixed
* **css:** Verbeteren viewer document-header en document-list-item ([#1392](https://github.com/dso-toolkit/dso-toolkit/issues/1392))

## 33.0.0

### Fixed
* **core:** Keydown en focusout events op Dropdown Menu en Toggletip Web Components in Safari ([#1379](https://github.com/dso-toolkit/dso-toolkit/issues/1379))
* **css + dso-toolkit + sources:** Input-type number moet altijd gelabeled zijn ([#1386](https://github.com/dso-toolkit/dso-toolkit/issues/1386))
* **dso-toolkit:** Percy SDK is unsupported ([#1360](https://github.com/dso-toolkit/dso-toolkit/issues/1360))

### Changed
* **BREAKING: core:** Tree View items dienen een "selected" en een "active" state te ondersteunen ([#1349](https://github.com/dso-toolkit/dso-toolkit/issues/1349))

## 32.2.0

### Added
* **css:** Card Grid ([#1216](https://github.com/dso-toolkit/dso-toolkit/issues/1216))
* **css:** Accordion redesign ([#1280](https://github.com/dso-toolkit/dso-toolkit/issues/1280))

## 32.1.0

### Added
* **core + css + dso-toolkit + sources:** Nieuwe 'conclusie' iconen toevoegen ([#1375](https://github.com/dso-toolkit/dso-toolkit/issues/1375))
* **core + sources:** Eerste (poc) versie helpcenter paneel + knop ([#1376](https://github.com/dso-toolkit/dso-toolkit/issues/1376))

### Changed
* **dso-toolkit + sources:** Aanpassen DSO-icon "municipality" ([#1380](https://github.com/dso-toolkit/dso-toolkit/issues/1380))

## 32.0.0

### Added
* **css:** document-header en document-list-item in dso-viewer-grid main panel #1308 ([#1308](https://github.com/dso-toolkit/dso-toolkit/issues/1308))
* **css:** Filterblok component ([#1323](https://github.com/dso-toolkit/dso-toolkit/issues/1323))
* **css:** Cards optioneel checkable maken ([#1294](https://github.com/dso-toolkit/dso-toolkit/issues/1294))

### Fixed
* **dso-toolkit + sources:** Placeholder tekst buiten inputs in Safari ([#1364](https://github.com/dso-toolkit/dso-toolkit/issues/1364))
* **dso-toolkit:** Fractal dev omgeving watcht files uit packages/css niet ([#1370](https://github.com/dso-toolkit/dso-toolkit/issues/1370))

### Changed
* Node 16 ([#1359](https://github.com/dso-toolkit/dso-toolkit/issues/1359))
* **dso-toolkit + sources:** Standaard $grijs-5 als grijze achtergrond ([#1363](https://github.com/dso-toolkit/dso-toolkit/issues/1363))

### Removed
* **dso-toolkit:** Treeview deprecaten ([#1351](https://github.com/dso-toolkit/dso-toolkit/issues/1351))

## 31.1.1

### Fixed
* **core:** Verwijzing naar `@dso-toolkit/sources` ([#1361](https://github.com/dso-toolkit/dso-toolkit/issues/1361))

## 31.1.0

### Added
* **css + core + react:** Labels: Uitbreiden met symbolen ([#1313](https://github.com/dso-toolkit/dso-toolkit/issues/1313))
* **core + css + dso-toolkit + sources:** Info button "secondary" styling ([#1301](https://github.com/dso-toolkit/dso-toolkit/issues/1301))
* **core:** Tree View: Klikken op een item dient de roving tabindex naar dat item te verplaatsen ([#1348](https://github.com/dso-toolkit/dso-toolkit/issues/1348))

### Changed
* **css + dso-toolkit:** Select in context-container ([#1341](https://github.com/dso-toolkit/dso-toolkit/issues/1341))
* **core + react + sources:** Date Picker voorzien van autofocus attribuut ([#1327](https://github.com/dso-toolkit/dso-toolkit/issues/1327))
* **core:** Date Picker emit Enter keydown event van nested input ([#1328](https://github.com/dso-toolkit/dso-toolkit/issues/1328))
* **all:** NPM audit vulnerabilities package updates ([#1310](https://github.com/dso-toolkit/dso-toolkit/issues/1310))
* **core:** Noten werken niet in Ozon content type "Opschrift" ([#1346](https://github.com/dso-toolkit/dso-toolkit/issues/1346))

### Fixed
* **core:** Date picker: label sluitknopje ([#1334](https://github.com/dso-toolkit/dso-toolkit/issues/1334))
* **core:** Date Picker geeft geen event bij foutieve invoer ([#1326](https://github.com/dso-toolkit/dso-toolkit/issues/1326))
* **core:** Tree View: toetsenbordinteractie werkt niet met nvda ([#1342](https://github.com/dso-toolkit/dso-toolkit/issues/1342))
* **core + css + react + sources + dso-toolkit:** External link in banner of alert krijgt groen icoontje ([#1295](https://github.com/dso-toolkit/dso-toolkit/issues/1295))

## 31.0.0

### Added
* **core + react + dso-toolkit + sources:** Toggletip met interactieve elementen ([#1297](https://github.com/dso-toolkit/dso-toolkit/issues/1297))
* **core + react + sources:** Tree View Web Component ([#552](https://github.com/dso-toolkit/dso-toolkit/issues/552))

### Fixed
* **sources:** Anchor link styling op gekleurde achtergrond niet gelijk ([#1281](https://github.com/dso-toolkit/dso-toolkit/issues/1281))
* **dso-toolkit:** Toegankelijke helpteksten, toelichtingen en validatiefoutmeldingen ([#1238](https://github.com/dso-toolkit/dso-toolkit/issues/1238))
* **core + sources:** AutoSuggest; Highlighter breekt op reguliere expressie ([#1332](https://github.com/dso-toolkit/dso-toolkit/issues/1332))
* **BREAKING: css + dso-tookit:** Gedrag Context Component bij lange labels en/of grotere interactieve onderdelen ([#1274](https://github.com/dso-toolkit/dso-toolkit/issues/1274))
* **react:** React Storybook key errors ([#1343](https://github.com/dso-toolkit/dso-toolkit/issues/1343))

### Documentation
* **dso-toolkit:** Herschrijven navigatie en sub-navigatie documentatie ([#1284](https://github.com/dso-toolkit/dso-toolkit/issues/1284))

## 30.1.0

### Changed
* **core:** dso-ozon-content component: Noten uit Ozon API hebben nieuwe markup ([#1330](https://github.com/dso-toolkit/dso-toolkit/issues/1330))

### Fixed
* **core:** Suggesties van Autosuggest Web Component worden onder andere HTML elementen getoond ([#1322](https://github.com/dso-toolkit/dso-toolkit/issues/1322))
* **core:** Date Picker hanteert verkeerde dateformat ([#1325](https://github.com/dso-toolkit/dso-toolkit/issues/1325))
* **core:** Autosuggest moet niet de value van het slotted input element wijzigen ([#1329](https://github.com/dso-toolkit/dso-toolkit/issues/1329))

## 30.0.0

### Changed
* **BREAKING: core + react:** Autosuggest Web Component API refactor ([#1315](https://github.com/dso-toolkit/dso-toolkit/issues/1315))
* **dso-toolkit + css:** Search Bar styling naar @dso-toolkit/css ([#1316](https://github.com/dso-toolkit/dso-toolkit/issues/1316))

### Fixed
* **css:** Autosuggest in Search Bar zorgt ervoor dat Search Bar elementen verkeerd uitlijnen ([#1318](https://github.com/dso-toolkit/dso-toolkit/issues/1318))

## 29.0.1

### Fixed
* **core:** Soms werken noten niet ([#1311](https://github.com/dso-toolkit/dso-toolkit/issues/1311))
* **core:** Initializatie van Autosuggest Web Component gaat onterecht fout omdat er een error wordt gegooid in connectedCallback() ([#1312](https://github.com/dso-toolkit/dso-toolkit/issues/1312))

## 29.0.0

### Added
* **css:** Layout Viewer ([#1279](https://github.com/dso-toolkit/dso-toolkit/issues/1279))
* **core:** Het Ozon Content component moet anchors met fully qualified URL's negeren en door de browser laten afhandelen ([#1309](https://github.com/dso-toolkit/dso-toolkit/issues/1309))
* **css + core:** Nieuw icoon "location-search" en "measurement" ([#1306](https://github.com/dso-toolkit/dso-toolkit/issues/1306))
* **css + dso-toolkit + sources:** Nieuw typografisch component: subtitel ([#1272](https://github.com/dso-toolkit/dso-toolkit/issues/1272))

### Changed
* **BREAKING: all packages**. Update dependencies ([#1290](https://github.com/dso-toolkit/dso-toolkit/issues/1290)). Overgestapt van `node-sass` naar `sass` (Dart Sass). **stylesheets zijn niet meer node-sass compatible**
* **BREAKING: react + react-leaflet:** React dependencies van de hele DSO Toolkit ophogen naar `^17.0.2` ([#1305](https://github.com/dso-toolkit/dso-toolkit/issues/1305)).

## 28.0.2

### Fixed
* **react:** `@dso-toolkit/react` wordt niet gebuild maar wel gepublished en heeft dus geen `/dist` directory ([#1303](https://github.com/dso-toolkit/dso-toolkit/issues/1303))

## 28.0.1

### Fixed
* `@dso-toolkit/core` Autosuggest heeft impliciet een typing dependency op "react" ([#1298](https://github.com/dso-toolkit/dso-toolkit/issues/1298))

## 28.0.0

### Added
* **dso-toolkit:** "Progress" variant van Modal ([#1269](https://github.com/dso-toolkit/dso-toolkit/issues/1269))
* **css + dso-toolkit + sources:** Nieuwe variant "note" voor Description ([#1271](https://github.com/dso-toolkit/dso-toolkit/issues/1271))
* **core:** Ozon content component ([#1287](https://github.com/dso-toolkit/dso-toolkit/issues/1287))
* **dso-toolkit + core + css:** Filterblok compositie als patroon, Label uitgebreid met heldere variant (`bright`) ([#1278](https://github.com/dso-toolkit/dso-toolkit/issues/1278)) **See PR ([#1289](https://github.com/dso-toolkit/dso-toolkit/pull/1289))**

### Changed
* **dso-toolkit:** Whitebox en Tile presenteren op eigen pagina's ([#1273](https://github.com/dso-toolkit/dso-toolkit/issues/1273))
* **BREAKING: css + dso-toolkit + sources:** cards component uitbreiden/aanpassen ([#1132](https://github.com/dso-toolkit/dso-toolkit/issues/1132)) **Markup changes, see PR ([#1282](https://github.com/dso-toolkit/dso-toolkit/pull/1282))**

## 27.4.0

### Added
* **core + react + sources:** Interactieve zoeksuggesties aanbieden als Web Component ([#1158](https://github.com/dso-toolkit/dso-toolkit/issues/1158))
* **dso-toolkit + sources + css:** CSS Component List Button ([#1250](https://github.com/dso-toolkit/dso-toolkit/issues/1250))

### Changes
* **dso-toolkit:** Naamswijziging in voorbeelddata ([#1268](https://github.com/dso-toolkit/dso-toolkit/issues/1268))

### Documentation
* **dso-toolkit:** Fixed: In kleurdocumentatie heeft mauve de verkeerde kleurcode ([#1276](https://github.com/dso-toolkit/dso-toolkit/issues/1276))

## 27.3.0

### Added
* **core + css + dso-toolkit + react + sources:** Checkbox voorzien van indeterminate state ([#1185](https://github.com/dso-toolkit/dso-toolkit/issues/1185))

### Fixed

* **dso-toolkit + sources:** Visited state in navigatiewerkvormen mag visueel niet zichtbaar zijn ([#1263](https://github.com/dso-toolkit/dso-toolkit/issues/1263))

## 27.2.0

### Added
* **dso-toolkit + sources + css:** CSS Component Application Heading ([#1251](https://github.com/dso-toolkit/dso-toolkit/issues/1251))
* **dso-toolkit + sources + css:** CSS Component Context ([#1191](https://github.com/dso-toolkit/dso-toolkit/issues/1191))

## 27.1.0

### Fixed
* Dropdown button ARIA bugfixes ([#1231](https://github.com/dso-toolkit/dso-toolkit/issues/1231))
* Button placements in tabellen en rijen zijn veranderd ([#1255](https://github.com/dso-toolkit/dso-toolkit/issues/1255))
* Vergeten Button stylings corrigeren ([#1256](https://github.com/dso-toolkit/dso-toolkit/issues/1256))
* Nieuwe button implementatie verwerken in voorbeeld pagina's ([#1257](https://github.com/dso-toolkit/dso-toolkit/issues/1257))

### Removed
* **dso-toolkit:** Group Files deprecated dso-description verwijderen ([#1243](https://github.com/dso-toolkit/dso-toolkit/issues/1243))

## 27.0.0

### Fixed
* **dso-toolkit:** Rich content: ontbrekende alt tag ([#1232](https://github.com/dso-toolkit/dso-toolkit/issues/1232))
* **dso-toolkit + core:** Accessible name voor Progress Bar en Progress Indicator ([#1211](https://github.com/dso-toolkit/dso-toolkit/issues/1211)) **Markup changes, see PR ([#1234](https://github.com/dso-toolkit/dso-toolkit/pull/1234))**

### Added
* **BREAKING: dso-toolkit + core + css + react:** Dropdown Menu (Web Component en CSS Component update) ([#1173](https://github.com/dso-toolkit/dso-toolkit/issues/1173))
  * `.dropdown` wordt `.dso-dropdown-menu`, `.dropdown-menu` wordt `.dso-dropdown-options`, en... **Markup changes, see PR ([#1225](https://github.com/dso-toolkit/dso-toolkit/pull/1225))**

### Changed
* **sources:** Twee updated iconen: `land` en `layers` ([#1245](https://github.com/dso-toolkit/dso-toolkit/issues/1245))
* **dso-toolkit + styling + css:** Footer redesign en finetuning styling linklijsten ([#936](https://github.com/dso-toolkit/dso-toolkit/issues/936))
* **dso-toolkit:** Vaste toelichtingen hebben geen duidelijke relatie met vraag of antwoord ([#1229](https://github.com/dso-toolkit/dso-toolkit/issues/1229)) **Markup changes, see PR ([#1248](https://github.com/dso-toolkit/dso-toolkit/pull/1248))**

### Removed
* **dso-toolkit:** Deprecated toelichting verwijderen ([#1241](https://github.com/dso-toolkit/dso-toolkit/issues/1241))
* **dso-toolkit:** Group Files deprecated dso-description verwijderen ([#1243](https://github.com/dso-toolkit/dso-toolkit/issues/1243))

## 26.0.0

### Fixed
* **dso-toolkit:** Lege elementen zoals sr-only, id's, legends en labels in de toolkit ([#1220](https://github.com/dso-toolkit/dso-toolkit/issues/1220))
* **core:** `help` en `help-active` ontbreken in `<dso-icon>` ([#1224](https://github.com/dso-toolkit/dso-toolkit/issues/1224))

### Added
* **BREAKING: dso-toolkit + core:** Web Component "Progress Indicator" ([#939](https://github.com/dso-toolkit/dso-toolkit/issues/939))
  * `.dso-gray` op `.dso-progress-indicator` is komen te vervallen: Class is gemaakt voor demo mogelijkheden. Achtergrond moet met bv. Highlight Box worden gegenereerd
  * `.dso-progress-indicator-looping` is komen te vervallen, stijling is gefuseerd met de root selector `.dso-progress-indicator`. Het kan geen kwaad om deze class te laten staan.
* 7 Thema iconen: `energy`, `environment`, `health`, `land`, `procedures`, `safety` en `sound` ([#1227](https://github.com/dso-toolkit/dso-toolkit/issues/1227))

### Changed
* **BREAKING: dso-toolkit:** Whitebox Small heet nu Tile: `.dso-whitebox-small` -> `.dso-tile` ([#1198](https://github.com/dso-toolkit/dso-toolkit/issues/1198)).

## 25.1.2

### Fixed
* **dso-toolkit + core + css + react:** Packages missen artifacts ([#1223](https://github.com/dso-toolkit/dso-toolkit/issues/1223))

## 25.1.1

### Fixed
* **dso-toolkit:** Missende libs bij deploy naar NPM
* **dso-toolkit:** Group Files button toetsenbord focus styling kapot ([#1221](https://github.com/dso-toolkit/dso-toolkit/issues/1221))

## 25.1.0

### Added
* **dso-toolkit + styling:** Bordered definition list (definities in de Stelselcatalogus) ([#1209](https://github.com/dso-toolkit/dso-toolkit/issues/1209))
* **sources:** Twee nieuwe iconen: `help` en `help-active` ([#1215](https://github.com/dso-toolkit/dso-toolkit/issues/1215))

### Fixed
* **dso-toolkit:** Group Files button heeft geen 'hand' cursor meer ([#1214](https://github.com/dso-toolkit/dso-toolkit/issues/1214))
* **core:** Datepicker: `aria-current=date` ([#1174](https://github.com/dso-toolkit/dso-toolkit/issues/1174))
* **styling:** Modal responsive button uitlijning [#1178](https://github.com/dso-toolkit/dso-toolkit/issues/1178))

## 25.0.0

### Special release notes

#### Buttons
Deze release bevat een major refactor van alles wat met buttons te maken heeft:
* Op `.btn` varianten geen `.active`, `.focus`, `.disabled`, of `.hover` modifier classes meer
* `.btn-xs` bestaat niet meer. Migreren: naar `.btn-sm`.
* `.btn-lg` bestaat niet meer. Migreren: Modifier class weghalen.
* `.btn-link` heeft geen `.btn-sm` modifier meer. Het netto effect was er al niet. Migreren: `.btn-sm` modifier weghalen
* Zelfgemaakte buttons met `[role="button"]` zijn waarschijnlijk stuk. Migreren: native `button` element gebruiken
* `.btn-succes`, `.btn-info`, `.btn-warning` en `.btn-danger` bestaan niet meer. Migreren: Modifier class weghalen
* *Bijna* alle `button` en `.btn` gerelateerde `:focus` styling verwijderd
* Er waren constructies die `.btn-primary`, `.btn-default` en `.btn-link` inzetbaar maakten zonder `.btn`. Dit wordt nu echt niet meer ondersteund. Migratie: Kies `btn-primary`, `.btn-default` of `.btn-link`.
* `.icon` bestaat niet meer. Migreren: Modifier class weghalen
* `fieldset[disabled] .btn` wordt niet meer gestijld, kan op verzoek geimplementeerd worden.
* Geen styling meer op `.dropdown-toggle`

Daarnaast hebben we de terminologie van het UX team doorgevoerd: Primary, secondary en tertiary buttons. Primary, default en link is een erfenis van Bootstrap. Voorlopig zullen de bestaande selectors blijven werken maar hieronder een mapping tabel:
* `.btn.btn-primary` -> `a.dso-primary, button.dso-primary`
* `.btn.btn-default` -> `a.dso-secondary, button.dso-secondary`
* `.btn.btn-link` -> `a.dso-tertiary, button.dso-tertiary`

#### Release errors
Verder is er eerder onterecht versie gedeeltelijke versie `25.0.0` van de DSO Toolkit suite uitgebracht. Dit release proces is onderbroken maar betekent dat alleen `dso-toolkit@25.0.0` wordt uitgebracht. De andere packages worden `@dso-toolkit/core@25.0.1` en `@dso-toolkit/react@25.0.1`.

### Changed
* **BREAKING: dso-toolkit:** Button styling refactor ([#856](https://github.com/dso-toolkit/dso-toolkit/issues/856))

### Added
* **dso-toolkit:** Nieuw component: Link List ([#1159](https://github.com/dso-toolkit/dso-toolkit/issues/1159))
* **leaflet:** Map Control Button styling ([#1021](https://github.com/dso-toolkit/dso-toolkit/issues/1021))

## 24.4.1

### Fixed
* **dso-toolkit:** Modal responsive media query conflict ([#1201](https://github.com/dso-toolkit/dso-toolkit/issues/1201))

## 24.4.0

### Added
* **dso-toolkit:** Smoke test voor `dso-toolkit` SCSS compile ([#1168](https://github.com/dso-toolkit/dso-toolkit/issues/1168))
* **core + leaflet + react-leaflet:** MapControls Web Component, Leaflet plugins + styling, React Leaflet bindings ([#1022](https://github.com/dso-toolkit/dso-toolkit/issues/1022))
* **dso-toolkit:** Anchor: tekst externe link ([#1176](https://github.com/dso-toolkit/dso-toolkit/issues/1176))

### Fixed
* **sources:** Afbeeldingen in table schalen niet goed ([#1180](https://github.com/dso-toolkit/dso-toolkit/issues/1180))
* **dso-toolkit:** Banner plus Modal responsive Bug ([#1177](https://github.com/dso-toolkit/dso-toolkit/issues/1177))
* **core:** Tooltip blijft in gesloten state in de accessibility tree ([#1182](https://github.com/dso-toolkit/dso-toolkit/issues/1182))
* **core:** In Tooltip komt een attribuut wijziging niet door ([#1090](https://github.com/dso-toolkit/dso-toolkit/issues/1090))
* **core:** Click op Tooltip bubbled door naar parents waardoor ongewenste eventslisteners worden getriggerd ([#1196](https://github.com/dso-toolkit/dso-toolkit/issues/1196))

## 24.3.1

### Fixed
**dso-toolkit:** SCSS van 24.3.0 kan niet gecompileerd worden ([#1167](https://github.com/dso-toolkit/dso-toolkit/issues/1167))

## 24.3.0

### Changed
* **dso-toolkit:** Tooltips nieuwe styling smalle variant ([#1120](https://github.com/dso-toolkit/dso-toolkit/issues/1120))
* **core + dso-toolkit + styling:** Label herontwerp en Label Group ([#809](https://github.com/dso-toolkit/dso-toolkit/issues/809))
* **dso-toolkit + css:** Breadcrumb: validatiefout voorbeeldpagina ([#1157](https://github.com/dso-toolkit/dso-toolkit/issues/1157))

### Fixed
* **dso-toolkit:** ListButton met InputNumber in lijst krijgt geen margin-top ([#1161](https://github.com/dso-toolkit/dso-toolkit/issues/1161))

### Added
* **dso-toolkit:** Patroonpagina over submitgedrag in accordion ([#1119](https://github.com/dso-toolkit/dso-toolkit/issues/1119))

## 24.2.2

### Fixed
* **dso-toolkit:** `$dso-icons-path` is niet meer te overriden ([#1156](https://github.com/dso-toolkit/dso-toolkit/issues/1156))

## 24.2.1

### Fixed
* **dso-toolkit:** @dso-toolkit/css `di.scss` mixin zit niet in `dso-toolkit` npm package ([#1155](https://github.com/dso-toolkit/dso-toolkit/issues/1155))

## 24.2.0

## Fixed
* **dso-toolkit:** Invalid CSS3 ([#1150](https://github.com/dso-toolkit/dso-toolkit/issues/1150))
* **dso-toolkit:** Shopping cart bevat `:has()` selector ([#1141](https://github.com/dso-toolkit/dso-toolkit/issues/1141))
* **dso-toolkit:** Angular 12 is unable to bundle `dso.css` ([#1152](https://github.com/dso-toolkit/dso-toolkit/issues/1152))

## 24.1.0

### Changed
* **dso-toolkit:** Breadcrumb: Slashes moeten niet worden voorgelezen door een screenreader ([#1133](https://github.com/dso-toolkit/dso-toolkit/issues/1133))
* **dso-toolkit:** Navigations: aria-current="page" toevoegen ([#1131](https://github.com/dso-toolkit/dso-toolkit/issues/1131))
* **dso-toolkit:** Navigations: aria-expanded en label hamburger knopje aanpassen ([#1134](https://github.com/dso-toolkit/dso-toolkit/issues/1134))

### Fixed
* **dso-toolkit**: Recente `dso.css` is niet te bundlen met Angular v12 ([#1140](https://github.com/dso-toolkit/dso-toolkit/issues/1140))

## 24.0.0

### Fixed
* **dso-toolkit:** Accordion voorbeeld pagina bevat invalide HTML ([#1124](https://github.com/dso-toolkit/dso-toolkit/pull/1124))

### Changed
* **dso-toolkit:** Verticale (onder)marge van form-groups ([#1091](https://github.com/dso-toolkit/dso-toolkit/issues/1091))
* **dso-toolkit:** Verticale (onder)marge van dso-search-bar ([#1092](https://github.com/dso-toolkit/dso-toolkit/issues/1092))
* **dso-toolkit:** Group componenten hoeven niet zo genoemd te worden ([#1128](https://github.com/dso-toolkit/dso-toolkit/issues/1128))
* **BREAKING:** **dso-toolkit:** Component "Applicatie heading" ([#1113](https://github.com/dso-toolkit/dso-toolkit/issues/1113)) **Markup changes, see PR ([#1114](https://github.com/dso-toolkit/dso-toolkit/pull/1114))**

## 23.0.0

### Added
* **core + dso-toolkit + styling** Nieuwe iconen voor gebruik in kaart ([#1099](https://github.com/dso-toolkit/dso-toolkit/issues/1099))

### Changed
* Node 14 en diverse package updates, zie ([#1095](https://github.com/dso-toolkit/dso-toolkit/issues/1095))
* **BREAKING:** **dso-toolkit:** Group Files component uitbreiding ([#1070](https://github.com/dso-toolkit/dso-toolkit/issues/1070)) **Markup changes, see PR ([#1093](https://github.com/dso-toolkit/dso-toolkit/pull/1093))**
* **dso-toolkit:** Geen lege breadcrumbs in voorbeeldpagina's ([#1102](https://github.com/dso-toolkit/dso-toolkit/issues/1102))
* **dso-toolkit:** Favicon updaten en meer formaten toevoegen ([#1010](https://github.com/dso-toolkit/dso-toolkit/issues/1010))

## 22.1.0

### Added
* **dso-toolkit:** Variant toevoegen voor Progress Indicator ([#1083](https://github.com/dso-toolkit/dso-toolkit/issues/1083))
* **core + react:** Automatisch `@dso-toolkit/core` en `@dso-toolkit/react` publiceren naar NPM ([#885](https://github.com/dso-toolkit/dso-toolkit/issues/885))

### Fixed
* **dso-toolkit:** Shopping Cart subitems hebben niet voldoende padding aan de rechterkant ([#1084](https://github.com/dso-toolkit/dso-toolkit/issues/1084))

### Changed
* **dso-toolkit + styling:** Scheidingslijnen styling consistent ([#1024](https://github.com/dso-toolkit/dso-toolkit/issues/1024))
* **dso-toolkit + styling:** Banner; Responsive ontwerp ([#768](https://github.com/dso-toolkit/dso-toolkit/issues/768))

## 22.0.0

Note: This release was first released as v21.3.0. We missed that [#857](https://github.com/dso-toolkit/dso-toolkit/issues/857)
 was a breaking change, so we re-released this version with updated CHANGELOG instructions.

### Added
* **dso-toolkit + core + styling:** Web component Banner ([#857](https://github.com/dso-toolkit/dso-toolkit/issues/857))

### Changed
* **dso-toolkit + styling:** Herontwerp link bij H1 om component preview te openen ([#1049](https://github.com/dso-toolkit/dso-toolkit/issues/1049))
* **dso-toolkit:** Visited state in Tabs verwijderen ([#1073](https://github.com/dso-toolkit/dso-toolkit/issues/1073))
* **styling:** Alert responsive styling op smalle viewport ([#1064](https://github.com/dso-toolkit/dso-toolkit/issues/1064))

### Fixed
* **dso-toolkit:** Group checkboxes: bad value bij aria-expanded ([#1078](https://github.com/dso-toolkit/dso-toolkit/issues/1078))

### Documentation
* **dso-toolkit:** Dropdown is niet met pijltjes te navigeren ([#875](https://github.com/dso-toolkit/dso-toolkit/issues/875))
* Werkflow uitwerken in CONTRIBUTING.md ([#505](https://github.com/dso-toolkit/dso-toolkit/issues/505))

### Deprecated
* **dso-toolkit + styling:** Banner: `.banner` class deprecaten ([#857](https://github.com/dso-toolkit/dso-toolkit/issues/857)) **Deprecation notice, see PR ([#1082](https://github.com/dso-toolkit/dso-toolkit/pull/1082))**

## 21.2.0

### Fixed
* **dso-toolkit:** Op highlight box pagina hebben alle voorbeelden titel "Default" ([#1048](https://github.com/dso-toolkit/dso-toolkit/issues/1048))

### Changed
* **dso-toolkit:** Structuur voorbeeldpagina's aanbrengen ([#1016](https://github.com/dso-toolkit/dso-toolkit/issues/1016))
* **dso-toolkit:** Breadcrumbs aanpassingen ([#1023](https://github.com/dso-toolkit/dso-toolkit/issues/1023))
* **dso-toolkit:** Tabs niet over de volledige breedte ([#1059](https://github.com/dso-toolkit/dso-toolkit/issues/1059))

### Documentation
* **dso-toolkit:** Uitleg gebruik classes cols en rows ([#977](https://github.com/dso-toolkit/dso-toolkit/issues/977))

## 21.1.0

### Fixed
* **dso-toolkit:** In het menu gaan collectie's niet meer open/dicht ([#1057](https://github.com/dso-toolkit/dso-toolkit/issues/1057))
* **dso-toolkit:** In "Markup" tabblad van componenten niet de webcomponent markup herhalen ([#1044](https://github.com/dso-toolkit/dso-toolkit/issues/1044))
* **dso-toolkit:** Wizard stap 2: afbeelding kaart mist ([#1056](https://github.com/dso-toolkit/dso-toolkit/issues/1056))

## 21.0.0

### Fixed
* **dso-toolkit:** Refactoring voorbeeldtemplates: correctie markup link-list homepage ([#1041](https://github.com/dso-toolkit/dso-toolkit/issues/1041))

### Changed
* **dso-toolkit:** Margin onder tabs ([#1027](https://github.com/dso-toolkit/dso-toolkit/issues/1027))
* **dso-toolkit:** Instelbare buttontekst mogelijk maken bij search-bar ([#1037](https://github.com/dso-toolkit/dso-toolkit/issues/1037))
* **dso-toolkit:** Headings in legend moeten geen margins hebben ([#1032](https://github.com/dso-toolkit/dso-toolkit/issues/1032))
* **BREAKING:** **dso-toolkit:** Aanpassen edit mogelijkheid bij group static ([#1036](https://github.com/dso-toolkit/dso-toolkit/issues/1036)) **Markup changes, see PR ([#1038](https://github.com/dso-toolkit/dso-toolkit/pull/1038))**
* **dso-toolkit:** Shopping-cart : aanpasbare titel en heading ([#1040](https://github.com/dso-toolkit/dso-toolkit/issues/1040))
* **dso-toolkit:** Toelichting onder formelementen moet ook "static" kunnen zijn. ([#1030](https://github.com/dso-toolkit/dso-toolkit/issues/1030))
* **dso-toolkit:** Steps component: de gebruikte clear oplossing is niet nodig ([#1045](https://github.com/dso-toolkit/dso-toolkit/issues/1045))
* **BREAKING:** **dso-toolkit:** Refactoring voorbeeldtemplates : Bijstellingen styling en markup ([#993](https://github.com/dso-toolkit/dso-toolkit/issues/993)) **Markup changes, see PR ([#1020](https://github.com/dso-toolkit/dso-toolkit/pull/1020))**

### Added
* **dso-toolkit:** Horizontale plaatsing form-groups en dso-form-buttons ([#1046](https://github.com/dso-toolkit/dso-toolkit/issues/1046))
* **dso-toolkit:** Definition lists in geneste accordion ([#1034](https://github.com/dso-toolkit/dso-toolkit/issues/1034))

### Documentation
* **dso-toolkit:** Refactoring voorbeeldtemplates : Aanvragen stap 7 (Verzoeken indienen) ([#826](https://github.com/dso-toolkit/dso-toolkit/issues/826))
* **dso-toolkit:** Refactoring voorbeeldtemplates : Wizard stap 2 (Locatie) ([#845](https://github.com/dso-toolkit/dso-toolkit/issues/845))
* **dso-toolkit:** Refactoring voorbeeldtemplates : Wizard Stap 3 (Kies activiteiten) ([#787](https://github.com/dso-toolkit/dso-toolkit/issues/787))
* **dso-toolkit:** Refactoring voorbeeldtemplates : Wizard stap 4 (Resultaat) ([#967](https://github.com/dso-toolkit/dso-toolkit/issues/967))
* **dso-toolkit:** Refactoring voorbeeldtemplates : responsive aanpassingen en inhoudelijke updates ([#928](https://github.com/dso-toolkit/dso-toolkit/issues/928))

## 20.0.0

### Fixed
* **dso-toolkit:** dso-info buiten legend gebruikt aria-hidden ipv aria-hidden="true" ([#1031](https://github.com/dso-toolkit/dso-toolkit/issues/1031))

### Changed
* **BREAKING:** **dso-toolkit + core:** Op web component Alert moet role="alert" instelbaar zijn ([#986](https://github.com/dso-toolkit/dso-toolkit/issues/986)) **Markup changes, see PR ([#1025](https://github.com/dso-toolkit/dso-toolkit/pull/1025))**
* **dso-toolkit:** Accordion anchor styling aanpassingen ([#1008](https://github.com/dso-toolkit/dso-toolkit/issues/1008))
* **dso-toolkit + styling:** Anchor styling aanpassingen voor componenten met gekleurde achtergrond ([#1009](https://github.com/dso-toolkit/dso-toolkit/issues/1009))
* **dso-toolkit + styling:** Moved table styling ([#935](https://github.com/dso-toolkit/dso-toolkit/issues/935))
* **dso-toolkit + core + styling:** Web component Tooltip ([#940](https://github.com/dso-toolkit/dso-toolkit/issues/940))

### Added
* **dso-toolkit** Dropdown menu rechts uit kunnen lijnen ([#961](https://github.com/dso-toolkit/dso-toolkit/issues/#961))
* **styling:** Variabelen voor verticale marges ([#1042](https://github.com/dso-toolkit/dso-toolkit/issues/1042))

### Deprecated
* **dso-toolkit:** Toelichting vraag onder antwoorden deprecaten ([#920](https://github.com/dso-toolkit/dso-toolkit/issues/920)) **Deprecation notice, see PR ([#1017](https://github.com/dso-toolkit/dso-toolkit/pull/1017))**

### Documentation
* **dso-toolkit:** Documentatie inline validatie geüpdatet ([#1018](https://github.com/dso-toolkit/dso-toolkit/issues/1018))

## 19.0.0

### Fixed
* **BREAKING:** **dso-toolkit:** dso-info moet buiten legend staan ([#996](https://github.com/dso-toolkit/dso-toolkit/issues/996)) **Markup changes, see PR ([#997](https://github.com/dso-toolkit/dso-toolkit/pull/997))**
* **BREAKING:** **dso-toolkit:** Button text wordt dubbel voorgelezen ([#903](https://github.com/dso-toolkit/dso-toolkit/issues/903)) **Fixed by changes from issue ([#996](https://github.com/dso-toolkit/dso-toolkit/issues/996))**
* **styling:** Buttons wrappen niet waardoor deze buiten elementen vallen ([#990](https://github.com/dso-toolkit/dso-toolkit/issues/990))

## 18.0.0

### Fixed
* **core:**: Date Picker focus styling verbeteren ([#964](https://github.com/dso-toolkit/dso-toolkit/issues/964))
* **dso-toolkit:** Navigatie van Toolkit aanpassen aan gewijzigde treeview markup ([#992](https://github.com/dso-toolkit/dso-toolkit/issues/992))
* **dso-toolkit:** Definition-list (in accordion) geen padding bij lange dt ([#979](https://github.com/dso-toolkit/dso-toolkit/issues/979))

### Changed
* **BREAKING:** **dso-toolkit** Toevoeging aria-invalid attribuut op invalid inputs ([#893](https://github.com/dso-toolkit/dso-toolkit/issues/893)) **Markup changes, see PR ([#985](https://github.com/dso-toolkit/dso-toolkit/pull/985))**
* **BREAKING** **dso-toolkit:** Tree view: h3 buiten button ([#933](https://github.com/dso-toolkit/dso-toolkit/issues/933)) **Markup changes, see PR ([#971](https://github.com/dso-toolkit/dso-toolkit/pull/971))**

### Added
* **dso-toolkit** Info-component zonder sluitmogelijkheid ([#907](https://github.com/dso-toolkit/dso-toolkit/issues/907))

## 17.1.0

### Fixed
* **dso-toolkit** Banner: ruimte tussen h2 en p onafhankelijk maken van eventuele whitespace ([#973](https://github.com/dso-toolkit/dso-toolkit/issues/973))

### Changed
* **dso-toolkit + styling:** Heading in Alert altijd dezelfde styling meegeven ([#952](https://github.com/dso-toolkit/dso-toolkit/issues/952))

### Added
* **dso-toolkit:** Bewerkenknop in group static toevoegen ([#881](https://github.com/dso-toolkit/dso-toolkit/issues/881))
* **dso-toolkit:** Definition-list in accordion ([#882](https://github.com/dso-toolkit/dso-toolkit/issues/882))
* **core:** Geen assets meer bij Icon component ([#968](https://github.com/dso-toolkit/dso-toolkit/issues/968))

## 17.0.1

17.0.0 was a failed release.

### Added
* **core:** Nieuw component: Date Picker ([#877](https://github.com/dso-toolkit/dso-toolkit/issues/877))
* **core + styling + react:**: React bindings en `.form-control` naar `@dso-toolkit/styling` ([#915](https://github.com/dso-toolkit/dso-toolkit/issues/915))
* **dso-toolkit:** List-button multiple selection aanpassen en uitbreiden met extra inhoud ([#798](https://github.com/dso-toolkit/dso-toolkit/issues/798))

## Changed
* **dso-toolkit:** Toelichting direct onder/na de vraag ([#906](https://github.com/dso-toolkit/dso-toolkit/issues/906))
* **dso-toolkit + styling:** Consequente styling van anchor links in lopende tekst ([#895](https://github.com/dso-toolkit/dso-toolkit/issues/895))
* **BREAKING:** **dso-toolkit + styling:** "Grote" Whiteboxes aanpassingen ([#929](https://github.com/dso-toolkit/dso-toolkit/issues/929)) **Markup changes, see PR ([#948](https://github.com/dso-toolkit/dso-toolkit/issues/948))**
* **BREAKING:** **dso-toolkit + styling:** Dropdown-button ook als tertiaire button kunnen inzetten ([#894](https://github.com/dso-toolkit/dso-toolkit/issues/894)) **Markup changes, see PR ([#966](https://github.com/dso-toolkit/dso-toolkit/pull/966))**
* **BREAKING:** **dso-toolkit + styling:** Dropdown voorbeeld met `btn-default` button gebruikt verkeerde markup ([#957](https://github.com/dso-toolkit/dso-toolkit/issues/957)) **Markup changes, see PR ([#966](https://github.com/dso-toolkit/dso-toolkit/pull/966))**

### Fixed
* **styling:** Tertiaire button grasgroen in highlightbox met witte achtergrond ([#925](https://github.com/dso-toolkit/dso-toolkit/issues/925))

### Deprecated
* **styling:** Pager deprecaten ([#910](https://github.com/dso-toolkit/dso-toolkit/issues/910)) **Deprecation notice, see PR ([#924](https://github.com/dso-toolkit/dso-toolkit/pull/924))**

### Documentation
* **dso-toolkit:** Documentatie Alert, Banner, Modal en Forms geüpdatet, en inline validatie en strategie meldingen toegevoegd  ([#680](https://github.com/dso-toolkit/dso-toolkit/issues/680))

## 16.0.1 - 2020-01-04

## Fixed
* **dso-toolkit:** Input number opnieuw toegevoegd ([#946](https://github.com/dso-toolkit/dso-toolkit/issues/946))
* **dso-toolkit:** Fixed: NPM releases komen onder tag 'next' ([#953](https://github.com/dso-toolkit/dso-toolkit/issues/953))
* **dso-toolkit:** README.md met NPM package publiceren ([#954](https://github.com/dso-toolkit/dso-toolkit/issues/954))

### Documentation
* **dso-toolkit:** Start documentatie opsplitsen naar verschillende rollen (developers, ontwerpers, product owners) ([#945](https://github.com/dso-toolkit/dso-toolkit/issues/945))
* **dso-toolkit:** Dubbele previews bij componenten labelen met type ([#947](https://github.com/dso-toolkit/dso-toolkit/issues/947))

## 16.0.0 - 2020-12-14

### Added
* **core + styling:** Alert ([#838](https://github.com/dso-toolkit/dso-toolkit/issues/838))
* **core + styling:** Badge ([#852](https://github.com/dso-toolkit/dso-toolkit/issues/852))
* **core + styling:** Attachments Counter ([#854](https://github.com/dso-toolkit/dso-toolkit/issues/854))
* **core + styling:** Progress Bar ([#860](https://github.com/dso-toolkit/dso-toolkit/issues/860))
* **core + styling:** Label ([#861](https://github.com/dso-toolkit/dso-toolkit/issues/861))
* **core + styling:** Highlight Box ([#863](https://github.com/dso-toolkit/dso-toolkit/issues/863))
* **core + styling:** Icon ([#886](https://github.com/dso-toolkit/dso-toolkit/issues/886))
* **styling:** Grid en Clearfix ([#855](https://github.com/dso-toolkit/dso-toolkit/issues/855))

### Changed
* **dso-toolkit:** Bootstrap cleanup ([#853](https://github.com/dso-toolkit/dso-toolkit/issues/914))

### Chores
* Yarn Workspaces ([#836](https://github.com/dso-toolkit/dso-toolkit/issues/836))
* Branch "next" maken + README.md bijwerken ([#837](https://github.com/dso-toolkit/dso-toolkit/issues/837))
* Packages "@dso-toolkit/core" en "@dso-toolkit/styling" opstarten ([#844](https://github.com/dso-toolkit/dso-toolkit/issues/844))
* Web Components: Statificeren tbv. Markup voorschriften ([#888](https://github.com/dso-toolkit/dso-toolkit/issues/888))
* `.ignore` opruimen ([#914](https://github.com/dso-toolkit/dso-toolkit/issues/914))
* svg4everybody verwijderen ([#916](https://github.com/dso-toolkit/dso-toolkit/issues/916))

## 15.0.1

### Fixed
* Formulier met `fieldset.form-group` + `fieldset.form-group` toont onterecht een horizontale lijn (#909)

## 15.0.0

### Fixed
* Fieldset legends in wizard accordion worden niet gestyled (#896)
* Search Bar border kleur gelijk maken aan invoerveld (#846)

### Changed
* **BREAKING**: Heading toevoeging bij banner om een beschrijving te geven bij het icoon (#767) **Markup changes, see PR #848**

### Documentation
* Dode links in start documentatie pagina en kleine tekst wijzigingen (#879)
* Documentatie Anchor, Banner, Cards, Definition list toegevoegd (#872)

### Toolkit library browser changes
* Toegankelijkheid Navigatiebalk verbeteren (#833)
* Diverse library en build fixes (#890)
* Herstel de navigatie scroll positie na navigatie (#832)
* "Alle versies" in version selector geeft niet alle versies (#904)

## 14.0.0

### Changed
* Single button op een single-page-form ook links laten uitlijnen. (#825)
* **BREAKING**: Button positionering wizard issues (#841) **Markup changes, see PR #871**

## 13.0.0

### Changed
* NPM vervangen met Yarn (#834)
* **BREAKING**: Bootstrap ingecheckt onder `/libs`: Geen node_modules dependency meer (#835) **Build changes, see PR #868**
* **BREAKING**: sr-only tekst toevoeging bij status icoon alert (#765) **Markup changes, see PR #847**
* **BREAKING**: List-button volgorde is niet logisch (#829) **Markup changes, see PR #831**

### Added
* Nieuw component: Input Number (#797)

### Fixed
* "Toelichting" wordt dubbel voorgelezen door screenreader (#813)

## 12.0.0

### Removed
* **BREAKING**: Progressblock verwijderen (#802) **Removal notice, see PR #814**

### Changed
* **BREAKING**: Fieldsets in accordion (#731) **Markup changes, see PR #784**
* Iconen minus-square en plus-square updaten (#796)
* Sass-lint vervangen met Stylelint (#805)
* **BREAKING**: Labels mogen niet bestaan zonder ingesloten invoerelement of for attribuut (#819) **Markup change, see PR #822**

### Added
* Voorbeeld pagina Wizard stap 4 (#789)
* Voorbeeld pagina Actieverzoeken (#791)

### Documentation
* Versie selector voor pre-versie 10 toolkits (#697)
* Viewport meta-tag toevoegen aan component pagina's in de toolkit (#816)

## 11.4.1

### Changed
* Gebruik van text-overflow ellipsis minimaliseren (#774)
* Gebruik van whitespace no-wrap minimaliseren (#772)
* Documentatie update van iconen, process aanvragen toegevoegd (#806)
* Documentatie update van Attachment counter, Badge, Breadcrumbs (#810)

### Added
* Definition lists met columns zonder onderbreking (#779)

### Fixed
* Links naar Digitoegankelijk.nl in Documentatie werken niet (#799)
* Fix voor niet aansluiten section-handles in accordion (#785)

### Deprecated
* Progressblock deprecaten (#792) **Deprecation notice, see PR #803**

## 11.4.0

* Incomplete release

## 11.3.0

### Changed
* Cards: selectievakjes verwijderen en info knopjes verduidelijken met beschrijvend sr-only (#722)
* Tertiaire button - icon only: title attribuut verwijderen en sr-only toevoegen (#775)
* Validatie teksten verplichte velden bij componenten (#747)

### Added
* Voorbeeld pagina Homepage (#761)
* List button component uitbreiden (#756)
* Table: sr-only toevoeging in actieve row (#758)

### Fixed
* List-button group styling (#780)

### Documentation
* Documentatie bijgewerkt van alerts, modals, logo, kleuren, typografie, lay-out, illustraties en zoeksuggesties (#760)

## 11.2.1

### Fixed
* Documentation: Favicon ontbreekt (#752)

### Documentation
* Version selector rechtsbovenin (#698)
* CHANGELOG link en begeleidende tekst op Alle versies (#701)

## 11.2.0

### Changed
* Collator: Aria-hidden verwijderd op `dso-example-text` (#708)
* Documentation: Teksten voor labels bij anchors aangepast (#704)
* Highlight box top margin aanpassen (#738)
* Documentation: Verwijderen van `<p>` in Lists component (#720)

### Added
* Form, Group files: "Verwijderen" en "Vertrouwelijk selectievakje" refereren naar bestandsnaam met `aria-describedby` (#709)
* Pagination: Huidige pagina markeren met `aria-current="page"` (#713)
* Form: Info button voorzien van aria-expanded attribuut (#707)
* Group-select; Bij aanwezigheid helpText, dan aria-describedby op select (#711)
* Group-radio: Bij aanwezigheid helpText, `aria-describedby` op fieldset (#712)

### Fixed
* Documentation: In voorbeeldpagina van formulieren kunnen dubbele id's voorkomen (#730)
* Documentation: Geselecteerde tab markeren met `aria-selected="true"`, overige tabs markeren met `aria-selected="false"`. (#706)
* Progress indicator zonder witte achtergrond, enkel onbepaalde tijd ondersteunen (#734)

### 11.1.0

### Changed
* Marges in de toolkit (#500)

### Added
* Ontbrekende Input types verwerken in de toolkit (#694)
* Clock Icon en Mail Icon toevoegen aan Toolkit (#716)

### Fixed
* Forms en group input missen autocomplete (#671)
* Tree-view: Uitklapbare knopjes in navigatiebalk missen heading en aria-collapsed (#632)

## 11.0.0

### Added
* Search Bar gebruiken om te filteren in een lijst (#681)
* Standaard Tabel Responsive maken (#491)
* Form buttons in of buiten formulieren, voor wizard werkvorm (#682)

### Changed
* **BREAKING**: Progress Indicator uitbreiden (#692)
* **BREAKING**: Verplicht geneste fieldsets eruit halen (#693)
* Badge en label verduidelijken (#662)
* Menu knop bij kleine header is niet in lijn met huidige stijl (#503)

## 10.9.0 - 22-07-2020

### Added
* Voorbeeld pagina met componenten, Badge, Footnote, Cards, Searchbar (#690)

### Fixed
* Tertiaire button en links te weinig contrast in Info component (#686)
* Email input niet verwerkt in de toolkit. (#687)

## 10.8.0 - 08-07-2020

### Added
* Externe link sr-only tekst 'opent externe link' toevoegen (#679)

## 10.7.0 - 23-06-2020

### Changed
* **BREAKING**: Flexibele buttons in wizard / gebruik van form (#670): De classname `dso-sections` is komen te vervallen, Form-pager component is vervallen.
* **BREAKING**: Dropdown button toegankelijk maken (#663): Markup `dropdown-menu` is gewijzigd, betekenisloze `li.divider` mag niet langer gebruikt worden.

### Fixed
* tabs: mist aria (#668)
* Favicon: tabel mist header (#661)
* dso.nl homepage valideert niet (#669)

### Deprecated
* Carousel deprecated maken (#673)

## 10.6.0 - 10-06-2020

### Fixed
* dso-toolkit.nl: eerste link 'index' heeft onduidelijke naam (#657)

### Changed
* Documentatie progress-bar component (#451)
* **BREAKING**: breadcrumb verbeteringen (#648)

## 10.5.0 - 03-06-2020

### Changed
* Search bar met zichtbaar label (#631)
* Tertiaire link op highlight box geeft te weinig contrast (#626)
* **BREAKING**: Rich content (eventueel uit CMS afkomstig) in banner component (#641): in de component moet de inhoud in een `div.dso-rich-content` komen te staan.
* Stappenteller pagina ombouwen naar landingspagina Aanvragen (#650)

## 10.4.0 - 12-05-2020

### Added
* Externe link mist rel="noopener noreferrer"(#623)

### Fixed
* Marges in implementatie treeview verschillen (#638)
* Ongewenste styling active tertiare buttons (#511)
* Een build met nieuwe templates zonder de bijbehorende reference DOM files faalt niet (#488)
* Line-height headings werken alleen binnen class="dso-rich-content" (#640)

### Changed
* Toolkit structuur platslaan (#604)
* Illustraties optimaliseren met svgo (#452)

## 10.3.1 - 30-04-2020

### Fixed
* Icon "sort" is verkeerd (#637)

## 10.3.0 - 29-04-2020

### Added
* 404 storingspagina voorbeeld toegevoegd (#608)
* Table filter (#567)
* Table sorteren (#568)

### Changed
* Line-height headings definiëren (#606)

### Fixed
* Searchbar kapt onderkant letters af (#625)
* Gedeelte van weergave Dropdown-button valt weg in DSO-Toolkit (#616)

## 10.2.0 - 15-04-2020

### Toolkit library browser changes
* Componentenfilter in navigatie (#578)
* Fixed: HTML in toolkit heeft geen highlighting meer (#622)

### Added
* Datum en tijdnotatie (#598)
* Search Bar voorzien van label (#621)

### Fixed
* Modal zonder header en footer heeft geen margin meer (#618)

### Changed
* Indeling tabel varianten (#605)
* Table redesign (#564)
* Andere indeling cards pagina's (#515)
* **BREAKING**: Tekststructuur vervolg (#585): De classnames `dso-is-document`, `dso-is-chapter`, `dso-is-title`, `dso-is-department`, `dso-is-paragraph`, `dso-is-subparagraph`, `dso-is-subsubparagraph` en `dso-is-article` zijn komen te vervallen.

## 10.1.0 - 31-03-2020

### Changed
* Accordion: aria-expanded en knoppen ipv links (#482)
* Modal component (#554)
* Pager herstyling (#575)
* Focus style search bar gelijk aan invoervelden (#577)

### Fixed
* Voorbeeld-frames tonen alle 404-pagina's (#603)

## 10.0.0 - 20-03-2020

### Toolkit library browser changes
* Structuur aanpassingen (#403)
* Toolkit layout verbeteren (#499)
* Replaced Handlebars parser and templates with Nunjucks (#573)
* Incorrecte language tags op dso-toolkit.nl (#422)
* Bij openen www.dso-toolkit.nl geen redirect naar master maar naar de laatste versie (#561)
* Toolkit 404 pagina (#509)

### Added
* Tree component (#594)
* Dropdown button uitbreiden met label in items (#596)

### Changed
* **BREAKING**: Status iconen altijd met witte border (#586): De iconen `di-forbidden-outline`, `di-status-danger-outline`, `di-status-info-outline`, `di-status-success-outline` en `di-status-warning-outline` zijn komen te vervallen.

### Fixed
* Validatie tekst onvoldoende contrast op grijze achtergrond (#580)
* Shopping cart bewerken knop voldoet niet aan WCAG (#581)
* www.dso-toolkit.nl werkt niet in IE11 (#498)
* img in .dso-rich-content kan te breed worden (#595)

## 9.9.0 - 02-03-2020

### Added
* Toegankelijke structuur voor juridische documenten (#492)
* Cards component voorzien van variant zonder dropshadow (#549)
* Shopping cart uitbreiding (#425) **Deprecation notice, see issue**
* Verbetering tabel documentatie (#483)
* Attachments counter component (#532)
* Pdf-bestanden documentatie (#550)
* Bijzondere tekstverbeeldingen in typografie geplaatst (#530)
* Iconen update (#563)
* Illustraties tbv storingsschermen (#570)
* Zoekbalk type-ahead documentatie (#366)

### Changed
* Aanpassing bootstrap container width variabelen (#420)
* Accordion faq styling (#523)

### Fixed
* Een tertiaire button is hoger dan 24px (#524)

## 9.8.0 - 21-02-2020

### Fixed
* Link gestyled als button in highlightbox met class dso-white heeft verkeerde kleuren (#512)
* Paperclip en teller (`.dso-attachments`) worden niet wit wanneer het paneel van het accordion is uitgeklapt (#514)
* Bij het description Icon is het kruisje nog steeds 16*16 en niet 24*24 (#516)
* Positie info button bij een label over meerdere regels (#517)

### Changed
* Marges formulier elementen (#421)
* Icons in (primaire, secundaire en default) buttons, verloren gegane modifiers, margins (#438)
* Hoogte inputfields en dropdowns niet juist (#506)
* Fieldset legend styling (#518)
* Gebruik laatste (3.4.1) versie van bootstrap-sass (#522)

### Added
* Banners (#472)

## 9.7.0 - 27-01-2020

### Added
* Voorbeeld van skelet beheerscherm met gebruik definition list en tabel (#484)
* Iconen wijziging - indicatoren (#502) Note: Geen wijziging maar toevoeging van iconen
* Card component (#400)
* Accordion component uitbreiding (#457)

### Changed
* Button positionering (#401)

### Fixed
* Rendering iconen niet overal 24x24 (#497)
* Waarschuwing (icoon) wordt niet voorgelezen in de shopping cart (#493)

## 9.6.0 - 15-01-2020

### Added
* Iconen set vervangen door DSO huisstijl iconen (#480) Note: `di di-at` bestaat niet meer

## 9.5.0 - 07-01-2020

### Added
* Begrippen in tekst (#240)
* Toevoegen button component (#426)
* Documentatie Typeahead (#366)

### Changed
* accessibility, accordion: screen reader leest afgerond / niet afgerond niet wegens decoratieve icoontjes (#309)
* Navigatie verbeteringen (#394)

## 9.4.0 - 25-11-2019

### Fixed
* Icoon bij validatie te klein (#463)
* Modal uitzoomen geeft vreemde rendering (#456)

## 9.3.0 - 11-11-2019

### Added
* Icoon .status-danger toevoegen aan conclusion component (#454)
* Icoon bij veldvalidatie (#455)

## 9.2.0 - 28-10-2019

### Changed
* Focus states formulier elementen (#416)
* Terug naar default focus states (#418)
* Documentatie: Iconen, Logo's, Buttons, Status-meldingen. taal, taalgebruik, labels in navigatie, liststyles (#411)

### Fixed
* Shopping kart toelichting mist icoon in lopende tekst (#445)
* In sluitknop van modal is het icoon niet netjes gecentreerd (#447)
* Uitlijning info-button met tekst is onjuist (#441)

## 9.1.0 - 18-10-2019

### Added
* Locatie van dso-icons.svg in variabele `$dso-icons-path` ondergebracht (default: `../`) (#435).

### Fixed
* Typefout in CHANGELOG migratie documentatie (#436)

## 9.0.0 - 14-10-2019

### Added
* Dropdown menu items checkable maken (#373)

### Changed
* **BREAKING**: Tertiaire button `.btn-link` redesign (#372).
* **BREAKING**: SVG iconen (#414).
* Andere iconen voor status indicatoren (success, info, warning en danger) (#357)
* Kleine buttons mogelijk maken met class btn-sm (#377)
* **BREAKING**: Highlight-box component prefixen met `dso-` (#369)

### Removed
* DSO specifieke markup voor het pagination component. Deze is gemarkeerd als deprecated in versie 8.2.0 door issue #272

#### Migratie notities:

##### SVG Iconen (#414)

Zie de memo in #414 voor de achtergrond.

Voorheen:
```html
<span class="fa fa-user" aria-hidden="true"></span>
```

Moet worden:
```html
<svg class="di di-user">
  <use href="dso-icons.svg#user" />
</svg>
```

Notes:
* Tijdens het upgraden zal het voorkomen dat een icoon niet meer beschikbaar is. In dat geval is samen met het UX team de volgende procedure bedacht:
  1. Gebruik het placeholder icoon `wip-wip`.
  2. Geef aan het UX team door welke iconen je mist.

  Het UX team zal het verzoek beoordelen en indien nodig een icoon in DSO huisstijl ontwerpen. Het icoon wordt dan opgenomen in de toolkit. In de CHANGELOG zal duidelijk aangegeven worden welke iconen er toegevoegd zijn.

  `wip-wip` zal nooit een "echt" icoon worden. Het is daarom een ideaal keyword om de broncode op te doorzoeken naar missende iconen.
* Een namespace attribuut is niet nodig als het icoon in een HTML5 applicatie wordt gebruikt (https://developer.mozilla.org/en-US/docs/Web/SVG/Element/svg).
* In het `use` element mag direct `href` ipv `xlink:href` worden gebruikt. In SVG2 is `xlink:href` deprecated (https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/xlink:href).
* In bovenstaand voorbeeld verwijs ik naar `dso-icons.svg`:
  * Als de toolkit scss files worden gecompileerd, moet de implementatie zorg dragen dat uiteindelijk `node_modules/dso-toolkit/dist/toolkit/dso-icons.svg` wordt gebundled;
  * Als de toolkit via de CDN wordt gebruikt werken SVG iconen direct;
  * Als de toolkit de CSS uit de NPM package gebruikt moeten de bundlers/loaders rekening houden dat de SVG files worden meegenomen in de build;
* FontAwesome is geen dependency meer. Tevens wordt Bootstrap's Glyphicons niet meer gebundled.
* IE11 heeft geen support voor `use href` naar een externe URI of data URI. Elke implementatie van de toolkit moet deze tekortkoming compenseren. De library is ook een implementatie van de toolkit en maakt gebruik van [svg4everybody](https://github.com/jonathantneal/svg4everybody).

Het voorschrift voor de carousel maakte voorheen gebruik van Bootstrap's glyphicons. Het SVG-icoon element moet een modifier `icon-next` en `icon-prev` krijgen. Dit zijn standaard Bootstrap modifiers.

##### Tertiaire button `.btn-link` redesign (#372)
De modifier `.download` en `.extern` zijn op `.btn` niet meer toegestaan.

Het label van een `.btn` dient vanaf nu in een `span` te zitten.

Voorheen:
```html
<button type="..." class="btn ...modifiers">
  Label
</button>

<a href="..." class="btn ...modifiers">
  Label
</a>
```

Moet worden:
```html
<button type="..." class="btn ...modifiers">
  <span>Label</span>
</button>

<a href="..." class="btn ...modifiers">
  <span>Label</span>
</a>
```

Iconen in `.btn` krijgen geen `float: left` meer en is daarom geen block-element meer. Zoals alle inline elementen is _whitespace_ altijd _significant whitespace_. Het is van belang dat tussen het label en icoon geen whitespace staat.

**Let op:** Frontend frameworks/libraries genereren markup niet altijd zoals het template is opgebouwd.

```html
<!-- OK -->
<... class="btn ...">
  <span>Label</span><svg class="di ..."></svg>
</...>

<!-- NOT OK -->
<... class="btn ...">
  <span>Label</span>
  <svg class="di ..."></svg>
</...>

<... class="btn ...">
  <span>Label</span> <svg class="di ..."></svg>
</...>
```

##### Highlight-box component prefixen met `dso-` (#369)

Het highlight-box component is een van de laatste niet-Bootstrap componenten die geen `dso-` prefix had.

Voorheen:
```html
<div class="highlight-box">
  [..]
</div>
```

Moet worden:
```html
<div class="dso-highlight-box">
  [..]
</div>
```

De highlight-box had een aantal niet-prefixed modifiers:
* `highlight-box-yellow` -> `dso-yellow`
* `highlight-box-bordered` -> `dso-border`

`dso-drop-shadow` voldeed al aan de `dso-` prefix en is ongewijzigd.

## 8.5.0 - 30-09-2019

### Added
* Loaders: spinner en progress bar (#341)

### Changed
* Documentatie: Definition List (#310)

### Fixed
* Bevindingen formulier elementen (#407)

## 8.4.0 - 16-09-2019

### Added
* Focus states (#367)
* Buttons in alerts (#339)

### Changed
* Buttons verbeteringen (#337)
* Tabs optimalisatie (#354)
* Verbeterde contrastverhouding formulier elementen (#380)
* Line-height lager in alerts (#381)

### Fixed
* build: SASS Lint wordt niet in buildstraat gedraaid (#395)

## 8.3.0 - 02-09-2019

### Added
* Templates update. Nieuwe templates voor samenwerken (#329)
* Accordeon titels met koppen (#340)
* Gelijke hoogte kolommen voor highlight-box (#365)

### Fixed
* Afbeelding over de volledige breedte: onnodige margin bottom en typefout in SCSS variable (#370)

### Changed
* Titels H1-H4 kleur naar bosgroen (#374)

## 8.2.0 - 19-08-2019

### DEPRECATED
* In versie 6.0.1 is de Bootstrap Pagination als preview meegekomen. In deze release is oude DSO Pagination deprecated. Oplossing: Migreer naar de Bootstrap Pagination (#272)

### Added
* Winkelwagen component (#349)
* Highlight box stappenteller (#359)
* Full width Image (#336)
* Standaard lijn in .row element verwijderen (#360)

### Fixed
* Inline radios met error heeft teveel ruimte tussen keuzes en foutmelding (#342)

## 8.1.0 - 05-08-2019

### Added
* Highlight Box restyling en variaties (#325)
* Stappenteller boven whitebox (#326)

## 8.0.1 - 26-07-2019

### Fixed
* Search Bar niet conform ontwerp (#347)
* Formulier Files groep niet conform ontwerp (#346)

## 8.0.0 - 22-07-2019

### Added
* Formulier: Files component (#328)

### Changed
* **BREAKING**: Expliciete zoek knop bij zoekbalken (#298)

## 7.3.1 - 08-07-2019

### Fixed
* Variabele voor DSO's icon-font mist (#333)

## 7.3.0 - 17-06-2019

### Changed
* Redesigned "Accordion" component (#307)
* Redesigned "Button" component (#308)
  * Class modifier `.dso-no-top-border` op accordion's bestaat niet meer en kan veilig worden verwijderd.
* Headings typografie aangepast (#311)
* Font Asap update improvement (#318)
* Documentatie: Startgids en toelichting Modal component (#322)

### Fixed
* Verticale uitlijning table button-span elementen en tekst elementen gaat niet bij alle button-elementen goed bug (#317)

## 7.2.0 - 27-05-2019

### Added
* DSO IconFont (#261)

### Changed
* Margins hr-element aanpassingen (#312)
* Verticale uitlijning table button-span elementen en tekst elementen (#305)

## 7.1.0 - 16-04-2019

### Added
* Underline bij hover op anchor (#299)

### Changed
* Header margin-bottom naar 8px (#297)

## 7.0.1 - 15-04-2019

### Fixed
* Margins van paragraph in `.dso-conclusion` (#295)

## 7.0.0 - 10-04-2019

### Changed
* **BREAKING**: Tooltip positioneren (#281)
* In modals sluitenkruis standaard tonen (#275)

### Fixed
* Plaat in toelichting buiten formulier niet meer in het midden gepositioneerd (#291)

### Added
* Definition List component modifiers uitbreiden (#239)
* Verkleinen fontsize badges (van 16px naar 14px) (#269)

## 6.0.1 - 27-03-2019

### Fixed
* `.dso-info` als status-indicator in `.dso-accordion` krijgt onterecht achtergrondkleur (#289)

### Added
* Pagination conform Bootstrap markup preview (#272)

## 6.0.0 - 22-03-2019

In #282 is een nieuw component geintroduceerd. Voor dit component zijn de `form-field-info` componenten generiek beschikbaar gesteld. Dit betekent dat de volgende classnames zijn aangepast:
* `.dso-field-info` -> `.dso-info`
* `.dso-field-info-button` -> `.dso-info-button`

### Changed
* **BREAKING**: Conclusie component (#282)
* Kleur succes-icoon aanpassen naar #79b929 (#288)

### Fixed
* Anchor text-decoration: underline scopen tot .alert, .highlight-box, .dso-rich-content, en .dso-info (#286)
* Anchor visited state in .alert en .highlightbox naar tekstkleur (#285)

## 5.1.0 - 04-03-2019

### Added
* Whitebox component (#264)
* Alert heeft nu ook margin aan de bovenkant, mits deze niet bovenaan staat (#283)

### Changed
* Underline aanzetten bij standaard text links (#280)
* Link color in Alerts en Highlight box naar tekstkleur (#265)

### Documentation
* Component status bijwerken (#278)

## 5.0.0 - 15-02-2019

### Changed
* **BREAKING**: Tabs in lijn brengen met bootstrap markup (#268)

## 4.0.0 - 04-02-2019

### Added
* CSS regressie testing en de WCAG checker uitgeschakeld (#8)

### Fixed
* **BREAKING:** Header elementen kunnen over elkaar heen vallen (#178)
* Kleur aanpassing tabel caption (#259)
* Accordeon pijltje wordt kleiner op Hover (#253)
* Searchbar z-index (#241)
* Maximale hoogte van .dso-body in modal te klein / niet handig (#191)

### Changed
* **BREAKING:** Tooltip: Bootstrap markup handhaven (#252)
* Interlinie in .dso-rich-content (#233)

## 3.1.1 - 23-01-2019

### Fixed
* Plaat in `.dso-rich-content` in het midden positioneren moet gescoped worden op toelichtingenbox (#250)

## 3.1.0 - 02-01-2019

* Border onder hover/focus state (vervolg uit #31)
* Accordeon border-top schakelbaar maken (#152)
* Stappenteller in Koppen (#153)
* Info button for formfield labels (#190)
* Info textbox for formfields (#203)
* Added `.dso-tabs` component (#156)
* Plaat in `.dso-rich-content` in het midden positioneren (#242)

### Fixed
* Accordeon font-size naar 20px (#185)
* Tertiare button 16px, icon 18px (#186)
* Hamburger menu documentatie bijwerken met instructies voor scripting (#188)
* Lijnen van secundaire button niet altijd even dik (#193)
* Label spacing padding too small (#194)
* Icoon a.extern::after en dso-succes a::after beten elkaar (#204)
* Correctie berekening hoogte Fractal content-panel (#208)
* Externe link icoontje verspringt niet meer bij een dubbele regel (#205)
* Default height textarea (#216)

## 3.0.1 - 21-11-2018

### Added
* `.dso-rich-content` component ter documentatie (#228)
* highlight-box in `.dso-rich-content` support (#232)

### Fixed
* Table in .dso-rich-content styling zoals table.table, table-row classes toegevoegd (#220)
* Fix vertical margins on child elements of components with vertical padding possibly containing block elements. Wrapping the entire inner content in a single `div.dso-rich-content` can be omitted in the majority of cases. (#189)

## 3.0.0 - 13-09-2018

### Releasenotes
* #31: De markup is aangepast. De Bootstrap pagination is vervangen door een DSO pagination en de Bootstrap Pagination styling is uitgeschakeld.
* #71: Het search bar component is nieuw. Dit component moet doorgevoerd worden in de header en verwijderd worden uit het menu.
* #88: De CodeSniffer melding was tweedelig: De navigatiecomponenten kregen onterecht een role=presentation. Deze is verwijderd
* #113: Een groot aantal legacy components zijn verwijderd, zie issue voor meer informatie

### Added
- **BREAKING:** Added `.dso-label` component, disabled Bootstrap's label component (#103)
- **BREAKING:** Added `.dso-badge` component, disabled Bootstrap's badge component (#125)
- Hamburger menu small view example (#135)
- Tooltip component (#137)

### Changed
- **BREAKING:** Pagination redesign (#31)
- **BREAKING:** Searchbar redesign (#71)
- Formulieren "optioneel" omgedraaid naar "verplicht" (#146)
- Logo updaten (#167)

### Fixed
- **BREAKING:** HTML_CodeSniffer outdated - wrongfully not reporting errors (#88)
- **BREAKING:** WCAG errors in 2.0.0-alpha.2 (#143)
- **BREAKING:** Remove legacy components (#113)
- Disabled buttons with hover styles wrong (#145)
- Font-Awesome classnames fix FA v5 (#148)
- Checkbox display in IE 11 (#149)
- Modal repositions when content changes (#151)
- IE11 modal is positioned left (#163)
- Deprecated fontawesome-free-webfronts package used (#165)
- Icons.scss generated wrongly on unix-based OS (#168)
- `.dso-rich-content` in highlight-box component (#170)
- Iconen van zoeken en inloggen lijnen vreemd uit (#176)
- Header toont rond 800px breed helemaal geen menu (#177)

## 2.0.0 - 23-06-2018

### Releasenotes
* #60: De Bootstrap Modal heeft plaats gemaakt voor de DSO Modal. De Bootstrap Modal styling is uitgeschakeld.
* #61: De jumbotron volgens de DSO styling is in 2.0.0 geintroduceerd. Tegelijkertijd is de styling van de Bootstrap jumbotron uitgeschakeld.
* #87: De tabs en pills markup van bootstrap is komen te vervallen voor DSO specifieke markup.

### Changed
- **BREAKING:** Jumbotron component (#61)
- **BREAKING:** Smaller navs component for viewer (#87)
- Breadcrumbs, WCAG Contrast error plus margin adjustment (#112)
- Image replacement in documentatie (#132)

### Added
- **BREAKING:** Modal component (#60)
- Definition list component (#78)
- Smaller accordion icons (#121)
- Add Color Lime 20% to Toolkit (#114)
- Rich content component (#85)

### Fixed
- img in .hero-image has width but no height (#107)
- Asap font doesn't look sharp (#69)
- Font path is faulty (#136)
- Add "Zwart 5%" change "Zwart 10%" (#100)
- Primary Button WCAG Contrast Error (#111)

### Removed
- Deprecated styling for .form-field - legend (#100)

## 1.2.4 - 15-05-2018

### Changed
- Redone: Space missing between link text and icon (#126)

## 1.2.3 - 14-05-2018 [DEPRECATED]

This release has been deprecated in favour of 1.2.4. A bug was introduced in #126.

### Fixed
- img in .hero-image has width but no height (#107)
- Space missing between link text and icon (#126)

## 1.2.2 - 17-04-2018

### Fixed
- Invalid import path and build documentation (#105)

## 1.2.1 - 06-04-2018

### DEPRECATION INTRODUCED IN #94: Build error "NoLegend"
In de formulieren restyle zit een bug. Elke werkvorm in een formulier bestaat uit een `.form-group`. Dit is een `div`-element, behalve voor `.dso-radios` en `.dso-checkboxes`: Dan is het een `fieldset`.

Om de opbouw uniform te houden (`.form-group > .dso-label-container + .dso-field-container`) is het (voor `fieldset` verplichte) `legend` ten onrechte *in* de `.dso-label-container` beland. De regel is echter `fieldset > legend`.

De voorschriften zijn dus aangepast.

`< 1.2.1`
```html
<fieldset class="form-group dso-[checkboxes|radios]">
  <div class="dso-label-container">
    <legend>Welke auto</legend>
  </div>
  <div class="dso-field-container">
    [..]
  </div>
</div>
```

`>= 1.2.1`
```html
<fieldset class="form-group dso-[checkboxes|radios]">
  <legend class="dso-label-container">
    <label>Welke auto</label>
  </legend>
  <div class="dso-field-container">
    [..]
  </div>
</div>
```

De verkeerde notatie is deprecated maar zal visueel blijven werken. Vanaf 2.0.0 niet meer.

### Added
- Documentated .extern and .download modifiers in .btn (#74)

### Fixed
- Select input improvement (#93)
- Build error "NoLegend" (#94) (DEPRECATED NOTICE)

## 1.2.0 - 30-03-2018

De `1.2.0` release bestaat uit onderstaande samen met:
* #89: Duplicate line in table header
* Tijdelijke oplossing in afwachting van #71
* Een fix wat in #75 is stukgemaakt van #34

**Belangrijk: De *Input group* componenten in de "Button" variant zijn praktisch bijgetrokken maar zijn nog in afwachting van een redesign**
**Belangrijk: De WCAG checker geeft bij Formulieren, Checkboxen en Radios aan dat er fieldsets zijn die geen legend hebben. De voorschriften geven echter WEL een `<legend>`. Uitzoeken in #94**

### 1.2.0-beta.0 - 23-03-2018
Vandaag is de eerste beta van de `1.2.0` uitgekomen. Dit betekent
* dat de API (in principe) vast staat
* features niet meer zullen worden toegevoegd of verwijderd
* alleen nog maar bugs gefixed worden.

Vrijdag 30 maart komt de definitieve release uit. Bugs die na 30 maart worden gemeld, zullen in 1.2.1 worden gefixed. Hier staat geen release schema voor. Er kan snel gereleased worden. Nieuwe features worden in 1.3.0 of 2.0.0 uitgebracht.

Deze release is bijzonder: Het is "maar" een minor increment. Volgens SemVer zou dit non-breaking moeten zijn, maar deze release bevat maar liefst 5 (!) issues die breaking in de codebase zijn. Dit is een zeer onwenselijke situatie, maar we kunnen nu niet anders meer. In het vervolg:
* zullen breaking changes een major increment zijn
* zullen breaking changes aangekondigd worden en waar mogelijk zal een change backwards compatible zijn en "deprecated" worden gemarkeerd

De breaking changes zitten niet alleen in de componenten maar ook in de filosifie van de DSO Toolkit. De toolkit is sinds 1.2.0 *framework agnostisch*: Dit betekent 100% CSS. Waar de toolkit voor een expliciete dependency op jQuery had, wordt er nu geen toolkit javascript meer gemaakt en/of verwacht. De componenten met breaking changes zijn alert, accordion, formulieren en buttons.

### Geen jQuery dependency
In [#72](https://github.com/dso-toolkit/dso-toolkit/issues/73) heb ik een uitleg gegeven waarom de jQuery dependency is verdwenen. Sinds 1.2.0 levert de toolkit geen javascript meer, en heeft ook geen javascript framework meer nodig. De implementator moet zich houden aan de voorschriften die de stijlgids voorschrijft en de toolkit zorgt dan voor een site zoals DSO deze voorschrijft.

### Accordion
Het eerste component dat bovenstaande breaking change meteen voelt, is de accordion. Los daarvan, is er ook een nieuw design.

De vorige accordion was gebasseerd op Bootstrap, voor zover dat al kan: Bootstrap heeft geen "dedicated" Accordion. In plaats daarvan kan de Panel-markup worden verrijkt, waarna met `collapse.js` een accordion kan worden gemaakt.

Deze aanpak werkt prima, mits je tevreden bent met een jQuery dependency en niet zoveel aan Bootstrap's panel styling hoeft te doen. Maak je gebruik van een SPA framework, of genereer je markup serverside werd het iets lastiger. Daarbij was het ontwerp van DSO totaal conflicterend met Bootstraps panel design en moest er veel worden tegengestijld.

Nu de toolkit geen javascript meer levert, is de demo pagina statisch geworden. Er kan immers geen interactie meer worden getoond. Bijkomend voordeel is dat Bootstrap's Panel markup niet meer als basis dient. Samen met het complexere design is er voor een complete (breaking) overhaul gekozen.

De oude accordion had een root-element `.accordion`. Daarin staan meerdere `.panel`s.

```html
<div class="accordion">
  <div class="panel">
    <a class="section-toggle"href="#panel1">
      <span class="toggle-icon"></span>
      <h2>Paneel 1<span class="fa fa-check"></span></h2>
    </a>
    <div class="section-body collapse">
      <p>En dit is de inhoud van <strong>Paneel 1</strong></p>
    </div>
  </div>
</div>
```

De nieuwe accordion begint met een `.dso-accordion`.

```html
<div class="dso-accordion">
  <div class="dso-accordion-section dso-warning dso-open">
    <div class="dso-section-handle">
      <a href="#">Plaats van het bouwwerk</a>
    </div>
    <div class="dso-section-body">
      <p>En dit is de inhoud van <strong>Plaats van het bouwwerk</strong></p>
    </div>
  </div>
</div>
```

In een `.dso-accordion` staan `.dso-accordion-section`s. Elke sectie heeft altijd een `.dso-section-handle`. In de handle staat een `a`. De click event moet op de `a` staan en waar mogelijk en logisch ook echt een change in de URL zijn.

Als een accordion open is, staat op het section element de class `.dso-open`. Deze verzorgt de oranje tekstkleur en het chevron-up icon.

Naast het handle-element staat het body element: `.dso-section-body`.

* Staat er geen `.dso-open` op het section element, krijgt de `.dso-section-body` een `display: none`.
* Een section kan vier modifiers hebben: `dso-success`, `dso-info`, `dso-warning` en `dso-danger`.

### Alert
Alert's hadden altijd al vier states. Deze 4 states zijn verrijkt met iconen. Voorheen kon elk icoon in de Alert geplaatst worden.

* De voorgeschreven markup bij het gebruik van iconen is anders.
* Er is geen dikgedrukt label meer voorafgaand aan de melding.

De oude Alert met icoon:

```html
<div class="alert alert-success" role="alert">
  <span class="fa fa-check" aria-hidden="true"></span>
  <span class="sr-only">Success</span> De wijziging is opgeslagen!
</div>
```

Het `span` element voor het icon is komen te vervallen. Een icoon zit komt voortaan standaard bij het soort melding: `success`, `info`, `warning` en `danger.

Bij een alert zonder icoon betekent dat het `<strong>TYPE</strong>` element voorafgaand aan de melding niet meer gemaakt wordt.

Nieuwe alert:

```html
<div class="alert alert-success" role="alert">
  De wijziging is opgeslagen!
</div>
```

### Buttons
De expliciete Call to Action buttons zijn opgegaan in de `btn-primary`. Visueel kan hetzelfde resultaat worden bereikt door `.cta-primary` te vervangen met `.btn.btn-primary` en `.cta-default` met `.btn.btn-default`.

### Formulieren

Formulieren zijn compleet brekend geworden. Het is zo veel dat het niet haalbaar is om dat hier uiteen te zetten.

* De kolomverdeling van een "Form horizontal" was eerst 25/75. Dat is nu 50/50
* Een formulier bestaat uit `.form-group` elementen. De groep elementen voor een "Form horizontal" en "Form vertical" zijn nu gelijk geworden. Met een modifier class `.form-horizontal` op de `<form>` wordt het formulier responsive.
* Checkboxen en radio's zijn volgens DSO ontwerp (niet meer default browser gedrag)
* DSO classnames zijn nu prefixed met `dso-`.


Elke veld in het formulier begint in een `.form-group`. Op hetzelfde element bevindt zich de validatie, required en type modifiers. Als het veld een radio of checkbox werkvorm betreft, is het root element geen `div` maar `fieldset` en is het element `label` in de `.dso-label-container` vervangen met een `legend`.

Een verplicht, ongeldig ingevuld tekstveld ziet er als volgt uit:

```html
<!-- oud -->
<div class="form-group input text">
  <label for="group_input_voorbeeld" class="control-label">
    Voornaam
  </label>
  <div class="field-container">
    <input type="text" id="group_input_voorbeeld" class="form-control" />
  </div>
</div>

<!-- nieuw -->
<div class="form-group dso-input dso-input-text dso-invalid dso-required">
  <div class="dso-label-container">
    <label for="voornaam" class="control-label">
      Voornaam
    </label>
  </div>
  <div class="dso-field-container">
    <input type="text" id="voornaam" class="form-control" required>
  </div>
</div>
```

De nieuwe voorschriften geven veel meer houdvast voor de toekomst. Wij begrijpen dat dit een heftige change is, maar we hebben ervoor gekozen om het nu goed te doen in plaats van verder te pleisteren en onszelf (en jullie) later tegen te komen.

Op de `.form-group` staat een `.dso-input` en `.dso-input-text`. Het veld wordt ongeldig aangegeven door `.dso-invalid`. Als een ongeldig veld geldig wordt gemaakt, vervangt de class `.dso-valid` de `.dso-invalid` class. Een veld dat nog nooit ongeldig is geweest krijgt geen `dso-valid` class.

Een verplicht veld wordt met `.dso-required` aangegeven. **Zorg er nog steeds voor dat de interactieve elementen (input, select en textarea) van een `required` attribuut worden voorzien**. De `.dso-required` class is slechts visueel.

Een `.form-group` bevat ook de werkvorm modifiers:
* `.dso-checkboxes` (Let op: Root element is een `fieldset`)
* `.dso-confirm`
* `.dso-input.dso-input-TYPE` waar `TYPE` een van de volgende waardes is: `date`, `datetime-local`, `email`, `month`, `number`, `password`, `range`, `search`, `tel`, `text`, `time`, `url`, `week`.
* `.dso-radios` (Let op: Root element is een `fieldset`)
* `.dso-select`. Als het een `select[multiple]` is, staat er ook een `.dso-multiple` op de `.form-group`.
* `.dso-static`.
* `.dso-textarea`.

Als de `.form-group` *geen* `.dso-required` modifier heeft komt er "optioneel" naast het veld label te staan.

### Pager
Pagers bevatten geen iconen meer:

```html
<nav aria-label="Zoekresultaten pager">
  <ul class="pager">
    <li class="previous">
      <a href="#">
        <span aria-hidden="true">&larr;</span> <!-- Dient niet meer gebruikt te worden -->
         Vorige
      </a>
    </li>
    <li class="next disabled">
      <a href="#">
        Volgende
        <span aria-hidden="true">&rarr;</span> <!-- Dient niet meer gebruikt te worden -->
      </a>
    </li>
  </ul>
</nav>
```

### Added
- Documentation: Layout (#18)
- Favicon (#12)
- Build tools: developer mode (#44)
- Fractal collator improvement (#82)

### Changed
- BREAKING: Accordion redesign (#39)
- BREAKING: Formulieren: Tekstvelden en labels (#32)
- BREAKING: Buttons redesign (#25)
- BREAKING: Alert design improvements (#22)
- BREAKING: Pager redesign (#27)

- Typography (#14)
- Updated `access-sniff` package to version 3.1.0 (#16)
- Documentation: Colors update (#26)
- FontAwesome 5 (#40)
- Footer redesign (#35)
- Gutter width is 15px instead of 16px (#67)
- Wrong font in Navs component (#80)
- Responsive hamburger menu styling (#72)
- Button modifiers do not work properly on anchors (#75)
- Radiobuttons redesign (#43)
- Checkboxes redesign (#42)
- Space missing between link text and icon (#126)

## 1.1.0 - 2017-01-19
### Changed
- Changed nav variant `tabs` styling (#4)
- Accordion's arrow animates when opened or closed (#2)
- Accordion has a bigger click area (#3)

## [1.0.6] - 2018-02-12
### Changed
Node 9 compatible package.json (#11)

### Fixed
- In small viewport the hamburgermenu button active state forces button below search field (#10)
- img in .hero-image has width but no height (#107)

## [1.0.5] - 2017-12-01 (Re-released 2018-09-02)
The source code is moved to a public GitHub repository. Source code of versions older than 1.0.5 are not published, and are only available through NPM.

### Added
- "News article" example
- Anchor types "external" and "download"

### Changed
- All components are marked as `ready`
- An external anchor should have a `target="_blank"`

### Fixed
- Wrong `@font-family` in Asap `@font-face`

## [1.0.0] - 2017-10-31
Initial release
