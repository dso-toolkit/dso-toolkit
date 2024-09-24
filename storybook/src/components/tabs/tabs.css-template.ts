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
              <li role="presentation" class=${ifDefined(item.modifier)} aria-selected=${item.modifier === "active"}>
                <a href="#" role="tab">${item.label}</a>
              </li>
            `,
          )}
        </ul>
        ${items.map(
          (item) => html` <div role="tabpanel" tabindex="-1" ?hidden=${item.modifier !== "active"}>${content}</div> `,
        )}
      `;
    },
};
