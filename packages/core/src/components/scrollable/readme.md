# `<dso-scrollable>`

<!-- Auto Generated dso-toolkit -->

## Types

### DsoScrollEndEvent

```typescript
export interface DsoScrollEndEvent {
  scrollEnd: "top" | "bottom";
}
```

<!-- src/components/scrollable/scrollable.interfaces.ts::DsoScrollEndEvent -->

<!-- Auto Generated Below -->

## Events

| Event          | Description                                                 | Type                             |
| -------------- | ----------------------------------------------------------- | -------------------------------- |
| `dsoScrollEnd` | Event emitted when the scrollbar has reached top or bottom. | `CustomEvent<DsoScrollEndEvent>` |

## Dependencies

### Used by

- [dso-autosuggest](../autosuggest)
- [dso-map-controls](../map-controls)
- [dso-modal](../modal)

### Graph

```mermaid
graph TD;
  dso-autosuggest --> dso-scrollable
  dso-map-controls --> dso-scrollable
  dso-modal --> dso-scrollable
  style dso-scrollable fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
