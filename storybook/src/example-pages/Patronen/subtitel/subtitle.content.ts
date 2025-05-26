import { DefinitionList } from "dso-toolkit";
import { TemplateResult, html } from "lit-html";

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
