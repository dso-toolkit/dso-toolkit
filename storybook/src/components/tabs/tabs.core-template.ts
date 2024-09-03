import { Tabs } from "dso-toolkit";

import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreTabs: ComponentImplementation<Tabs<TemplateResult>> = {
  component: "tabs",
  implementation: "core",
  template: () =>
    function tabsTemplate({ items, content }) {
      return html`
        <dso-tabs>
          ${items.map(
            ({ label, identifier, href, modifiers, dsoTabSwitch }) => html`
              <dso-tab
                href=${ifDefined(href)}
                label=${ifDefined(label)}
                identifier=${ifDefined(identifier)}
                ?active=${modifiers === "active"}
                ?disabled=${modifiers === "disabled"}
                @dsoTabSwitch=${dsoTabSwitch}
                >${label}</dso-tab
              >
            `,
          )}
          <div slot="panel">${content}</div>
        </dso-tabs>
      `;
    },
};
