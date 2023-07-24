# Stijlen op Web Component attributes.

Het koppelvlak van een Web Component uit de DSO Toolkit bestaat voornamelijk uit attributen en properties, en events. Het is ook mogelijk om met CSS custom properties te werken. Het koppelvlak _van de toolkit_ heeft (nog) geen CSS custom properties. In dit artikel gaan we alleen in op het werken met attributen en properties.

Een Web Component heeft twee typen attributen: Functioneel en/of stijlen.

Met Stencil worden functionele attributen en properties samengevoegd tot een "Prop". Stencil synchroniseert de waarde van een prop tussen een attribuut en property. Zie de documentatie voor Stencil voor meer informatie over de `@Prop()` decorator.

In een Stencil Component wordt met `@Prop()` het functionele koppelvlak gedefinieerd.

```tsx
// component.tsx
export class DsoComponent {
  @Prop()
  groente?: string;
}

// afnemer.html
<dso-component groente="wortel"></dso-component>;
```

Attributen en properties die in een Stencil Component niet met een prop zijn gedefinieert mag niet op worden gestijld. Een noemenswaardig attribuut is het `class` attribuut. Je zou kunnen zeggen dat dit attribuut al op `HTMLElement` is gedefineerd en mag daarom niet nogmaals worden gedefineerd.

Om binnen een component te kunnen stijlen moet je in plaats van een class gebruik maken van attributen. Dit kan een functioneel attribuut zijn, maar je kan ook een stijlattribuut toevoegen. Dit kan met een Stencil Functional Component `<Host>`.

Het is bad practice dat een Web Component op zijn host element classes gaat toevoegen/verwijderen. Zie https://web.dev/custom-elements-best-practices/ "Do not self-apply classes.".

```tsx
// ❌
render() {
  return (
    <Host class="dso-fullscreen">
      <div>[...]</div>
    </Host>
  );
}

// ✅
render() {
  return (
    <Host fullscreen>
      <div>[...]</div>
    </Host>
  );
}
```

## Stijlen op boolean attributes

Speciale aandacht is nodig voor het stijlen op boolean attributes. Dit zijn attributen waarvan alleen de **aanwezigheid** van het attribuut en **niet de waarde** van het attribuut, `true` betekent.

Een `input` of `button` met `disabled="false"` is nog steeds disabled. Dit komt omdat `disabled` een boolean attribute is.

De speciale aandacht komt omdat wij voor onze React afnemers hebben. React heeft matige ondersteuning voor Web Components en dat komt onder andere door de hard-coded support voor boolean attributes.

Aanschouw de volgende situatie:

```scss
// component.scss ❌
:host([available]) {
  background-color: green;
}
```

```tsx
// component.tsx
export class DsoComponent {
  @Prop()
  available = true;
}

// afnemer.tsx
<DsoComponent available={false} />

// Browser DOM
<dso-component available="false"></dso-component>
```

In `component.tsx` hebben we met `@Prop() available` een boolean attribute gedefinieerd. Omdat React een hard-coded lijst van boolean attributes en niet uitgebreid kan worden wordt `available="false"` gezet. De selector `:host([available])` zal onterecht de styling zetten.

Er zijn 4 partijen waar de oplossing vandaan kan komen:

- React: Behoorlijke ondersteuning van attributes en properties voor Web Components (https://github.com/facebook/react/issues/11347).
- Stencil: Stencil weet wat boolean attributes zijn en zou het attribuut dus helemaal achterwege kunnen laten (https://github.com/ionic-team/stencil-ds-output-targets/issues/123).
- De afnemer: Voor boolean attributes het attribuut niet laten zetten met `<DsoComponent available={isAvailable || null} />`.
- De toolkit: Styling op boolean attributes rekening laten houden met de waarde `false`.

In de basis is dit niet ons probleem, maar omdat de we niet op React en/of Stencil willen wachten en we het ook niet het probleem van de afnemer willen maken gaan we voor de laatste oplossing:

```scss
// component.scss ✅
:host([available]:not([available="false"])) {
  background-color: green;
}
```
