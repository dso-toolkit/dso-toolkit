# Werkafspraken

In dit document staan de werkafspraken die niet passen in linters, codecheckers, build configuraties of andere automatische tooling.

Het is niet de bedoeling dat werkafspraken óók als automatische check bestaan. Hiermee willen we voorkomen dat de werkafspraken uit de pas lopen met automatische checks.

## Voertaal

Tussen de diverse communicatiekanalen (Slack, code, GitHub) en gebruikers (Afnemers, maintainers) heerst een spanningsveld mbt. de voertaal.

Uitgangspunt is: De voertaal van de DSO Toolkit is Nederlands, tenzij:

- Namen van componenten zijn Engels.
- (Lokale) code is Engels, uitgezonderd domeinspecifieke termen (zoals Renvooi).
- Teksten (voor de eindgebruiker) in code worden vertaald met i18n-files. Zie [Internationalization](./internationalization) voor meer informatie.

## Branch namen

- Gebruik geen speciale tekens in branch namen. Gebruik alleen letters, cijfers en koppeltekens (`-`).
- Verwijder branches na het mergen van een PR.

## Pull Requests

- Alle UX feedback moet worden verwerkt in de PR van de betreffende story.

## Change Management Notatie

Zie [Change Management Notatie](./change-management-notatie).

## Resolven van een conversation in Pull Requests

Een reviewer plaatst een opmerking of vraag over 1 of meer regels code in een PR.
Dit is de start van een conversation.
De eigenaar van de PR reageert altijd op de opmerking of vraag van de reviewer in de betreffende conversation.
Als de conversatie is afgerond is het uiteindelijk de reviewer die de conversation resolved.

## Stencil componenten

### State

- Gebruik geen werkwoorden in state-namen. Bijvoorbeeld: `modalVisible` in plaats van `showModal`.

### Props

- Voeg `| undefined` toe aan verplichte props.
  Zo blijft Stencil ze als verplicht zien, maar dwingt onze code rekening te houden met `undefined` wanneer een element zonder verplichte attributen wordt gebruikt. Zonder dit kan een exceptie het component breken.
- Primitive props (`boolean`, `string`, `number`) altijd `reflect: true` meegeven. Dit maakt debuggen makkelijker en is transparanter voor afnemers. Dit geldt ook voor types die uit primitives bestaan.

## HTML/CSS componenten

We introduceren geen nieuwe HTML/CSS componenten meer omdat deze een groot koppelvlak hebben. Onderhoud verrichten we nog wel. We kiezen voor Web componenten omdat deze duurzamer zijn en er een duidelijke abstractie tussen koppelvlak en implementatie is. Het koppelvlak van een HTML/CSS component is voor een groot deel ook de implementatie. De enige beweegruimte die we als maintainers hebben is de CSS. Daarnaast kan je met een Web Component ook gedrag meeleveren, d.m.v scripting, i.p.v. documenteren.

## CSS media queries

We nesten media queries altijd in de selector waarop ze van toepassing zijn en gebruiken geen losse media-queryblokken met meerdere selectors erin. Dat geeft een duidelijk verwachtingspatroon: als je een selector leest, vind je de responsive varianten op dezelfde plek.

```scss
/* ✅ Media query genest in de selector */
.dso-modal {
  inline-size: 40rem;

  @media screen and (max-width: 48rem) {
    inline-size: 100%;
  }
}

/* ❌ Los media-queryblok met meerdere selectors */
@media screen and (max-width: 48rem) {
  .dso-modal {
    inline-size: 100%;
  }

  .dso-modal__footer {
    padding: 0.5rem;
  }
}
```

- Stijlen blijven zo beter gegroepeerd per componentdeel
- De kans op regressies bij refactors wordt kleiner en wordt onderhoud en review eenvoudiger omdat alle varianten van een selector bij elkaar staan
- Dit maakt het eenvoudiger om selectors te verplaatsen of te verwijderen zonder responsive regels te missen
- Conflicten in pull requests worden kleiner omdat aanpassingen vaker in hetzelfde, lokale selectorblok blijven

### Events

- @Event() voorzien we altijd van \{ bubbles: false \}
- We namespacen event names van custom elements niet met de naam van de component, alleen met de prefix dso
- De event interface is altijd de genamespaced met de naam van het componen (en niet met Dso)
- Native events die door onze custom elements worden gemaakt laten we niet uit het custom element "ontsnappen", dmv.
  stopPropagation.

## Deprecated/removed blog migratiepad

In de blogpost van de deprecation én in de blogpost van de removed van één van de twee implementaties (HTML/CSS of Core) van dubbel geïmplementeerde componenten tonen we altijd het volledige migratiepad. Dit betekent dat binnen één HTML markup codeblock de deprecated/removed code én de voorgeschreven code worden getoond. Boven de deprecated/removed code staat binnen het codeblock een ❌ en boven de voorgeschreven code een ✅.

Voorbeeld:

```html
❌
<span class="dso-badge badge-attention">Attention</span>

✅
<dso-badge status="attention">Attention</dso-badge>
```
