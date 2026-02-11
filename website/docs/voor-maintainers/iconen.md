# Iconen

De DSO Toolkit biedt een iconenset aan. Deze set is op een aantal manieren te gebruiken.

## Iconenset beheren

- De **single source of truth** bevindt zich in Figma: DSO Library, DSO Identiteit, Iconset
- Download **altijd** de gehele iconenset vanuit Figma. Ongeacht of er één of meer iconen zijn toegevoegd of verwijderd
  of dat de iconenset (svg-bestanden) compleet is vernieuwd.
- Plaats de gedownloade svg-bestanden in een folder naar keuze of in de repository in de folder
  `packages/dso-toolkit/src/icons-new`.
- Indien de nieuwe iconen in een folder naar keuze zijn geplaatst voer dan in de root van de repository het volgende
  commando uit: `yarn icons --newIconsDir <folder naar keuze>`.
- Indien de nieuwe iconen in de folder `packages/dso-toolkit/src/icons-new` in de repository geplaatst, dan
  is het commando simpelweg `yarn icons`. Het commando beschouwt die locatie als de default locatie.
- Het commando `yarn icons` voert het script `scripts/icons` uit.
  Dit script:
  - transformeert de naam van de uit Figma gedownloade svg-bestanden naar de gewenste naam
  - optimaliseert de svg-bestanden met de node.js library [SVG Optimizer](https://github.com/svg/svgo). De custom plugin `setFillCurrentColor`
    zet `fill="currentColor"` op die svg-bestanden van iconen die in Figma Single Color Icons worden genoemd, zodat deze
    svg-bestanden via css van een ander kleur kunnen worden voorzien. `setFillCurrentColor` houdt daarbij rekening met
    iconen, waarvoor dit niet moet gebeuren. Dat zijn de iconen die in Figma Multi Color Icons worden genoemd: deze
    hebben een vaste kleurstelling. Daarnaast wordt het icon `spinner` niet door het script geprocessed, omdat dit een
    speciaal icon is met een animatie erin.
  - schrijft de geoptimaliseerde svg-bestanden weg naar `/packages/dso-toolkit/src/icons`
  - werkt het Web Component `/packages/core/src/components/icon/icon.tsx` bij. Dit betekent dat de import-statements
    van alle svg-bestanden worden vervangen en dat de const `icons` opnieuw gevuld wordt met de nieuwe alias-objecten.
  - genereert het type IconAlias in 2 bestanden:
    - packages/core/src/components/icon/icon.interfaces.ts
    - packages/dso-toolkit/src/components/icon/icon.models.ts
  - genereert een json-file `packages/dso-toolkit/storybook-assets/icons.json`: dit bestand wordt gebruikt tbv van icon-selectie
    in Storybook
- Daarna is het nog wel zaak om de ontstane diff te beoordelen en eventueel handmatig bij te werken.

## Spritesheet

De `di` mixins maken gebruik van de spritesheet (`di.svg`). Deze spritesheet wordt gegenereerd aan de hand van de `.svg` en matchende (naam)`.scss` file in `/packages/dso-toolkit/src/icons`.

Om een nieuw icoon toe te voegen aan deze spritesheet is het nodig om een nieuwe matchende .scss file te maken met daarin een matchende lege selector. De selector kan optioneel gevuld zijn om properties aan te passen .

```scss
// /packages/dso-toolkit/src/icons/status-danger.scss
// stylelint-disable-next-line block-no-empty -- allow empty block so that this icon is rendered in di.svg
status-danger {
}
```

Het is mogelijk om van een icoon een variant met een andere kleur te maken. Dit kan door een stylesheet met dezelfde naam naast het icoon te plaatsen. In de SVG worden alle `fill="currentColor"` vervangen met de waarde van de CSS property `color`.

```
/packages/dso-toolkit/src/icons/cross.svg
/packages/dso-toolkit/src/icons/cross.scss
```

```scss
// /packages/dso-toolkit/src/icons/cross.scss

@use "../variables/colors";

cross {
  color: colors.$grasgroen;
}

cross:bosgroen {
  color: colors.$bosgroen;
}
```

Elke pseudo selector in de stylesheet wordt een variant. Styling zonder pseudo selector wordt als default styling toegepast.

## Icon component

Voor het gebruik van een icon maken we altijd gebruik van `<dso-icon>`. In de markup voorschriften maken we altijd gebruik van `iconTemplate()` uit de Template Container.

## `di` mixins.

"di" staat voor **D**SO Toolkit **I**con. De `di.base()` en `di.variant()` mixins worden in HTML/CSS implementaties
gebruikt voor werkvormen waar de afnemer geen vrije keuze voor iconen heeft. Denk bijvoorbeeld aan het Alert component: De iconen zijn gekoppeld aan de variant. "Danger" heeft altijd het gele gevarendriehoek. Het icoon is afhankelijk van de variant. Bij de Web Component implementatie is dit scriptend geregeld, maar voor de HTMl/CSS implementatie is het icoon gekoppeld aan de modifier classes voor de varianten.

Deze mixins gaan niet uit van een pseudo element. Die verantwoordelijkheid ligt bij de maintainer.

Maak altijd gebruik van `di.base()`. Als op hetzelfde element voorwaardelijk een ander icoon moet worden getoond (bijvoorbeeld bij hover), dan kan met `di.variant()` alleen het icoon worden gewijzigd zonder de extra CSS properties te dupliceren.

```scss
@use "di";

.dso-component {
  ::before {
    content: "";

    @include di.base("cross");
  }

  &:hover {
    @include di.variant("cross-red");
  }
}
```

Deze mixins worden nooit in een Web Component gebruikt. Gebruik dan `<dso-icon>`.
