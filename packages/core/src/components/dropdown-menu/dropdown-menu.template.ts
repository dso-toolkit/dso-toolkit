import { DropdownMenu } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

export function dropdownMenuTemplate({
  button,
  dropdownAlign,
  children
}: DropdownMenu<TemplateResult>) {
  return html`
    <dso-dropdown-menu dropdown-align=${dropdownAlign}>
      <button type="button" class=${`dso-${button.variant}`} slot="button">
        <span>${button.label}</span>
      </button>
      ${children}
    </dso-dropdown-menu>
  `;
}
