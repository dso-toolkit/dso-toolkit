import { Lists } from "../lists/lists.models";

export interface DefinitionList<TemplateFnReturnType = never> {
  modifier?: string;
  definitions: Definition<TemplateFnReturnType>[];
  useSrOnlyColon: boolean;
}

export interface Definition<TemplateFnReturnType = never> {
  term: string;
  descriptions: (DefinitionDescriptionContent<TemplateFnReturnType> | DefinitionDescriptionItems)[];
}

export interface DefinitionDescriptionContent<TemplateFnReturnType> {
  content: string | TemplateFnReturnType;
}

export interface DefinitionDescriptionItems {
  columnsList: Lists;
}
