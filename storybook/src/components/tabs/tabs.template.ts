import { DsoTabCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { Tabs, TabsItem, TabsSwitchEvent } from "./tabs.models.js";

export function tabsTemplate({ items, content }: Tabs<TemplateResult>) {
  return html`
    <dso-tabs>
      ${items.map(
        ({ label, href, modifier, dsoTabSwitch }: TabsItem) => html`
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
}
