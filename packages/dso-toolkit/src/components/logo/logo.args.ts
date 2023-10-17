import { Logo } from "./logo.models.js";

import { ArgTypes } from "@storybook/types";

export interface LogoArgs {
  label?: string;
  ribbon?: string;
}

export const logoArgTypes: ArgTypes<LogoArgs> = {
  label: {
    control: {
      type: "text",
    },
  },
  ribbon: {
    control: {
      type: "text",
    },
  },
};

export function logoArgsMapper(a: LogoArgs): Logo {
  return {
    label: a.label,
    ribbon: a.ribbon,
  };
}
