import { ArgTypes } from "../../storybook";

import { Definition, DefinitionList } from "./definition-list.models";

export interface DefinitionListArgs {
  modifier?: string;
  definitions: Definition[];
  useSrOnlyColon: boolean;
}

export const definitionListArgTypes: ArgTypes<DefinitionListArgs> = {
  definitions: {
    control: {
      disable: true,
    },
  },
  modifier: {
    control: {
      type: "text",
    },
  },
  useSrOnlyColon: {
    control: {
      type: "boolean",
    },
  },
};

export function definitionListArgsMapper(a: DefinitionListArgs): DefinitionList {
  return {
    definitions: a.definitions,
    modifier: a.modifier,
    useSrOnlyColon: a.useSrOnlyColon,
  };
}
