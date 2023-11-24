import { DropdownMenu } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function dropdownMenuTemplate({ id, button, dropdownAlign, isCheckable, groups, boundary }) {
      return html`
        <dso-dropdown-menu
          dropdown-align=${ifDefined(dropdownAlign)}
          boundary=${ifDefined(boundary)}
          ?checkable=${isCheckable}
        >
          ${buttonTemplate({ label: button.label, type: "button", variant: button.variant, id, slot: "toggle" })}
          <div class="dso-dropdown-options">
            ${groups.map(
              (group) => html`
                <ul aria-labelledby=${group.id}>
                  ${group.header ? html`<li id=${group.id} class="dso-group-label">${group.header}</li>` : nothing}
                  ${group.items.map(
                    (item) => html`
                      <li class=${ifDefined(item.checked ? "dso-checked" : undefined)}>
                        ${item.type === "anchor"
                          ? html`<a href=${item.url}>${item.label}</a>`
                          : html`<button type="button">${item.label}</button>`}
                      </li>
                    `,
                  )}
                </ul>
              `,
            )}
          </div>
        </dso-dropdown-menu>
      `;
    },
};
