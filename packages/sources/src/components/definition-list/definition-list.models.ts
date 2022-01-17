export interface DefinitionList<TemplateFnReturnType = never> {
  modifier?: string;
  definitions: Definition<TemplateFnReturnType>[];
  useSrOnlyColon: boolean;
}

export interface Definition<TemplateFnReturnType = never> {
  term: string;
  descriptions: (string | TemplateFnReturnType)[];
}
