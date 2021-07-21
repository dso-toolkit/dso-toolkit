import { storiesOfDropdownMenu } from "@dso-toolkit/sources";
import { storiesOf } from "@storybook/web-components";
import { html, nothing } from 'lit-html';

import { dropdownMenuTemplate } from "./dropdown-menu.template";
import readme from "./readme.md";

storiesOfDropdownMenu(
  {
    module,
    storiesOf,
    readme,
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
        <ul>
          ${group.items.map(item => html`
            <li>
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
      `)
    }`
  }
);
