import { DropdownMenu } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "core",
  template: () =>
    function dropdownMenuTemplate({ label, variant, checkable, groups, dropdownAlign }) {
      return html`
        <dso-dropdown-menu
          .label=${label}
          .variant=${variant}
          ?checkable=${checkable}
          .dropdownAlign=${ifDefined(dropdownAlign)}
        >
          ${groups.map(
            (group) => html`
              <dso-dropdown-menu-group label=${ifDefined(group.label)}>
                  ${group.items.map(
                    (item) => html`
                      <dso-dropdown-menu-item
                        type=${item.type}
                        href=${ifDefined("href" in item ? item.href : undefined)}
                        checked=${ifDefined(item.checked)}
                        @dsoClick=${ifDefined(item.dsoClick)}
                        >${item.label}</dso-dropdown-menu-item
                      >
                    `,
                  )}
                </ul>
              </dso-dropdown-menu-group>
            `,
          )}
        </dso-dropdown-menu>
      `;
    },
};
