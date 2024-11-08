# Internationalization (i18n)

Ten behoeve van meertaligheid van onze Web Componenten maken we gebruik van [`i18next`](https://www.i18next.com/).

De taal is Nederlands (default) of Engels. De huidige taal wordt bepaald door in het DOM te zoeken naar het
dichtstbijzijnde element met `lang`-attribuut. Het `lang`-attribuut mag op elk element staan, waarmee secties in
hetzelfde document verschillende talen kunnen hebben. De taalinstelling gebeurt eenmalig net nadat het Web Component in het DOM is geplaatst. Web Componenten luisteren niet naar een eventuele wijziging van het `lang`-attribuut in het DOM.

Naast het Web Component definiëren we een typescript file met daarin een const `translations` de we exporteren:

`<web-component-naam>.i18n.ts`

```ts
import { Resource } from "i18next";

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

In het Web Component maken we gebruik van onze custom utility function (async) `dtI18n`:

```tsx
  private i18nInstance: i18n | undefined;

  async componentWillLoad() {
    this.i18nInstance = await dtI18n(this.host);
  }
```

Dit stelt ons in staat teksten als volgt op te halen:

Een eenvoudige tekst (zonder interpolatie):

```tsx
this.i18nInstance.t("simple");
```

resulteert in : `Eenvoudige tekst` of `Simple text`.

Een tekst met interpolatie:

```tsx
this.localVar = "dummy";
this.i18nInstance.t("interpolate", { var: this.localVar });
```

resulteert in : `dummy is niet gevonden` of `dummy has not been found`.
