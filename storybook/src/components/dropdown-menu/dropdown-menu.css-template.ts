import { DropdownMenu } from "dso-toolkit";

import { html, nothing } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "html-css",
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
          <div class="dso-dropdown-options" role="menu" aria-labelledby=${id}>
            ${groups.map(
              (group) => html`
                <ul role="group" aria-labelledby=${group.id}>
                  ${group.header
                    ? html`<li id=${group.id} class="dso-group-label" role="none">${group.header}</li>`
                    : nothing}
                  ${group.items.map(
                    (item) => html`
                      <li role="none" class=${ifDefined(item.checked ? "dso-checked" : undefined)}>
                        ${item.type === "anchor"
                          ? html`
                              <a
                                role=${isCheckable ? "menuitemradio" : "menuitem"}
                                href=${item.url}
                                aria-checked=${ifDefined(isCheckable ? item.checked || false : undefined)}
                                >${item.label}</a
                              >
                            `
                          : html`
                              <button
                                role=${isCheckable ? "menuitemradio" : "menuitem"}
                                type="button"
                                aria-checked=${ifDefined(isCheckable ? item.checked || false : undefined)}
                              >
                                ${item.label}
                              </button>
                            `}
                      </li>
                    `,
                  )}
                </ul>
              `,
            )}
          </div>
        </div>
      `;
    },
};
