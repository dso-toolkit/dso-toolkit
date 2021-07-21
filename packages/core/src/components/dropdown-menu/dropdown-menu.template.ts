import { DropdownMenu } from "@dso-toolkit/sources";
import { html } from "lit-html";
import { unsafeHTML } from "lit-html/directives/unsafe-html";

import { buttonTemplate } from '../../../../css/src/components/button/button.template';

export function dropdownMenuTemplate({
  button,
  dropdownAlign,
  children,
}: DropdownMenu) {
  return html`
    <dso-dropdown-menu dropdown-align=${dropdownAlign}>
      ${buttonTemplate({ ...button, slot: 'button' })}
      ${unsafeHTML(children)}
    </dso-dropdown-menu>
  `;
}
