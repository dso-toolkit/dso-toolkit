import { TemplateResult, html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";
import { unsafeHTML } from "lit-html/directives/unsafe-html.js";

import { SlottableTemplate } from "../../shared/slottable-template";
import { listTemplate } from "../list/list.template.js";

import {
  Definition,
  DefinitionDescriptionContent,
  DefinitionDescriptionItems,
  DefinitionList,
} from "./definition-list.models.js";

export function definitionListTemplate({
  modifier,
  definitions,
  slotName,
}: DefinitionList<TemplateResult> & SlottableTemplate) {
  const modifierClasses = modifier?.split(" ") ?? [];

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
        if (modifierClasses.includes("dso-columns")) {
          return html`<div>${definitionTemplate(definition)}</div>`;
        }

        if (modifierClasses.includes("dso-grouped")) {
          return html`<div class="dso-group">${definitionTemplate(definition)}</div>`;
        }

        if (modifierClasses.includes("dso-inline") || modifierClasses.includes("dso-inline-end")) {
          return html`<div class="dso-inline-group">${definitionTemplate(definition)}</div>`;
        }

        return definitionTemplate(definition);
      })}
    </dl>
  `;
}
