# `<dso-tab>`

<!-- Auto Generated dso-toolkit -->

## Types

### TabsSwitchEvent

```typescript
export interface TabsSwitchEvent {
  originalEvent: MouseEvent | KeyboardEvent;
  isModifiedEvent: boolean;
}
```

<!-- src/components/tabs/tabs.interfaces.ts::TabsSwitchEvent -->

<!-- Auto Generated Below -->

## Properties

| Property   | Attribute  | Description                                                                             | Type                   | Default     |
| ---------- | ---------- | --------------------------------------------------------------------------------------- | ---------------------- | ----------- |
| `active`   | `active`   | Makes the tab active. The tab for which the tabpanel is visible is the active tab.      | `boolean \| undefined` | `undefined` |
| `disabled` | `disabled` | Disables the tab. A disabled tab cannot be activated and it's tabpanel cannot be shown. | `boolean \| undefined` | `undefined` |
| `href`     | `href`     | The optional href of the tab. Creates an anchor if present. Creates a button if absent. | `string \| undefined`  | `undefined` |

## Events

| Event          | Description                                                                             | Type                           |
| -------------- | --------------------------------------------------------------------------------------- | ------------------------------ |
| `dsoTabSwitch` | Emitted when the user activates tab via click or arrow keys followed by space or enter. | `CustomEvent<TabsSwitchEvent>` |

## Slots

| Slot | Description            |
| ---- | ---------------------- |
|      | The label for this tab |

---

_Built with [StencilJS](https://stenciljs.com/)_
