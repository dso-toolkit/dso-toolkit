import { DropdownMenu } from '@dso-toolkit/sources';

import { html, TemplateResult } from 'lit-html';
import { classMap } from 'lit-html/directives/class-map';

import { buttonTemplate } from '../button/button.template';

export function dropdownMenuTemplate({ button, dropdownAlign, children, isCheckable }: DropdownMenu<TemplateResult>) {
  return html`
    <div class="dso-dropdown dso-open ${classMap({ [`dso-dropdown-${dropdownAlign}`]: !!dropdownAlign, 'dso-checkable': !!isCheckable })}">
      ${buttonTemplate(button)}
      <div class="dso-dropdown-menu">
        ${children}
      </div>
    </div>
  `;
}
