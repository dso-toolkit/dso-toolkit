import { DropdownMenu } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function dropdownMenuTemplate({
  id,
  button,
  dropdownAlign,
  isCheckable,
  children
}: DropdownMenu<TemplateResult>) {
  return html`
    <dso-dropdown-menu
      dropdown-align=${ifDefined(dropdownAlign)}
      ?checkable=${isCheckable}
    >
      <button type="button" class=${`dso-${button.variant}`} slot="toggle" id=${ifDefined(id || undefined)}>
        <span>${button.label}</span>
      </button>
      <div class="dso-dropdown-options">
        ${children}
      </div>
    </dso-dropdown-menu>
  `;
}
