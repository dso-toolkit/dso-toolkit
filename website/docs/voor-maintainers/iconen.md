# Iconen

De DSO Toolkit biedt een iconenset aan. Deze set is op een aantal manieren te gebruiken.

## Iconenset beheren

- Voeg icoon toe aan `/packages/dso-toolkit/src/icons`.
- Bundel het icoon mee in de Web Component implementatie in `/packages/core/src/components/icon/icon.tsx`.

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
/packages/dso-toolkit/src/icons/times.svg
/packages/dso-toolkit/src/icons/times.scss
```

```scss
// /packages/dso-toolkit/src/icons/times.scss

@use "../variables/colors";

times {
  color: colors.$grasgroen;
}

times:bosgroen {
  color: colors.$bosgroen;
}
```

Elke pseudo selector in de stylesheet wordt een variant. Styling zonder pseudo selector wordt als default styling toegepast. Dit geldt dan ook voor de HTML/CSS implementatie.

## Icon component

Er zijn twee implementaties van het Icon component:

- HTML/CSS: `<svg class="di">`.
- Web Component: `<dso-icon>`.

Zie de betreffende documentatie in Storybook voor meer informatie over het gebruik van deze twee implementaties. Onder "Voorbeeldpagina's" is er een overzicht van alle beschikbare iconen.

Als maintainer kunnen wij ook gebruik maken van Icon:

- Voor een HTML/CSS implementatie geldt voor werkvormen zonder vrije icoon keuze dat de `di` mixins wordt gebruikt.
- In een Web Component maken we altijd gebruik van `<dso-icon>`.
- In de markup voorschriften maken we altijd gebruik van `iconTemplate()` uit de Template Container.
- De varianten in de spritesheet zijn niet in de HTML/CSS of Web Component implementatie beschikbaar.

## `di` mixins.

"di" staat voor **D**SO Toolkit **I**con. De `di.base()` en `di.variant()` mixis worden in HTML/CSS implementaties gebruikt voor werkvormen waar de afnemer geen vrije keuze voor iconen heeft. Denk bijvoorbeeld aan het Alert component: De iconen zijn gekoppeld aan de variant. "Danger" heeft altijd het gele gevarendriehoek. Het icoon is afhankelijk van de variant. Bij de Web Component implementatie is dit scriptend geregeld, maar voor de HTMl/CSS implementatie is het icoon gekoppeld aan de modifier classes voor de varianten.

Deze mixins gaan niet uit van een pseudo element. Die verantwoordelijkheid ligt bij de maintainer.

Maak altijd gebruik van `di.base()`. Als op hetzelfde element voorwaardelijk een ander icoon moet worden getoond (bijvoorbeeld bij hover), dan kan met `di.variant()` alleen het icoon worden gewijzigd zonder de extra CSS properties te dupliceren.

```scss
@use "di";

.dso-component {
  ::before {
    content: "";

    @include di.base("times");
  }

  &:hover {
    @include di.variant("times-red");
  }
}
```

Deze mixins worden nooit in een Web Component gebruikt. Gebruik dan `<dso-icon>`.
