import { Tabs } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function tabsTemplate({ tabs }: Tabs) {
  return html`
    <ul class="nav nav-tabs" role="tablist">
      ${tabs.map((tabitem) => {
        return html`
          <li
            role="presentation"
            class=${ifDefined(tabitem.modifiers ? tabitem.modifiers : undefined)}
            >
            <a href="#" role="tab">
              ${tabitem.label}
            </a>
          </li>
        `;
      })}
    </ul>
  `;
}
