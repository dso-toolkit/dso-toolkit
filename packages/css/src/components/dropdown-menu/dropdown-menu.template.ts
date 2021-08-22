import { DropdownMenu } from '@dso-toolkit/sources';

import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { buttonTemplate } from '../button/button.template';

export function dropdownMenuTemplate({ id, button, dropdownAlign, children, isCheckable }: DropdownMenu<TemplateResult>) {
  return html`
    <div class="dso-dropdown-menu dso-open ${classMap({ [`dso-dropdown-align-${dropdownAlign}`]: dropdownAlign === 'right', 'dso-checkable': !!isCheckable })}">
      ${buttonTemplate({ ...button, id })}
      <div class="dso-dropdown-options" role="menu" aria-labelledby="${id}">
        ${children}
      </div>
    </div>
  `;
}
