import { DefinitionList } from "@dso-toolkit/sources";
import { html, TemplateResult } from "lit-html";

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
