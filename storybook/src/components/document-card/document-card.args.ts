import { TemplateResult } from "lit-html";
import { HandlerFunction } from "storybook/actions";
import { ArgTypes } from "storybook/internal/types";
import { fn } from "storybook/test";

import { argTypeAction } from "../../shared/arg-type-action.js";
import { Badge } from "../badge/badge.models.js";
import { InfoButton } from "../info-button/info-button.models.js";
import { Label } from "../label/label.models.js";

import { DocumentCard } from "./document-card.models.js";

export interface DocumentCardArgs<TemplateFnReturnType> {
  label: string;
  href: string;
  active: boolean;
  meta: Label;
  status: string;
  statusToelichtingOutline?: Badge<TemplateFnReturnType>;
  statusToelichtingWarning?: Badge<TemplateFnReturnType>;
  dsoDocumentCardClick: HandlerFunction;
}

export const documentCardArgs: Omit<
  DocumentCardArgs<TemplateResult>,
  "meta" | "typeToelichting" | "statusToelichtingOutline" | "statusToelichtingWarning"
> = {
  href: "#",
  label: "Omgevingsplan Amsterdam",
  status: "Vastgesteld 07-06-2024 - geheel onherroepelijk in werking",
  active: false,
  dsoDocumentCardClick: fn(),
};

export const documentCardArgTypes: ArgTypes<
  Omit<DocumentCardArgs<TemplateResult>, "meta" | "statusToelichtingOutline" | "statusToelichtingWarning">
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
  a: DocumentCardArgs<TemplateFnReturnType>,
  typeItems: TemplateFnReturnType[],
  infoButton?: InfoButton<TemplateFnReturnType>,
  labels?: Label[],
): DocumentCard<TemplateFnReturnType> {
  return {
    typeToelichting: infoButton,
    label: a.label,
    href: a.href,
    active: a.active,
    typeItems,
    status: a.status,
    statusToelichtingOutline: a.statusToelichtingOutline,
    statusToelichtingWarning: a.statusToelichtingWarning,
    meta: a.meta,
    labels,
    dsoDocumentCardClick: (e) => a.dsoDocumentCardClick(e.detail),
  };
}
