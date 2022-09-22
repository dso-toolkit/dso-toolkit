# `<dso-ozon-content>`

Het Ozon Content component verwerkt XML die uit de Ozon API komt.

## Custom Event interfaces

```typescript
export interface OzonContentAnchorClick {
  href: string;
  documentComponent: string;
  originalEvent: PointerEvent;
}

export interface OzonContentClick {
  originalEvent: Event;
}
```

<!-- Auto Generated Below -->


## Properties

| Property      | Attribute     | Description                                                                                                                                                                                                                                                                                                                                                                                                                                      | Type                     | Default     |
| ------------- | ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------------------ | ----------- |
| `content`     | `content`     | The XML to be rendered.                                                                                                                                                                                                                                                                                                                                                                                                                          | `string \| undefined`    | `undefined` |
| `deleted`     | `deleted`     | Marks content as deleted using visual and accessible clues.                                                                                                                                                                                                                                                                                                                                                                                      | `boolean`                | `false`     |
| `inline`      | `inline`      | Setting this property creates dso-ozon-content as inline element instead of a block element.                                                                                                                                                                                                                                                                                                                                                     | `boolean`                | `false`     |
| `interactive` | `interactive` | Visualize the component as interactive. This means that the component will emit `dsoClick` events when the user clicks non-interactive elements.  **Do not** use this without an accessible companion element! `interactive` is only meant to ease the use of the companion element for mouse/touch users.  * `true`: Interactive anchor-look-alike * `"sub"`: Interactive anchor-look-alike for sub navigation * `false \| undefined`: Disabled | `"" \| "sub" \| boolean` | `false`     |


## Events

| Event            | Description                                                        | Type                                  |
| ---------------- | ------------------------------------------------------------------ | ------------------------------------- |
| `dsoAnchorClick` |                                                                    | `CustomEvent<OzonContentAnchorClick>` |
| `dsoClick`       | These events are only emitted when the component is `interactive`. | `CustomEvent<OzonContentClick>`       |


----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
