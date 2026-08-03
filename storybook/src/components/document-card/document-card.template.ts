import { DsoDocumentCardCustomEvent } from "@dso-toolkit/core";
import { TemplateResult, html, nothing } from "lit-html";

import { badgeTemplate } from "../badge/badge.template.js";
import { infoButtonTemplate } from "../info-button/info-button.template.js";
import { labelTemplate } from "../label/label.template.js";
import { labelGroupTemplate } from "../label-group/label-group.template.js";

import { DocumentCard, DocumentCardClickEvent } from "./document-card.models.js";

export function documentCardTemplate({
  label,
  href,
  active,
  typeItems,
  typeToelichting,
  statusToelichtingOutline,
  statusToelichtingWarning,
  meta,
  status,
  labels,
  dsoDocumentCardClick,
}: DocumentCard<TemplateResult>) {
  return html`<dso-document-card
    href=${href}
    ?active=${active}
    @dsoDocumentCardClick=${(e: DsoDocumentCardCustomEvent<DocumentCardClickEvent>) => {
      if (!e.detail.isModifiedEvent) {
        e.detail.originalEvent.preventDefault();
      }

      dsoDocumentCardClick?.(e);
    }}
    >${html`<h2 slot="heading">${label}</h2>`}
    ${
      typeItems
        ? html`<div slot="type">${typeItems} ${typeToelichting ? infoButtonTemplate(typeToelichting) : nothing}</div>`
        : nothing
    }
    ${meta ? html`<span slot="meta">${labelTemplate(meta)}</span>` : nothing}
    ${status ? html`<span slot="status">${status}</span>` : nothing}
    ${
      statusToelichtingOutline || statusToelichtingWarning
        ? html`<span slot="interactions">
            ${statusToelichtingOutline && badgeTemplate(statusToelichtingOutline)}
            ${statusToelichtingWarning ? badgeTemplate(statusToelichtingWarning) : nothing}
          </span>`
        : nothing
    }
    ${labels?.length ? labelGroupTemplate({ labels, slotName: "labels" }) : nothing}
  </dso-document-card>`;
}
