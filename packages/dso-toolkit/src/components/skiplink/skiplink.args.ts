import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";

import { Skiplink } from "./skiplink.models.js";

export interface SkiplinkArgs {
  to: string;
  label: string;
  dsoSkiplinkClick: HandlerFunction;
}

export const skiplinkArgs: Omit<SkiplinkArgs, "dsoSkiplinkClick"> = {
  to: "123-456-abc-def",
  label: "Ga naar inhoud",
};

export const skiplinkArgTypes: ArgTypes<SkiplinkArgs> = {
  to: {
    control: {
      type: "text",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  dsoSkiplinkClick: {
    ...noControl,
    action: "dsoSkiplinkClick",
  },
};

export function skiplinkArgsMapper(a: SkiplinkArgs): Skiplink {
  return {
    ...a,
    dsoSkiplinkClick: (e) => {
      if (!e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
      }

      a.dsoSkiplinkClick(e.detail);
    },
  };
}
