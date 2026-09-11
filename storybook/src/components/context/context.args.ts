import type { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";

import { Context } from "./context.models.js";

export interface ContextArgs {
  type: "legend" | "label";
  alignLeft: boolean;
}

export const contextArgTypes: ArgTypes<ContextArgs> = {
  type: {
    options: ["legend", "label"],
    control: {
      type: "select",
    },
  },
  alignLeft: {
    control: {
      type: "boolean",
    },
  },
};

export function contextArgsMapper(
  a: ContextArgs,
  content: TemplateResult | string,
  children: TemplateResult | string,
  label: TemplateResult | string,
): Context {
  return {
    content,
    children,
    label,
    type: a.type,
    alignLeft: a.alignLeft,
  };
}
