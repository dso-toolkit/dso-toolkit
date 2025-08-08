import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../storybook";
import { Badge } from "../badge";
import { Label } from "../label";
import { Toggletip } from "../toggletip";

import { DocumentCard } from "./document-card.models.js";

export interface DocumentCardArgs {
  label: string;
  href: string;
  active: boolean;
  typeToelichting: Toggletip<never>;
  meta: Label;
  status: string;
  statusToelichtingOutline?: Badge;
  statusToelichtingWarning?: Badge;
  dsoDocumentCardClick: HandlerFunction;
}

export const documentCardArgs: Omit<
  DocumentCardArgs,
  "meta" | "typeToelichting" | "statusToelichtingOutline" | "statusToelichtingWarning"
> = {
  href: "#",
  label: "Omgevingsplan Amsterdam",
  status: "Vastgesteld 07-06-2024 - geheel onherroepelijk in werking",
  active: false,
  dsoDocumentCardClick: fn(),
};

export const documentCardArgTypes: ArgTypes<
  Omit<DocumentCardArgs, "meta" | "typeToelichting" | "statusToelichtingOutline" | "statusToelichtingWarning">
> = {
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
  dsoDocumentCardClick: argTypeAction(),
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
    statusToelichtingOutline: a.statusToelichtingOutline,
    statusToelichtingWarning: a.statusToelichtingWarning,
    meta: a.meta,
    dsoDocumentCardClick: (e) => a.dsoDocumentCardClick(e.detail),
  };
}
