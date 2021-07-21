import { DropdownMenu } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { buttonTemplate } from '../button/button.template';

export function dropdownMenuTemplate({ button, dropdownAlign, children, open, dropdownMenuModifiers }: DropdownMenu) {
  return html`
    <div class="dropdown ${classMap({ 'open': open, [`dso-dropdown-${dropdownAlign}`]: dropdownAlign})}">
      ${buttonTemplate({ ...button })}
      ${open && html`
        <div class="dropdown-menu ${dropdownMenuModifiers}">
          ${children}
        </div>
      `}
    </div>
  `;
}
