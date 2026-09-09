import { TemplateResult } from "lit-html";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { RichContent } from "./rich-content.models.js";

export interface RichContentArgs {
  children: TemplateResult | string;
  slot: string;
}

export const richContentArgTypes: ArgTypes<RichContentArgs> = {
  children: argTypeAction(),
  slot: argTypeAction(),
};

export function richContentArgsMapper(a: RichContentArgs, children: TemplateResult | string): RichContent {
  return { ...a, children };
}
