import { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";

import { noControl } from "../../shared/no-control.js";

import { RichContent } from "./rich-content.models.js";

export interface RichContentArgs {
  children: TemplateResult | string;
  slot: string;
}

export const richContentArgTypes: ArgTypes<RichContentArgs> = {
  children: noControl(),
  slot: noControl(),
};

export function richContentArgsMapper(a: RichContentArgs, children: TemplateResult | string): RichContent {
  return { ...a, children };
}
