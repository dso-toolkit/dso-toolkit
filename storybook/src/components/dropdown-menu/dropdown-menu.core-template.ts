import { DropdownMenu } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const coreDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: "dropdownMenu",
  implementation: "core",
  template: ({ buttonTemplate }) =>
    function dropdownMenuTemplate({ id, button, dropdownAlign, isCheckable, groups }) {
      return html`
        <dso-dropdown-menu dropdown-align=${ifDefined(dropdownAlign)} ?checkable=${isCheckable}>
          ${buttonTemplate({ label: button.label, type: "button", variant: button.variant, id, slot: "toggle" })}
          <div class="dso-dropdown-options">
            ${groups.map(
              (group) => html`
                ${group.header ? html`<h2 class="dso-group-label">${group.header}</h2>` : nothing}
                <ul>
                  ${group.items.map(
                    (item) => html`
                      <li class=${ifDefined(item.checked ? "dso-checked" : undefined)}>
                        ${item.type === "anchor"
                          ? html`<a href=${item.url}>${item.label}</a>`
                          : html`<button type="button">${item.label}</button>`}
                      </li>
                    `
                  )}
                </ul>
              `
            )}
          </div>
        </dso-dropdown-menu>
      `;
    },
};
