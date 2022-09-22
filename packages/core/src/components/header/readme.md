# dso-header

## Models

```typescript
interface HeaderMenuItem {
  label: string;
  url: string;
  active?: boolean;
}

interface HeaderMenuItemClickEvent {
  originalEvent: MouseEvent;
  menuItem: HeaderMenuItem;
}

interface HeaderMenuLogoutClick {
  originalEvent: MouseEvent;
}
```

<!-- Auto Generated Below -->


## Properties

| Property          | Attribute            | Description                                                                                                 | Type                                  | Default     |
| ----------------- | -------------------- | ----------------------------------------------------------------------------------------------------------- | ------------------------------------- | ----------- |
| `authStatus`      | `auth-status`        | Used to show the login/logout option. 'none' renders nothing.                                               | `"loggedIn" \| "loggedOut" \| "none"` | `'none'`    |
| `loginUrl`        | `login-url`          | When the `authStatus` is `loggedOut` a loginUrl can be provided, the login button will render as an anchor. | `string \| undefined`                 | `undefined` |
| `logoutUrl`       | `logout-url`         |                                                                                                             | `string \| undefined`                 | `undefined` |
| `mainMenu`        | --                   |                                                                                                             | `HeaderMenuItem[] \| undefined`       | `[]`        |
| `useDropDownMenu` | `use-drop-down-menu` |                                                                                                             | `"always" \| "auto" \| "never"`       | `"auto"`    |
| `userHomeUrl`     | `user-home-url`      |                                                                                                             | `string \| undefined`                 | `undefined` |
| `userProfileName` | `user-profile-name`  |                                                                                                             | `string \| undefined`                 | `undefined` |
| `userProfileUrl`  | `user-profile-url`   |                                                                                                             | `string \| undefined`                 | `undefined` |


## Events

| Event            | Description                                                                                                                                        | Type                                                        |
| ---------------- | -------------------------------------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------- |
| `dsoHeaderClick` | Emitted when something in the header is selected.  `event.detail.type` indicates the functionality the user pressed. eg. `'login'` or `'menuItem'` | `CustomEvent<HeaderClickEvent \| HeaderClickMenuItemEvent>` |


## Dependencies

### Depends on

- [dso-dropdown-menu](../dropdown-menu)
- [dso-icon](../icon)

### Graph
```mermaid
graph TD;
  dso-header --> dso-dropdown-menu
  dso-header --> dso-icon
  style dso-header fill:#f9f,stroke:#333,stroke-width:4px
```

----------------------------------------------

*Built with [StencilJS](https://stenciljs.com/)*
