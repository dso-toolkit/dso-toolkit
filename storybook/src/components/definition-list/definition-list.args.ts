import type { ArgTypes } from "@storybook/web-components-vite";

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

export function definitionListArgsMapper(a: DefinitionListArgs, definitions: Definition[]): DefinitionList {
  return {
    definitions,
    modifier: a.modifier,
  };
}
