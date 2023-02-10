import { ArgTypes, noControl } from "../../storybook/index.js";

import { RichContent } from "./rich-content.models.js";

export interface RichContentArgs<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  slot: string;
}

export const richContentArgTypes: ArgTypes<RichContentArgs<unknown>> = {
  children: {
    ...noControl,
  },
  slot: {
    ...noControl,
  },
};

export function richContentArgsMapper<TemplateFnReturnType>(
  a: RichContentArgs<TemplateFnReturnType>,
  children: TemplateFnReturnType
): RichContent<TemplateFnReturnType> {
  return { ...a, children };
}
