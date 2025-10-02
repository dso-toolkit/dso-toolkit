# Werkafspraken

In dit document staan de werkafspraken die niet passen in linters, codecheckers, build configuraties of andere automatische tooling.

Het is niet de bedoeling dat werkafspraken óók als automatische check bestaan. Hiermee willen we voorkomen dat de werkafspraken uit de pas lopen met automatische checks.

## Voertaal

Tussen de diverse communicatiekanalen (Slack, code, GitHub) en gebruikers (Afnemers, maintainers) heerst een spanningsveld mbt. de voertaal.

Uitgangspunt is: De voertaal van de DSO Toolkit is Nederlands, tenzij:

- Namen van componenten zijn Engels.
- (Lokale) code is Engels, uitgezonderd domeinspecifieke termen (zoals Renvooi).
- Teksten (voor de eindgebruiker) in code worden vertaald met i18n-files. Zie [Internationalization](./internationalization) voor meer informatie.

## Change Management Notatie

Zie [Change Management Notatie](./change-management-notatie).

## Stencil

### State

- Gebruik geen werkwoorden in state-namen. Bijvoorbeeld: `modalVisible` in plaats van `showModal`.

### Props

- Voeg `| undefined` toe aan verplichte props.
  Zo blijft Stencil ze als verplicht zien, maar dwingt onze code rekening te houden met `undefined` wanneer een element zonder verplichte attributen wordt gebruikt. Zonder dit kan een exceptie het component breken.
- Primitive props (`boolean`, `string`, `number`) altijd `reflect: true` meegeven. Dit maakt debuggen makkelijker en is transparanter voor afnemers.
