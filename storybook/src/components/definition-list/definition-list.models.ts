import { TemplateResult } from "lit-html";

import { List } from "../list/list.models.js";

export interface DefinitionList {
  /**
   * `dso-columns` with `dso-column-*` specification.
   * `grouped` to group dt and dd elements.
   */
  modifier?: string;
  definitions: Definition[];
}

export interface Definition {
  term: TemplateResult | string;
  descriptions: (DefinitionDescriptionContent | DefinitionDescriptionItems)[];
}

export interface DefinitionDescriptionContent {
  content: TemplateResult | string;
}

export interface DefinitionDescriptionItems {
  list: List;
}
