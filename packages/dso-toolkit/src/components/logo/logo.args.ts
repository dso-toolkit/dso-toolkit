import { Logo } from "./logo.models.js";

import { ArgTypes } from "@storybook/types";
import { noControl } from "../../storybook";
import { HandlerFunction } from "@storybook/addon-actions";

export interface LogoArgs {
  label?: string;
  labelUrl?: string;
  logoUrl?: string;
  ribbon?: string;
  dsoLabelClick?: HandlerFunction;
  dsoLogoClick?: HandlerFunction;
  lang: string | undefined;
}

export const logoArgTypes: ArgTypes<LogoArgs> = {
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
    action: "dsoLogoClick",
  },
  dsoLabelClick: {
    ...noControl,
    action: "dsoLogoLabelClick",
  },
  lang: {
    description:
      "Bepaalt de waarde van het `lang`-attribute tbv meertaligheid<br/>(Na wijzigen dient het component" +
      " ge`Remount` te worden)",
    options: ["nl", "en", undefined],
    control: {
      type: "radio",
    },
  },
};

export function logoArgsMapper(a: LogoArgs): Logo {
  return {
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
    lang: a.lang,
  };
}
