import { TemplateResult } from "lit-html";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { RichContent } from "./rich-content.models.js";

export interface RichContentArgs<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  slot: string;
}

export const richContentArgTypes: ArgTypes<RichContentArgs<TemplateResult>> = {
  children: argTypeAction(),
  slot: argTypeAction(),
};

export function richContentArgsMapper<TemplateFnReturnType>(
  a: RichContentArgs<TemplateFnReturnType>,
  children: TemplateFnReturnType,
): RichContent<TemplateFnReturnType> {
  return { ...a, children };
}
