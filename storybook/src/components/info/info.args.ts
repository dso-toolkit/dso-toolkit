import { ArgTypes } from "@storybook/web-components-vite";
import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";

import { argTypeAction } from "../../shared/arg-type-action.js";

import { Info } from "./info.models.js";

export interface InfoArgs {
  id: string;
  fixed: boolean;
  active: boolean;
  closeLabel: string;
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
  closeLabel: {
    control: {
      type: "text",
    },
  },
  dsoClose: argTypeAction(),
};

export function infoArgsMapper(a: InfoArgs, content: TemplateResult): Required<Info> {
  return {
    id: a.id,
    fixed: a.fixed,
    active: a.active,
    closeLabel: a.closeLabel,
    content,
    dsoClose: (e) => a.dsoClose(e.detail),
  };
}
