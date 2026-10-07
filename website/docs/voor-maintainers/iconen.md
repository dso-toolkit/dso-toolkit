# Iconen

De DSO Toolkit biedt een iconenset aan. Deze set is op een aantal manieren te gebruiken.

## Iconenset beheren

- De **single source of truth** bevindt zich in Figma: DSO Library, DSO Identiteit, Iconset
- Download **altijd** de gehele iconenset vanuit Figma. Ongeacht of er één of meer iconen zijn toegevoegd of verwijderd
  of dat de iconenset (svg-bestanden) compleet is vernieuwd.
- Plaats de gedownloade svg-bestanden in een folder naar keuze of in de repository in de folder
  `packages/dso-toolkit/src/icons-new`.
- Indien de nieuwe iconen in een folder naar keuze zijn geplaatst voer dan in de root van de repository het volgende
  commando uit: `pnpm icons --newIconsDir <folder naar keuze>`.
- Indien de nieuwe iconen in de folder `packages/dso-toolkit/src/icons-new` in de repository geplaatst, dan
  is het commando simpelweg `pnpm icons`. Het commando beschouwt die locatie als de default locatie.
- Het commando `pnpm icons` voert het script `scripts/icons` uit.
  Dit script:
  - transformeert de naam van de uit Figma gedownloade svg-bestanden naar de gewenste naam
  - optimaliseert de svg-bestanden met de node.js library [SVG Optimizer](https://github.com/svg/svgo). De custom plugin `setFillCurrentColor`
    zet `fill="currentColor"` op die svg-bestanden van iconen die in Figma Single Color Icons worden genoemd, zodat deze
    svg-bestanden via css van een ander kleur kunnen worden voorzien. `setFillCurrentColor` houdt daarbij rekening met
    iconen, waarvoor dit niet moet gebeuren. Dat zijn de iconen die in Figma Multi Color Icons worden genoemd: deze
    hebben een vaste kleurstelling. Daarnaast wordt het icon `spinner` niet door het script geprocessed, omdat dit een
    speciaal icon is met een animatie erin.
  - schrijft de geoptimaliseerde svg-bestanden weg naar `/packages/dso-toolkit/src/icons`
  - werkt het Web Component `/packages/dso-toolkit/src/components/icon/icon.tsx` bij. Dit betekent dat de import-statements
    van alle svg-bestanden worden vervangen en dat de const `icons` opnieuw gevuld wordt met de nieuwe alias-objecten.
  - genereert het type IconAlias in 2 bestanden:
    - packages/dso-toolkit/src/components/icon/icon.interfaces.ts
    - storybook/src/components/icon/icon.models.ts
  - genereert een json-file `storybook/assets/icons.json`: dit bestand wordt gebruikt tbv van icon-selectie in Storybook
- Daarna is het nog wel zaak om de ontstane diff te beoordelen en eventueel handmatig bij te werken.

## `di` mixins

De `di` mixins maken gebruik van iconen die als data-uri worden ingebakken in CSS custom properties op `:root`
(gegenereerd door `@include di.inline-icons();` in `dso.scss`).

"di" staat voor **D**SO Toolkit **I**con. De `di.base()` en `di.variant()` mixins worden in HTML/CSS implementaties
gebruikt voor werkvormen waar de afnemer het icoon niet zelf kiest, maar waar het icoon vastligt bij een variant van
het component. Een voorbeeld is het List component: een `li` met de modifier class `dso-status-warning` toont altijd
het icoon `status-warning`, en een `li` met `dso-forbidden` toont altijd het icoon `forbidden` in de kleur rood. De
afnemer kiest dus de variant, en daarmee ligt het icoon vast. In een Web Component wordt het icoon bij de variant
gekozen in de component-code (bijvoorbeeld `<dso-alert status="warning">`, dat intern `<dso-icon>` gebruikt). In de HTML/CSS implementatie koppel je het icoon aan de modifier class van de variant. Dat doe je door in die
modifier class een `di` mixin aan te roepen. De mixins zetten alleen het icoon als achtergrondafbeelding op het
element waarin je ze aanroept:

- `di.base()` zet `background-image` plus de basis-CSS: `background-repeat`, `background-position`,
  `background-size`, afmetingen en `vertical-align`.
- `di.variant()` zet alleen `background-image`.

De mixins maken dus geen pseudo-element aan en zetten ook geen `content` of positionering. Wil je het icoon in een
pseudo-element tonen, zoals meestal het geval is, dan maak je zelf het `::before` of `::after` element aan. Daarin zet
je `content: ""` en zo nodig de positionering, en roep je de mixin aan:

```scss
ul > li.dso-status-warning {
  position: relative;

  &::before {
    content: "";
    position: absolute;
    inset-inline-start: -1.2em;

    @include di.base("status-warning");
  }
}
```

Om een icoon (en optioneel een kleur) beschikbaar te maken voor de `di` mixins, registreer je de combinatie in
`packages/dso-toolkit/src/di.scss`:

- `$colors`: de beschikbare kleurnamen met hun sass-kleurwaarde.
- `$icons`: per icoon een lijst met toegestane kleurnamen. Een lege lijst betekent dat het icoon vaste kleuren heeft
  (geen `currentColor` in de svg) en dus zonder kleur-argument gebruikt wordt.

```scss
// /packages/dso-toolkit/src/di.scss
$icons: (
  // ...
  "cross": ("grasgroen", "zwart") // ...
);
```

De build faalt met een duidelijke foutmelding als een icoon/kleur-combinatie wordt opgevraagd die niet in `$icons`
(of een kleur die niet in `$colors`) voorkomt. Voeg in dat geval de ontbrekende combinatie toe aan `$icons`
(en zo nodig de kleur aan `$colors`).

Maak altijd gebruik van `di.base($icon, $color, $override-property, $size, $vertical-align)`. Deze mixin past in één
keer het icoon en de bijbehorende basis-CSS (`background-repeat`, `background-position`, `background-size`,
afmetingen, `vertical-align`) toe. Als op hetzelfde element voorwaardelijk een ander icoon moet worden getoond
(bijvoorbeeld bij `:hover`), gebruik dan `di.variant($icon, $color, $override-property)`: hiermee wordt alleen het
icoon (dus alleen `background-image`) gewijzigd, zonder de overige CSS-properties te dupliceren.
`di.custom-property($icon, $color)` geeft de naam van de onderliggende custom property terug, bruikbaar wanneer je
zelf een `var()` wilt samenstellen (zoals in `global/mixins/set-colors.mixin.scss`).

```scss
@use "di";

.dso-component {
  &::before {
    content: "";

    @include di.base("cross", "grasgroen");
  }

  &:hover::before {
    @include di.variant("cross", "zwart");
  }
}
```

De `di.base()` en `di.variant()` mixins worden nooit in een Web Component gebruikt. Gebruik dan `<dso-icon>`.
`di.custom-property()` mag wel in Web Components gebruikt worden (bijvoorbeeld via `set-colors.mixin.scss`): de custom
properties worden op `:root` gedefinieerd en erven door in de shadow DOM. Roep `di.inline-icons()` nooit aan vanuit
de Web Components; dit gebeurt alleen in `dso.scss` en vereist de sass-functie `inline-icon-DI-ONLY` die via het
`@stencil/sass`-plugin in `packages/dso-toolkit/stencil.config.ts` is geregistreerd (geïmplementeerd in
`packages/dso-toolkit/scripts/sass-functions`).

## Icon component

- In een Web Component maken we altijd gebruik van het Core component `<dso-icon>`.
- In de markup voorschriften binnen Storybook component templates maken we altijd gebruik van `iconTemplate()`.
