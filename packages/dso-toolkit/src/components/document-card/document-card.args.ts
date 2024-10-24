import { HandlerFunction } from "@storybook/addon-actions";
import { ArgTypes } from "@storybook/types";

import { noControl } from "../../storybook/index.js";
import { DocumentCard } from "./document-card.models.js";
import { Label } from "../label/label.models.js";
import { Toggletip } from "../toggletip/toggletip.models.js";

export interface DocumentCardArgs {
  label: string;
  href: string;
  active: boolean;
  typeToelichting: Toggletip<never>;
  meta: Label;
  status: string;
  dsoDocumentCardClick: HandlerFunction;
}

export const documentCardArgs: Omit<DocumentCardArgs, "meta" | "typeToelichting" | "dsoDocumentCardClick"> = {
  href: "#",
  label: "Omgevingsplan Amsterdam",
  status: "Vastgesteld 07-06-2024 - geheel onherroepelijk in werking",
  active: false,
};

export const documentCardArgTypes: ArgTypes<Omit<DocumentCardArgs, "meta" | "typeToelichting">> = {
  label: {
    control: {
      type: "text",
    },
  },
  href: {
    control: {
      type: "text",
    },
  },
  status: {
    control: {
      type: "text",
    },
  },
  active: {
    control: {
      type: "boolean",
    },
  },
  dsoDocumentCardClick: {
    ...noControl,
    action: "dsoDocumentCardClick",
  },
};

export function documentCardArgsMapper<TemplateFnReturnType>(
  a: DocumentCardArgs,
  typeItems: TemplateFnReturnType[],
): DocumentCard<TemplateFnReturnType> {
  return {
    typeToelichting: a.typeToelichting,
    label: a.label,
    href: a.href,
    active: a.active,
    typeItems,
    status: a.status,
    meta: a.meta,
    dsoDocumentCardClick: (e) => a.dsoDocumentCardClick(e.detail),
  };
}
