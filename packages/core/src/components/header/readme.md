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

| Property          | Attribute            | Description | Type                            | Default     |
| ----------------- | -------------------- | ----------- | ------------------------------- | ----------- |
| `isLoggedIn`      | `is-logged-in`       |             | `boolean`                       | `false`     |
| `loginUrl`        | `login-url`          |             | `string \| undefined`           | `undefined` |
| `logoutUrl`       | `logout-url`         |             | `string \| undefined`           | `undefined` |
| `mainMenu`        | --                   |             | `HeaderMenuItem[]`              | `[]`        |
| `useDropDownMenu` | `use-drop-down-menu` |             | `"always" \| "auto" \| "never"` | `"auto"`    |
| `userHomeUrl`     | `user-home-url`      |             | `string \| undefined`           | `undefined` |
| `userProfileName` | `user-profile-name`  |             | `string \| undefined`           | `undefined` |
| `userProfileUrl`  | `user-profile-url`   |             | `string \| undefined`           | `undefined` |


## Events

| Event           | Description                             | Type                                    |
| --------------- | --------------------------------------- | --------------------------------------- |
| `logoutClick`   | Only available when `logout-url` is set | `CustomEvent<HeaderMenuLogoutClick>`    |
| `menuItemClick` |                                         | `CustomEvent<HeaderMenuItemClickEvent>` |


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
