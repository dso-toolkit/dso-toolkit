import { TemplateResult, html } from "lit-html";

import type { DefinitionList } from "../../../components/definition-list/definition-list.models.js";

export const definitionList: DefinitionList<TemplateResult> = {
  modifier: "dso-bordered",
  definitions: [
    {
      term: html`Thema`,
      descriptions: [
        {
          content: "Wonen",
        },
        {
          content: "Werken",
        },
      ],
    },
    {
      term: html`Regelkwalificatie`,
      descriptions: [
        {
          content: "Instructieregels",
        },
      ],
    },
  ],
};
