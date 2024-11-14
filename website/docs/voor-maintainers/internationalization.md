# Internationalization (i18n)

Ten behoeve van meertaligheid van onze Web Componenten maken we gebruik van [`i18next`](https://www.i18next.com/).

De taal is Nederlands (default) of Engels. De huidige taal wordt bepaald door in het DOM te zoeken naar het
dichtstbijzijnde element met `lang`-attribuut. Het `lang`-attribuut mag op elk element staan, waarmee secties in
hetzelfde document verschillende talen kunnen hebben. De taalinstelling gebeurt eenmalig net nadat het Web Component in het DOM is geplaatst. Web Componenten luisteren niet naar een eventuele wijziging van het `lang`-attribuut in het DOM.

Naast het Web Component definiëren we een typescript file met daarin een const `translations` de we exporteren:

`<web-component-naam>.i18n.ts`

```ts
import { Resource } from "../../utils/i18n";

export const translations: Resource = {
  en: {
    "dso-<web-component-naam>": {
      simple: "Simple text",
      interpolate: "{{var}} has not been found.",
    },
  },
  nl: {
    "dso-web-component-naam": {
      simple: "Eenvoudige tekst",
      interpolate: "{{var}} is niet gevonden.",
    },
  },
};
```

In het Web Component maken we gebruik van een onze custom utility function `i18n`.
Daar geven we een functie die het host-element retourneert en de translations van het web component aan mee.
(DsoAlert als voorbeeld)

```tsx
import { i18n } from "../../utils/i18n";

import { translations } from "./alert.i18n";

@Element()
host!: HTMLDsoAlertElement;

private text = i18n(() => this.host, translations);
```

Dit stelt ons in staat teksten als volgt op te halen:

Een eenvoudige tekst (zonder interpolatie):

```tsx
this.text("simple");
```

resulteert in : `Eenvoudige tekst` of `Simple text`.

Een tekst met interpolatie:

```tsx
this.localVar = "dummy";
this.text("interpolate", { var: this.localVar });
```

resulteert in : `dummy is niet gevonden` of `dummy has not been found`.
