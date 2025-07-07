# `<dso-badge>`

<!-- Auto Generated dso-toolkit -->

## Types

### BadgeStatus

```typescript
export type BadgeStatus = "primary" | "success" | "info" | "warning" | "error" | "outline" | "attention";
```

<!-- src/components/badge/badge.interfaces.ts::BadgeStatus -->

<!-- Auto Generated Below -->

## Properties

| Property | Attribute | Description              | Type                                                                                                | Default     |
| -------- | --------- | ------------------------ | --------------------------------------------------------------------------------------------------- | ----------- |
| `status` | `status`  | The status of the Badge. | `"attention" \| "error" \| "info" \| "outline" \| "primary" \| "success" \| "warning" \| undefined` | `undefined` |

## Dependencies

### Used by

- [dso-advanced-select](../advanced-select)
- [dso-document-component](../document-component)

### Graph

```mermaid
graph TD;
  dso-advanced-select --> dso-badge
  dso-document-component --> dso-badge
  style dso-badge fill:#f9f,stroke:#333,stroke-width:4px
```

---

_Built with [StencilJS](https://stenciljs.com/)_
