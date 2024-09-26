import { Definition, DefinitionList, DefinitionDescriptionContent, DefinitionDescriptionItems } from "dso-toolkit";

import { html, TemplateResult } from "lit-html";
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
          <div>
            <dt>${term}</dt>
            ${descriptions.map((description) => html`<dd>${definitionContentTemplate(description)}</dd>`)}
          </div>
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
          ${definitions.map((definition) =>
            modifier?.split(" ").includes("dso-columns")
              ? html`<div>${definitionTemplate(definition)}</div>`
              : definitionTemplate(definition),
          )}
        </dl>
      `;
    },
};
