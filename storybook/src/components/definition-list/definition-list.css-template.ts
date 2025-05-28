import { Definition, DefinitionDescriptionContent, DefinitionDescriptionItems, DefinitionList } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { ComponentImplementation } from "../../templates";

export const cssDefinitionList: ComponentImplementation<DefinitionList<TemplateResult>> = {
  component: "definitionList",
  implementation: "html-css",
  template: ({ listTemplate }) =>
    function definitionListTemplate({ modifier, definitions, slotName }) {
      function definitionTemplate({ term, descriptions }: Definition<TemplateResult>) {
        return html`
          <dt>${term}</dt>
          ${descriptions.map((description) => html`<dd>${definitionContentTemplate(description)}</dd>`)}
        `;
      }

      function definitionContentTemplate(
        description: DefinitionDescriptionContent<TemplateResult> | DefinitionDescriptionItems,
      ) {
        if ("content" in description) {
          if (typeof description.content === "string") {
            return unsafeHTML(description.content);
          }

          return description.content;
        }

        return listTemplate(description.list);
      }

      return html`
        <dl class=${ifDefined(modifier)} slot=${ifDefined(slotName)}>
          ${definitions.map((definition) => {
            const m = modifier?.split(" ");

            if (m?.includes("dso-columns")) {
              return html`<div>${definitionTemplate(definition)}</div>`;
            }

            if (m?.includes("dso-grouped")) {
              return html`<div class="dso-group">${definitionTemplate(definition)}</div>`;
            }

            return definitionTemplate(definition);
          })}
        </dl>
      `;
    },
};
