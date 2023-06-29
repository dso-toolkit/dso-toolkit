import { ActionList } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation, Templates } from "../../templates";

export const coreActionList: ComponentImplementation<ActionList<TemplateResult>> = {
  component: "actionList",
  implementation: "core",
  template: ({ accordionTemplate, richContentTemplate }: Templates) =>
    function actionListTemplate({ title, actionListItems }) {
      return html`
        <dso-action-list list-title=${title}>
          ${actionListItems.map(
            (item, index) =>
              html`<dso-action-list-item
                step=${index + 1}
                item-title=${ifDefined(item.title)}
                flow-line=${ifDefined(item.flowLine)}
                warning=${ifDefined(item.warning)}
                divider=${ifDefined(item.divider)}
                >${item.content}</dso-action-list-item
              >`
          )}
          ${richContentTemplate({
            children: html`
              <h2>Heeft u vragen?</h2>
              ${accordionTemplate({
                variant: "neutral",
                sections: [
                  {
                    handleTitle: "Contactinformatie gemeente Utrecht",
                    heading: "h3",
                  },
                  {
                    handleTitle: "Contactinformatie waterschap Amstel, Gooi en Vecht",
                    heading: "h3",
                  },
                ],
              })}
            `,
          })}
        </dso-action-list>
      `;
    },
};
