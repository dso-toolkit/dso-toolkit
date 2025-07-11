# `<dso-advanced-select>`

<!-- Auto Generated dso-toolkit -->

## Types

### AdvancedSelectChangeEvent

```typescript
export interface AdvancedSelectChangeEvent<T> {
  originalEvent: MouseEvent;
  option: AdvancedSelectOption<T>;
}
```

<!-- src/components/advanced-select/advanced-select.interfaces.ts::AdvancedSelectChangeEvent -->

### AdvancedSelectOption

```typescript
export interface AdvancedSelectOption<T> {
  label: string;
  value?: T;
}
```

<!-- src/components/advanced-select/advanced-select.interfaces.ts::AdvancedSelectOption -->

### AdvancedSelectOptionOrGroup

```typescript
export type AdvancedSelectOptionOrGroup<T> =
  | AdvancedSelectOption<T>
  | AdvancedSelectGroup<T>
  | AdvancedSelectPlaceholder;
```

<!-- src/components/advanced-select/advanced-select.interfaces.ts::AdvancedSelectOptionOrGroup -->

### AdvancedSelectRedirectEvent

```typescript
export interface AdvancedSelectRedirectEvent {
  originalEvent: MouseEvent;
  isModifiedEvent: boolean;
  redirect: AdvancedSelectGroupRedirect;
}
```

<!-- src/components/advanced-select/advanced-select.interfaces.ts::AdvancedSelectRedirectEvent -->

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                                               | Type                                       | Default     |
| ------------ | ------------- | ------------------------------------------------------------------------- | ------------------------------------------ | ----------- |
| `active`     | `active`      | The active option. By object reference.                                   | `AdvancedSelectOption<never> \| undefined` | `undefined` |
| `activeHint` | `active-hint` | An extra text for the active option. Only visible in the list of options. | `string \| undefined`                      | `undefined` |
| `options`    | `options`     | The options to display in the select.                                     | `AdvancedSelectOptionOrGroup<never>[]`     | `[]`        |

## Events

| Event         | Description                                        | Type                                            |
| ------------- | -------------------------------------------------- | ----------------------------------------------- |
| `dsoChange`   | Emitted when user selects an option                | `CustomEvent<AdvancedSelectChangeEvent<never>>` |
| `dsoRedirect` | Emitted when user activates a group redirect link. | `CustomEvent<AdvancedSelectRedirectEvent>`      |

## Dependencies

### Depends on

- [dso-badge](../badge)
- [dso-icon](../icon)
- [dso-label](../label)

### Graph

```mermaid
graph TD;
  dso-advanced-select --> dso-badge
  dso-advanced-select --> dso-icon
  dso-advanced-select --> dso-label
  dso-label --> dso-icon
  dso-label --> dso-tooltip
  style dso-advanced-select fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
