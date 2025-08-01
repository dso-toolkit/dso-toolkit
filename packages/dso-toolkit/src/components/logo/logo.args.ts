import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";

import { noControl } from "../../storybook";

import { Logo } from "./logo.models.js";

export interface LogoArgs {
  name?: string;
  label?: string;
  labelUrl?: string;
  logoUrl?: string;
  ribbon?: string;
  dsoLabelClick?: HandlerFunction;
  dsoLogoClick?: HandlerFunction;
}

export const logoArgTypes: ArgTypes<LogoArgs> = {
  name: {
    control: {
      type: "text",
    },
  },
  label: {
    control: {
      type: "text",
    },
  },
  labelUrl: noControl,
  logoUrl: noControl,
  ribbon: {
    control: {
      type: "text",
    },
  },
  dsoLogoClick: {
    ...noControl,
  },
  dsoLabelClick: {
    ...noControl,
  },
};

export function logoArgsMapper(a: LogoArgs): Logo {
  return {
    name: a.name,
    label: a.label,
    labelUrl: a.labelUrl,
    logoUrl: a.logoUrl,
    ribbon: a.ribbon,
    dsoLogoClick: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoLogoClick?.(event);
    },
    dsoLabelClick: (event) => {
      event.detail.originalEvent.preventDefault();
      a.dsoLabelClick?.(event);
    },
  };
}
