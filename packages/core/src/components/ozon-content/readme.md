# `<dso-ozon-content>`

## Known limitations
* Geen sluitenknop in Description component. Zie #1288.

```typescript
export interface OzonContentAnchorClick {
  href: string;
  documentComponent: string;
  originalEvent: PointerEvent;
}
```

<!-- Auto Generated Below -->


## Properties

| Property  | Attribute | Description | Type                  | Default     |
| --------- | --------- | ----------- | --------------------- | ----------- |
| `content` | `content` |             | `string \| undefined` | `undefined` |


## Events

| Event         | Description | Type                                  |
| ------------- | ----------- | ------------------------------------- |
| `anchorClick` |             | `CustomEvent<OzonContentAnchorClick>` |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
