import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook";
import { PlekinfoCard, PlekinfoWijzigactie } from "./plekinfo-card.models.js";
import { Renvooi } from "../renvooi/renvooi.models.js";
import { Label } from "../label/label.models.js";
import { Button } from "../button";
import { Toggletip } from "../toggletip/toggletip.models";
import { SlideToggle } from "../slide-toggle";

export interface PlekinfoCardArgs {
  label: Renvooi | string;
  href: string;
  targetBlank: boolean;
  interactions: Array<Button | Label | Toggletip<never> | SlideToggle>;
  active: boolean;
  meta: Label;
  wijzigactie: PlekinfoWijzigactie;
  dsoPlekinfoCardClick: HandlerFunction;
}

export const plekinfoCardArgs: Pick<PlekinfoCardArgs, "href" | "targetBlank" | "label" | "active" | "interactions"> = {
  href: "#",
  targetBlank: false,
  interactions: [],
  label: "Radarverstorende bouwwerken",
  active: false,
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
  interactions: {
    ...noControl,
  },
  dsoPlekinfoCardClick: {
    ...noControl,
    action: "dsoPlekinfoCardClick",
  },
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
    interactions: a.interactions,
    meta: a.meta,
    content,
    symbool,
    dsoPlekinfoCardClick: (e) => a.dsoPlekinfoCardClick(e.detail),
  };
}
