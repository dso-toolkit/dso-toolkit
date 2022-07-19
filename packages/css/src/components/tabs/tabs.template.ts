import { Tabs } from '@dso-toolkit/sources';

import { html } from 'lit-html';
import { ifDefined } from 'lit-html/directives/if-defined.js';

export function tabsTemplate({ tabs }: Tabs) {
  return html`
    <ul class="nav nav-tabs" role="tablist">
      ${tabs.map((tabitem) => {
        return html`
          <li
            role=presentation
            class=${ifDefined(tabitem.modifiers ? tabitem.modifiers : undefined)}
            aria-selected=${ifDefined(tabitem.modifiers==='active' ? true : false)}
            id=${tabitem.id}
            aria-controls=${tabitem.id}-tab
            >
            <a href="#" role="tab">
              ${tabitem.label}
            </a>
          </li>
        `;
      })}
    </ul>
    ${tabs.map((tabitem) => {
      return html`
        <div
          tabindex=${ifDefined(tabitem.modifiers==='active' ? 1 : 0)}
          role=tabpanel
          id=${tabitem.id}-tab
          aria-labelledby=${tabitem.id}
          ?hidden=${ifDefined(tabitem.modifiers!='active')}
          >
          Inhoud ${tabitem.label}
        </div>
      `;
    })}
`;
}
