import { DropdownMenu } from "dso-toolkit";

import { ComponentImplementation } from "../../templates";

export const angularDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "angular",
  template: () =>
    function dropdownMenuTemplate(props) {
      return {
        props,
        template: `
          <dso-dropdown-menu
            [label]="label"
            [variant]="variant"
            [dropdownAlign]="dropdownAlign === 'right' ? 'right' : undefined"
            [checkable]="checkable || undefined"
          >
            @for (group of groups; track group) {
              <dso-dropdown-menu-group [label]="group.label">
                @for (item of group.items; track item) {
                  <dso-dropdown-menu-item
                    [type]="item.type"
                    [href]="'href' in item ? item.href : undefined"
                    [checked]="item.checked"
                    (dsoClick)="item.dsoClick?.($event)">{{ item.label }}</dso-dropdown-menu-item>
                }
              </dso-dropdown-menu-group>
            }
          </dso-dropdown-menu>
        `,
      };
    },
};
