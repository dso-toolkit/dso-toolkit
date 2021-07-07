export interface DefinitionList {
  modifier?: string;
  definitions: Definition[];
  useSrOnlyColon: boolean;
}

export interface Definition {
  term: string;
  descriptions: string[];
}
