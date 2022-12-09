import { ArgTypes } from "../../storybook/index.js";

import { Definition, DefinitionList } from "./definition-list.models.js";

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
