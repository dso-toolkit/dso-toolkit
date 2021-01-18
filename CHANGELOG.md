# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## NEXT

### Added
* **dso-toolkit:** Definition-list in accordion ([#882](https://github.com/dso-toolkit/dso-toolkit/issues/882))

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
