import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction, noControl } from "../../storybook";
import { Label } from "../label/label.models.js";
import { Renvooi } from "../renvooi/renvooi.models.js";
import { SlideToggle } from "../slide-toggle";

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
  interaction: {
    ...noControl,
  },
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
