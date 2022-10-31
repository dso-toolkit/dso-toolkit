import { DropdownMenu } from "@dso-toolkit/sources";

import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "css",
  template: ({ buttonTemplate }) =>
    function dropdownMenuTemplate({ id, button, dropdownAlign, groups, isCheckable }) {
      return html`
        <div
          class="dso-dropdown-menu dso-open ${classMap({
            [`dso-dropdown-align-${dropdownAlign}`]: dropdownAlign === "right",
            "dso-checkable": !!isCheckable,
          })}"
        >
          ${buttonTemplate({ ...button, id })}
          <div class="dso-dropdown-options" role="menu" aria-labelledby="${id}">
            ${groups.map(
              (group) => html`
                ${group.header ? html` <h2 class="dso-group-label">${group.header}</h2> ` : nothing}
                <ul role="none">
                  ${group.items.map(
                    (item) => html`
                      <li role="none" class=${ifDefined(item.checked ? "dso-checked" : undefined)}>
                        ${item.type === "anchor"
                          ? html`
                              <a
                                role="menuitemradio"
                                href=${item.url}
                                aria-checked=${ifDefined(item.checked || undefined)}
                                >${item.label}</a
                              >
                            `
                          : html`
                              <button
                                role="menuitem"
                                type="button"
                                aria-checked=${ifDefined(item.checked || undefined)}
                              >
                                ${item.label}
                              </button>
                            `}
                      </li>
                    `
                  )}
                </ul>
              `
            )}
          </div>
        </div>
      `;
    },
};
