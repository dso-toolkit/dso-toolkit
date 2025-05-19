import { DsoTabCustomEvent } from "@dso-toolkit/core";
import { TabsSwitchEvent } from "@dso-toolkit/core/src";
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
            ({ label, href, modifier, dsoTabSwitch }) => html`
              <dso-tab
                href=${ifDefined(href)}
                ?active=${modifier === "active"}
                ?disabled=${modifier === "disabled"}
                @dsoTabSwitch=${(e: DsoTabCustomEvent<TabsSwitchEvent>) => {
                  if (href && !e.detail.isModifiedEvent) {
                    e.detail.originalEvent.preventDefault();
                  }

                  dsoTabSwitch?.(e);
                }}
                >${label}</dso-tab
              >
            `,
          )}
          <div slot="panel">${content}</div>
        </dso-tabs>
      `;
    },
};
