import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { Label } from "../label/label.models.js";
import { Renvooi } from "../renvooi/renvooi.models.js";
import { SlideToggle } from "../slide-toggle/slide-toggle.models.js";

import { PlekinfoCard, PlekinfoWijzigactie } from "./plekinfo-card.models.js";

export interface PlekinfoCardArgs {
  label: Renvooi | string;
  href: string;
  targetBlank: boolean;
  interaction?: SlideToggle;
  active: boolean;
  meta: Label;
  wijzigactie: PlekinfoWijzigactie;
  dsoPlekinfoCardClick: HandlerFunction;
}

export const plekinfoCardArgs: Omit<PlekinfoCardArgs, "meta" | "wijzigactie"> = {
  href: "#",
  targetBlank: false,
  interaction: undefined,
  label: "Radarverstorende bouwwerken",
  active: false,
  dsoPlekinfoCardClick: fn(),
};

export const plekinfoCardArgTypes: ArgTypes<Omit<PlekinfoCardArgs, "meta">> = {
  label: {
    control: {
      type: "object",
    },
  },
  href: {
    control: {
      type: "text",
    },
  },
  targetBlank: {
    control: {
      type: "boolean",
      default: false,
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  wijzigactie: {
    options: [undefined, "voegtoe", "verwijder"],
    control: {
      type: "select",
    },
  },
  interaction: argTypeAction(),
  dsoPlekinfoCardClick: argTypeAction(),
};

export function plekinfoCardArgsMapper<TemplateFnReturnType>(
  a: PlekinfoCardArgs,
  symbool?: TemplateFnReturnType,
  content?: TemplateFnReturnType,
): PlekinfoCard<TemplateFnReturnType> {
  return {
    label: a.label,
    href: a.href,
    targetBlank: a.targetBlank,
    active: a.active,
    wijzigactie: a.wijzigactie,
    interaction: a.interaction,
    meta: a.meta,
    content,
    symbool,
    dsoPlekinfoCardClick: (e) => a.dsoPlekinfoCardClick(e.detail),
  };
}
