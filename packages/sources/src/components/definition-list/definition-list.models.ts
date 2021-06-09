export interface DefinitionList {
  modifier?: string;
  definitions: Definition[];
}

export interface Definition {
  term: string;
  descriptions: string[];
}
