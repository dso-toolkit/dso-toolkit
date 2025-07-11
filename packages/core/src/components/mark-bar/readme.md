# `<dso-mark-bar>`

<!-- Auto Generated dso-toolkit -->

## Types

### MarkBarClearEvent

```typescript
export interface MarkBarClearEvent {
  originalEvent: MouseEvent;
}
```

<!-- src/components/mark-bar/mark-bar.interfaces.ts::MarkBarClearEvent -->

### MarkBarInputEvent

```typescript
export interface MarkBarInputEvent {
  originalEvent: Event;
  value: string;
}
```

<!-- src/components/mark-bar/mark-bar.interfaces.ts::MarkBarInputEvent -->

### MarkBarPaginationEvent

```typescript
export interface MarkBarPaginationEvent {
  originalEvent: MouseEvent | KeyboardEvent;
}
```

<!-- src/components/mark-bar/mark-bar.interfaces.ts::MarkBarPaginationEvent -->

<!-- Auto Generated Below -->

## Properties

| Property     | Attribute     | Description                                      | Type                  | Default                |
| ------------ | ------------- | ------------------------------------------------ | --------------------- | ---------------------- |
| `current`    | `current`     | The current (one-based) highlighted search item. | `number \| undefined` | `undefined`            |
| `label`      | `label`       | The label for the input field.                   | `string`              | `"Zoeken in document"` |
| `totalCount` | `total-count` | Total number of search results.                  | `number \| undefined` | `undefined`            |
| `value`      | `value`       | The current search value.                        | `string \| undefined` | `undefined`            |

## Events

| Event         | Description                                                  | Type                                  |
| ------------- | ------------------------------------------------------------ | ------------------------------------- |
| `dsoClear`    | Emitted when user activates "clear search result" button.    | `CustomEvent<MarkBarClearEvent>`      |
| `dsoInput`    | Emitted each time the user types in the search field.        | `CustomEvent<MarkBarInputEvent>`      |
| `dsoNext`     | Emitted when user activates "next search result" button.     | `CustomEvent<MarkBarPaginationEvent>` |
| `dsoPrevious` | Emitted when user activates "previous search result" button. | `CustomEvent<MarkBarPaginationEvent>` |

## Methods

### `dsoFocus(options?: MarkBarFocusOptions) => Promise<void>`

Focuses the input field.

#### Parameters

| Name      | Type                  | Description |
| --------- | --------------------- | ----------- |
| `options` | `MarkBarFocusOptions` |             |

#### Returns

Type: `Promise<void>`

## Dependencies

### Depends on

- [dso-icon](../icon)

### Graph

```mermaid
graph TD;
  dso-mark-bar --> dso-icon
  style dso-mark-bar fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
