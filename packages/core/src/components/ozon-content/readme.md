# `<dso-ozon-content>`

## Known limitations
* Geen sluitenknop in Description component. Zie #1288.

```typescript
export interface ContentAnchor {
  href: string;
  documentComponent: string;
  originalEvent: PointerEvent;
}
```

<!-- Auto Generated Below -->


## Properties

| Property               | Attribute | Description | Type     | Default     |
| ---------------------- | --------- | ----------- | -------- | ----------- |
| `content` _(required)_ | `content` |             | `string` | `undefined` |


## Events

| Event         | Description | Type                         |
| ------------- | ----------- | ---------------------------- |
| `anchorClick` |             | `CustomEvent<ContentAnchor>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
