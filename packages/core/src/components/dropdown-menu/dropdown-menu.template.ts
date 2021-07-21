import { DropdownMenu } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

export function dropdownMenuTemplate({
  dropdownAlign,
  children,
}: DropdownMenu) {
  return html`
    <dso-dropdown-menu dropdown-align=${dropdownAlign}>
      ${unsafeHTML(children)}
    </dso-dropdown-menu>
  `;
}
