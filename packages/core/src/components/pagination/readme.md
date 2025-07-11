# `<dso-pagination>`

<!-- Auto Generated dso-toolkit -->

## Types

### PaginationSelectPageEvent

```typescript
export interface PaginationSelectPageEvent {
  /** The selected page */
  page: number;
  /** The original pointer event */
  originalEvent: MouseEvent;
  /** True when user selected the page holding Ctrl, Alt or other modifiers. Can be used to determine navigation. */
  isModifiedEvent: boolean;
}
```

<!-- src/components/pagination/pagination.interfaces.ts::PaginationSelectPageEvent -->

<!-- Auto Generated Below -->

## Properties

| Property      | Attribute      | Description                                | Type                       | Default                |
| ------------- | -------------- | ------------------------------------------ | -------------------------- | ---------------------- |
| `currentPage` | `current-page` | Current page                               | `number \| undefined`      | `undefined`            |
| `formatHref`  | `format-href`  | This function is called to format the href | `(page: number) => string` | `(page) => "#" + page` |
| `totalPages`  | `total-pages`  | Total pages                                | `number \| undefined`      | `undefined`            |

## Events

| Event           | Description            | Type                                     |
| --------------- | ---------------------- | ---------------------------------------- |
| `dsoSelectPage` | Emitted on page select | `CustomEvent<PaginationSelectPageEvent>` |

## Dependencies

### Depends on

- [dso-responsive-element](../responsive-element)
- [dso-icon](../icon)

### Graph

```mermaid
graph TD;
  dso-pagination --> dso-responsive-element
  dso-pagination --> dso-icon
  style dso-pagination fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
