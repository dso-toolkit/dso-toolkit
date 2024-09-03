import { Tabs } from "dso-toolkit";

import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssTabs: ComponentImplementation<Tabs<TemplateResult>> = {
  component: "tabs",
  implementation: "html-css",
  template: () =>
    function tabsTemplate({ items, content }) {
      return html`
        <ul class="nav nav-tabs" role="tablist">
          ${items.map(
            (item) => html`
              <li
                role="presentation"
                class=${ifDefined(item.modifiers)}
                aria-selected=${item.modifiers === "active"}
                id=${item.identifier}
                aria-controls="${item.identifier}-tab"
              >
                <a href="#" role="tab">${item.label}</a>
              </li>
            `,
          )}
        </ul>
        ${items.map(
          (item) => html`
            <div
              role="tabpanel"
              tabindex="-1"
              id="${item.identifier}-tab"
              aria-labelledby=${item.identifier}
              ?hidden=${item.modifiers !== "active"}
            >
              ${content}
            </div>
          `,
        )}
      `;
    },
};
