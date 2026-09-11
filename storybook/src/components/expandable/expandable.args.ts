import type { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";

import { noControl } from "../../shared/no-control.js";

import { Expandable } from "./expandable.models.js";

export interface ExpandableArgs {
  open: boolean;
  enableAnimation: boolean;
  minimumHeight: number;
}

export const expandableArgTypes: ArgTypes<ExpandableArgs> = {
  open: {
    type: "boolean",
  },
  enableAnimation: {
    type: "boolean",
  },
  minimumHeight: noControl(),
};

export function expandableArgsMapper(a: ExpandableArgs, content: TemplateResult | string): Expandable {
  return {
    ...a,
    content,
  };
}
