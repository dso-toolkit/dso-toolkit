import { Tabs } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function tabsTemplate({ tabs }: Tabs) {
  return html`
    <ul class="nav nav-tabs" role="tablist">
      ${tabs.map((tabsitem) => {
        return html`
          <li
            role="presentation"
            class="${ifDefined(tabsitem.modifiers ? tabsitem.modifiers : undefined)}"
            aria-selected="${ifDefined(tabsitem.modifiers==='active' ? true : false)}"
            id="${tabsitem.id}"
            aria-controls="${tabsitem.id}-tab"
            >
            <a href="#" role="tab">
              ${tabsitem.label}
            </a>
          </li>
        `;
      })}
    </ul>
    ${tabs.map((tabsitem) => {
      return html`
        <div
          tabindex="${ifDefined(tabsitem.modifiers==='active' ? 1 : 0)}"
          role="tabpanel"
          id="${tabsitem.id}-tab"
          aria-labelledby="${tabsitem.id}"
          ?hidden="${tabsitem.modifiers!='active'}"
          >
          Inhoud ${tabsitem.label}
        </div>
      `;
    })}
`;
}
