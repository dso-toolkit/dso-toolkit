# `<dso-annotation-locatie>`

<!-- Auto Generated dso-toolkit -->

## Types

### AnnotationActiveChangeEvent

```typescript
export interface AnnotationActiveChangeEvent {
  /**
   * De huidige status van de annotatie.
   */
  current: boolean;

  /**
   * De gewenste status van de annotatie.
   */
  next: boolean;

  originalEvent: Event;
}
```

<!-- src/components/annotation/annotation.interfaces.ts::AnnotationActiveChangeEvent -->

### AnnotationWijzigactie

```typescript
export type AnnotationWijzigactie = "voegtoe" | "verwijder";
```

<!-- src/components/annotation/annotation.interfaces.ts::AnnotationWijzigactie -->

### RenvooiValue

```typescript
export type RenvooiValue = { toegevoegd: string } | { was: string; wordt: string } | { verwijderd: string } | string;
```

<!-- src/components/renvooi/renvooi.interfaces.ts::RenvooiValue -->

<!-- Auto Generated Below -->

## Properties

| Property            | Attribute            | Description                                                                         | Type                                                                                                           | Default     |
| ------------------- | -------------------- | ----------------------------------------------------------------------------------- | -------------------------------------------------------------------------------------------------------------- | ----------- |
| `active`            | `active`             | Een optionele boolean die aangeeft of de annotatie actief is.                       | `boolean \| undefined`                                                                                         | `undefined` |
| `gewijzigdeLocatie` | `gewijzigde-locatie` | Een optionele boolean die aangeeft of de locatie van de annotatie gewijzigd is.     | `boolean \| undefined`                                                                                         | `undefined` |
| `locatieNoemer`     | `locatie-noemer`     | De noemer van de locatie.                                                           | `string \| undefined \| { toegevoegd: string; } \| { verwijderd: string; } \| { was: string; wordt: string; }` | `undefined` |
| `wijzigactie`       | `wijzigactie`        | Een optionele wijzigactie die aangeeft of de annotatie toegevoegd of verwijderd is. | `"verwijder" \| "voegtoe" \| undefined`                                                                        | `undefined` |

## Events

| Event             | Description                                                                   | Type                                       |
| ----------------- | ----------------------------------------------------------------------------- | ------------------------------------------ |
| `dsoActiveChange` | Een optionele event listener voor wijzigingen aan de status van de annotatie. | `CustomEvent<AnnotationActiveChangeEvent>` |

## Slots

| Slot        | Description                                             |
| ----------- | ------------------------------------------------------- |
| `"symbool"` | Een optionele afbeelding die de annotatie symboliseert. |

## Dependencies

### Used by

- [dsot-document-component-demo](../../document-component-demo)

### Depends on

- [dso-renvooi](../../renvooi)
- [dso-slide-toggle](../../slide-toggle)
- [dso-label](../../label)

### Graph

```mermaid
graph TD;
  dso-annotation-locatie --> dso-renvooi
  dso-annotation-locatie --> dso-slide-toggle
  dso-annotation-locatie --> dso-label
  dso-label --> dso-icon
  dso-label --> dso-tooltip
  dsot-document-component-demo --> dso-annotation-locatie
  style dso-annotation-locatie fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
