import { ArgTypes } from "../../stories-helpers";

import { Toggletip } from "./toggletip.models";
import { tooltipPositions } from "../tooltip/tooltip.models";

export interface ToggletipArgs {
  children: string;
  position: typeof tooltipPositions;
  small?: boolean;
  label?: string;
}

export const toggletipArgTypes: ArgTypes<ToggletipArgs> = {
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
  small: {
    control: {
      type: 'boolean'
    }
  },
  label: {
    control: {
      type: "text",
    },
  },
};

export function toggletipArgsMapper(a: ToggletipArgs): Toggletip {
  return {
    children: a.children,
    position: a.position,
    small: a.small,
    label: a.label,
  };
}
