import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";

import { Skiplink } from "./skiplink.models.js";

export interface SkiplinkArgs {
  to: string;
  label: string;
  dsoSkiplinkClick: HandlerFunction;
}

export const skiplinkArgs: SkiplinkArgs = {
  to: "123-456-abc-def",
  label: "Ga naar inhoud",
  dsoSkiplinkClick: fn(),
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
  dsoSkiplinkClick: argTypeAction(),
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
