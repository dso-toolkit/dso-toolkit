import { List } from "../list/list.models.js";

export interface DefinitionList<TemplateFnReturnType> {
  /**
   * `dso-columns` with `dso-column-*` specification.
   * `grouped` to group dt and dd elements.
   */
  modifier?: string;
  definitions: Definition<TemplateFnReturnType>[];
}

export interface Definition<TemplateFnReturnType> {
  term: TemplateFnReturnType;
  descriptions: (DefinitionDescriptionContent<TemplateFnReturnType> | DefinitionDescriptionItems)[];
}

export interface DefinitionDescriptionContent<TemplateFnReturnType> {
  content: string | TemplateFnReturnType;
}

export interface DefinitionDescriptionItems {
  list: List;
}
