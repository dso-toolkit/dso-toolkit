import { ArgTypes } from "../../stories-helpers";

import { Toggletip } from "./toggletip.models";
import { tooltipPositions } from "../tooltip/tooltip.models";

export interface ToggletipArgs<TemplateFnReturnType> {
  children: TemplateFnReturnType;
  position: typeof tooltipPositions;
  label?: string;
}

export const toggletipArgTypes: ArgTypes<ToggletipArgs<unknown>> = {
  children: {
    table: {
      disable: true,
    },
  },
  position: {
    options: tooltipPositions,
    control: {
      type: "select",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
};

export function toggletipArgsMapper(a: ToggletipArgs<any>): Toggletip<any> {
  return {
    children: a.children,
    position: a.position,
    label: a.label,
  };
}
