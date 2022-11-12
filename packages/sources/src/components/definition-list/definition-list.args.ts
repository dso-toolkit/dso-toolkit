import { ArgTypes } from "../../storybook";

import { Definition, DefinitionList } from "./definition-list.models";

export interface DefinitionListArgs {
  modifier?: string;
}

export const definitionListArgTypes: ArgTypes<DefinitionListArgs> = {
  modifier: {
    control: {
      type: "text",
    },
  },
};

export function definitionListArgsMapper<TemplateFnReturnType>(
  a: DefinitionListArgs,
  definitions: Definition<TemplateFnReturnType>[]
): DefinitionList<TemplateFnReturnType> {
  return {
    definitions,
    modifier: a.modifier,
  };
}
