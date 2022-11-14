import { Tabs } from "@dso-toolkit/sources";

import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { ComponentImplementation } from "../../templates";

export const cssTabs: ComponentImplementation<Tabs> = {
  component: "tabs",
  implementation: "css",
  template: () =>
    function tabsTemplate({ items }) {
      return html`
        <ul class="nav nav-tabs" role="tablist">
          ${items.map(
            (item) => html`
              <li
                role="presentation"
                class=${ifDefined(item.modifiers)}
                aria-selected=${item.modifiers === "active"}
                id=${item.id}
                aria-controls="${item.id}-tab"
              >
                <a href="#" role="tab">${item.label}</a>
              </li>
            `
          )}
        </ul>
        ${items.map(
          (item) => html`
            <div
              tabindex=${item.modifiers === "active" ? 1 : 0}
              role="tabpanel"
              id="${item.id}-tab"
              aria-labelledby=${item.id}
              ?hidden=${item.modifiers !== "active"}
            >
              Inhoud ${item.label}
            </div>
          `
        )}
      `;
    },
};
