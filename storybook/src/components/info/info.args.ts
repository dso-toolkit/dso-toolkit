import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Info } from "./info.models.js";

export interface InfoArgs {
  id: string;
  fixed: boolean;
  active: boolean;
  dsoClose: HandlerFunction;
}

export const infoArgTypes: ArgTypes<InfoArgs> = {
  id: {
    control: {
      type: "text",
    },
  },
  fixed: {
    control: {
      type: "boolean",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  dsoClose: argTypeAction(),
};

export function infoArgsMapper(a: InfoArgs, content: TemplateResult): Required<Info<TemplateResult>> {
  return {
    id: a.id,
    fixed: a.fixed,
    active: a.active,
    content,
    dsoClose: () => a.dsoClose(),
  };
}
