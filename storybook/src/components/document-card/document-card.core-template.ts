import { DocumentCard } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";
import { DocumentCardClickEvent, DsoDocumentCardCustomEvent } from "@dso-toolkit/core";

export const coreDocumentCard: ComponentImplementation<DocumentCard> = {
  component: "documentCard",
  implementation: "core",
  template: ({ labelTemplate, toggletipTemplate }) =>
    function documentCardTemplate({
      label,
      href,
      active,
      type,
      typeToelichting,
      meta,
      status,
      dsoDocumentCardClick,
    }: DocumentCard) {
      return html`<dso-document-card
        href=${href}
        ?active=${active}
        @dsoDocumentCardClick=${(e: DsoDocumentCardCustomEvent<DocumentCardClickEvent>) => {
          if (!e.detail.isModifiedEvent) {
            e.detail.originalEvent.preventDefault();
          }

          dsoDocumentCardClick(e);
        }}
        >${html`<h2 slot="heading">${label}</h2>`}
        ${meta ? html`<div slot="meta">${labelTemplate(meta)}</div>` : nothing}
        ${type
          ? html`<div slot="type">${type} ${typeToelichting ? toggletipTemplate(typeToelichting) : nothing}</div>`
          : nothing}
        ${status ? html`<div slot="status">${status}</div>` : nothing}
      </dso-document-card>`;
    },
};
