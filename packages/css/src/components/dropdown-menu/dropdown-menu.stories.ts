import { storiesOfDropdownMenu } from '@dso-toolkit/sources';
import { storiesOf } from '@storybook/web-components';
import { html, nothing } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

import { dropdownMenuTemplate } from './dropdown-menu.template';
import readme from './readme.md';

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme
  },
  {
    dropdownMenuTemplate,
    children: content => html`${
      content.map(group => html`
        ${group.header
          ? html`
            <h2 class="dso-group-label">${group.header}</h2>
          `
          : nothing
        }
        <ul role="none">
          ${group.items.map(item => html`
            <li role="none" class=${ifDefined(item.checked ? 'dso-checked' : undefined)}>
              ${item.type === 'anchor'
                ? html`
                  <a role="menuitemradio" href=${item.url} aria-checked=${ifDefined(item.checked || undefined)}>${item.label}</a>
                `
                : html`
                  <button role="menuitem" type="button" aria-checked=${ifDefined(item.checked || undefined)}>${item.label}</button>
                `
              }
            </li>
          `)}
        </ul>
      `)
    }`
  }
);
