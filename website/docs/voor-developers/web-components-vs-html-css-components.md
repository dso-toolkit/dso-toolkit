# Web Components vs. HTML/CSS componenten

In dit artikel wil ik de voordelen van Web Componenten ten aanzien van HTML/CSS componenten uiteenzetten.

## Er was eens...

...een HTML/CSS component genaamd Accordion.

_In het kader van leesbaarheid en onderhoudbaarheid is onderstaand voorbeeld niet exact gelijk aan de daadwerkelijke markup voorschriften._

```html
<!-- Basis -->
<div class="dso-accordion dso-accordion-default dso-accordion-reverse-align"></div>
```

Dit component bestaat uit

- 1 element
- 3 classes: `dso-accordion` en twee modifier classes `dso-accordion-default` & `dso-accordion-reverse-align`.

Een Accordion bestaat uit één of meerdere Accordion Sections:

```html
<!-- Open Accordion Section -->
<div class="dso-accordion-section dso-success dso-open">
  <h2 class="dso-section-handle">
    <button type="button" aria-expanded="true">
      <span class="sr-only">succes:</span>
      Hoe lang duurt de Vergunningcheck?
      <span class="dso-icon">
        <svg class="di di-plus">
          <use href="dso-toolkit/dist/dso-icons.svg#plus" />
        </svg>
      </span>
      <span class="dso-status-description">Controlevraag</span>
      <span class="dso-attachments">2 <span class="sr-only">bijlagen</span></span>
    </button>
  </h2>
  <div class="dso-section-body">
    <div class="rich-content">
      <p>
        De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle
        benodigde informatie bij de hand heeft.
      </p>
    </div>
  </div>
</div>
```

Dit component bestaat uit

- 8 elementen (dat is exclusief de elementen van andere HTML/CSS componenten)
- 6 classes (dat is exclusief de classes van andere HTML/CSS componenten)
- 5 modifier classes `dso-open`, `dso-success|dso-info|dso-warning|dso-danger`
- 5 onderdelen die van inhoud moeten worden voorzien: toegankelijke tekst voor de status, titel, toelichting voor de status, aantal bijlagen, de inhoud.
- 2 attributen (`type="button"` en `aria-expanded="true"`)

Accordion en Accordion Section bestaat samen uit 9 elementen, 14 classes, 5 "slots" en 2 attributen. Dit zijn 30 onderdelen.

Dit is het bijbehorende Web Component:

```html
<dso-accordion variant="default" reverse-align>
  <dso-accordion-section
    handle-title="Is het verplicht om de Vergunningcheck te doen?"
    heading="h2"
    status="success"
    status-description="Controlevraag"
    icon="plus"
    attachment-count="2"
    open
  >
    <div class="dso-rich-content">
      <p>
        De Vergunningcheck duurt ongeveer vijf minuten per gekozen werkzaamheid. Het is wel belangrijk dat u alle
        benodigde informatie bij de hand heeft.
      </p>
    </div>
  </dso-accordion-section>
</dso-accordion>
```

De Web Componenten Accordion en Accordion Section hebben een kleiner koppelvlak. Samen:

- 2 elementen
- 9 attributen.

31 onderdelen van het HTML/CSS component vs. 11 onderdelen van het Web Component maakt dat het Web Component een aanzienlijk kleiner koppelvlak heeft.

Een kleiner koppelvlak maakt de kans op breaking changes kleiner. Het Web Component maakt intern natuurlijk wel gebruik van een DOM wat ongeveer lijkt op het HTML/CSS component. Maar het Web Component is een abstractie tussen de presentatie logica en de afnemer.

Een kleinere kans op breaking changes komt niet alleen door het kleinere koppelvlak, maar ook doordat de (interne) presentatie elementen geen onderdeel zijn van het koppelvlak. Hierdoor kunnen kunnen UX designers en toolkit maintainers de presentatie elementen wijzigen zonder dat er een breaking release nodig is.

Er komt pas een breaking release als wijzigingen in het koppelvlak zijn. Zie ook: [Koppelvlak](/voor-developers/api.mdx).

## Shadow DOM

Bijna al onze Web Componenten hebben een Shadow DOM. Dit zorgt voor het isoleren van styling. Het zorgt ervoor dat een Web Component stabieler staat. Styling van de afnemer of andere libraries kunnen nagenoeg geen effect hebben op de elementen in het Shadow DOM.

En dit is precies wat we willen. Het is helemaal niet de bedoeling dat afnemers de componenten uit de toolkit gaan stijlen of functionaleit toevoegen. De enige juiste manier voor het aanpassen van toolkit componenten is via UX naar de toolkit codebase.

Overigens is het ook mogelijk om een Web Component zonder Shadow DOM te maken. Hiermee komen de elementen van het Web Component in hetzelfde DOM als het element van het Web Component.

Los van het feit dat afnemers meer invloed op de werking van het component hebben, is er nog een groot nadeel: De elementen van het Web Component komen in hetzelfde DOM van de afnemer. Bijna altijd is dit een framework zoals Angular of React. Deze frameworks hebben hypergeoptimaliseerde algoritmes om zo efficient mogelijk met het DOM om te gaan. Een van de uitgangspunten daarbij is dat er geen onbekende elementen in hetzelfde DOM terecht komen.
