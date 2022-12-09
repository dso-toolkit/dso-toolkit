import { List } from "../list/list.models.js";

export interface DefinitionList<TemplateFnReturnType> {
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
