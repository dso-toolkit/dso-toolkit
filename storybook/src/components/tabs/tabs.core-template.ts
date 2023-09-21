import { Tabs } from "dso-toolkit";

import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreTabs: ComponentImplementation<Tabs<TemplateResult>> = {
  component: "tabs",
  implementation: "core",
  template: () =>
    function tabsTemplate({ items, dsoTabSwitch }) {
      return html`
        <dso-tabs @dsoTabSwitch=${dsoTabSwitch}>
          ${items.map(
            ({ label, id, modifiers, content }) => html`
              <dso-tab
                label=${label}
                identifier=${ifDefined(id)}
                ?active=${modifiers === "active"}
                ?disabled=${modifiers === "disabled"}
                >${content}</dso-tab
              >
            `
          )}
        </dso-tabs>
      `;
    },
};
