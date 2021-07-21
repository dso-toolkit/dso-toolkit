import { DropdownMenu } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { buttonTemplate } from '../button/button.template';

export function dropdownMenuTemplate({ button, dropdownAlign, children, isCheckable }: DropdownMenu) {
  return html`
    <div class="dropdown open ${classMap({[`dso-dropdown-${dropdownAlign}`]: dropdownAlign})}">
      ${buttonTemplate({ ...button })}
      ${open && html`
        <div class="dropdown-menu ${classMap({ 'dso-checkable': isCheckable })}">
          ${children}
        </div>
      `}
    </div>
  `;
}
