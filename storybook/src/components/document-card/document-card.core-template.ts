import { DocumentCard } from "dso-toolkit";
import { html, nothing, TemplateResult } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { DocumentCardClickEvent, DsoDocumentCardCustomEvent } from "@dso-toolkit/core";

export const coreDocumentCard: ComponentImplementation<DocumentCard<never>> = {
  component: "documentCard",
  implementation: "core",
  template: ({ labelTemplate, toggletipTemplate, badgeTemplate }) =>
    function documentCardTemplate({
      label,
      href,
      active,
      typeItems,
      typeToelichting,
      statusToelichtingOutline,
      statusToelichtingWarning,
      meta,
      status,
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
        ${meta ? html`<div slot="meta">${labelTemplate(meta)}</div>` : nothing}
        ${typeItems
          ? html`<div slot="type">${typeItems} ${typeToelichting ? toggletipTemplate(typeToelichting) : nothing}</div>`
          : nothing}
        ${status
          ? statusToelichtingOutline || statusToelichtingWarning
            ? html`<div slot="status">
                ${status} ${badgeTemplate(statusToelichtingOutline)} ${badgeTemplate(statusToelichtingWarning)}
              </div>`
            : html`<div slot="status">${status}</div>`
          : nothing}
      </dso-document-card>`;
    },
};
