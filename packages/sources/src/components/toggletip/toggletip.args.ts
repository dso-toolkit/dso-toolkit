import { ArgTypes } from "../../stories-helpers";

import { Toggletip } from "./toggletip.models";

export interface ToggletipArgs<TemplateFnReturnType> {
  children: TemplateFnReturnType;
}

export const toggletipArgTypes: ArgTypes<ToggletipArgs<unknown>> = {
  children: {
    table: {
      disable: true,
    },
  },
};

export function toggletipArgsMapper(a: ToggletipArgs<any>): Toggletip<any> {
  return {
    children: a.children,
  };
}
