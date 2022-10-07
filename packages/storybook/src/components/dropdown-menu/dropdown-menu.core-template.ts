import { DropdownMenu } from "@dso-toolkit/sources";
import { html, nothing } from "lit-html";
import { ifDefined } from 'lit-html/directives/if-defined.js';
import { ComponentImplementation } from "../../templates";

export const coreDropdownMenu: ComponentImplementation<DropdownMenu> = {
  component: 'dropdownMenu',
  implementation: 'core',
  template: () => function dropdownMenuTemplate({
    id,
    button,
    dropdownAlign,
    isCheckable,
    groups
  }: DropdownMenu) {
    return html`
      <dso-dropdown-menu
        dropdown-align=${ifDefined(dropdownAlign)}
        ?checkable=${isCheckable}
      >
        <button type="button" class=${`dso-${button.variant}`} slot="toggle" id=${ifDefined(id || undefined)}>
          <span>${button.label}</span>
        </button>
        <div class="dso-dropdown-options">
          ${groups.map(group => html`
            ${group.header
              ? html`
                <h2 class="dso-group-label">${group.header}</h2>
              `
              : nothing
            }
            <ul>
              ${group.items.map(item => html`
                <li class=${ifDefined(item.checked ? 'dso-checked': undefined)}>
                  ${item.type === 'anchor'
                    ? html`
                      <a href=${item.url}>${item.label}</a>
                    `
                    : html`
                      <button type="button">${item.label}</button>
                    `
                  }
                </li>
              `)}
            </ul>
          `)}
        </div>
      </dso-dropdown-menu>
    `;
  }
}
