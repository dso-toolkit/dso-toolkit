import { html } from "lit-html";

import { DefinitionList } from "../../../components/definition-list/definition-list.models.js";

export function definitionList(): DefinitionList {
  return {
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
}
