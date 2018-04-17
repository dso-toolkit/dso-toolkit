# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](http://keepachangelog.com/en/1.0.0/) and this project adheres to [Semantic Versioning](http://semver.org/spec/v2.0.0.html).

## 2.0.0 - UNRELEASED

### Releasenotes
De jumbotron volgens de DSO styling is in 2.0.0 geintroduceerd. Tegelijkertijd is de styling van de Bootstrap jumbotron uitgeschakeld.

De Bootstrap Modal heeft plaats gemaakt voor de DSO Modal. De Bootstrap Modal styling is uitgeschakeld.

### Changed
- **BREAKING:** Jumbotron component (#61)

### Added
- Definition list component (#78)
- **BREAKING:** Modal component (#60)

### Fixed
- img in .hero-image has width but no height (#107)
- Asap font doesn't look sharp (#69)

### Removed
- Deprecated styling for .form-field - legend (#100)

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

De breaking changes zitten niet alleen in de componenten maar ook in de filosifie van de DSO Toolkit. De Toolkit is sinds 1.2.0 *framework agnostisch*: Dit betekent 100% CSS. Waar de toolkit voor een expliciete dependency op jQuery had, wordt er nu geen toolkit javascript meer gemaakt en/of verwacht. De componenten met breaking changes zijn alert, accordion, formulieren en buttons.

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
