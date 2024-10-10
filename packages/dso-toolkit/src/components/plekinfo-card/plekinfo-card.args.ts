import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook";
import { PlekinfoCard, PlekinfoWijzigactie } from "./plekinfo-card.models.js";
import { Renvooi } from "../renvooi/renvooi.models.js";
import { Label } from "../label/label.models.js";

export interface PlekinfoCardArgs {
  label: Renvooi | string;
  href: string;
  active: boolean;
  meta: Label;
  wijzigactie: PlekinfoWijzigactie;
  dsoPlekinfoCardClick: HandlerFunction;
}

export const plekinfoCardArgs: Pick<PlekinfoCardArgs, "href" | "label" | "active"> = {
  href: "#",
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
  dsoPlekinfoCardClick: {
    ...noControl,
    action: "dsoPlekinfoCardClick",
  },
};

export function plekinfoCardArgsMapper<TemplateFnReturnType>(
  a: PlekinfoCardArgs,
  symbool: TemplateFnReturnType,
  content?: TemplateFnReturnType,
): PlekinfoCard<TemplateFnReturnType> {
  return {
    label: a.label,
    href: a.href,
    active: a.active,
    wijzigactie: a.wijzigactie,
    meta: a.meta,
    content,
    symbool,
    dsoPlekinfoCardClick: (e) => a.dsoPlekinfoCardClick(e.detail),
  };
}
