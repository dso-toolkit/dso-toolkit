import { DocumentCardClickEvent, DsoDocumentCardCustomEvent } from "@dso-toolkit/core";
import { DocumentCard } from "dso-toolkit";
import { TemplateResult, html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

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
        ${typeItems
          ? html`<div slot="type">${typeItems} ${typeToelichting ? toggletipTemplate(typeToelichting) : nothing}</div>`
          : nothing}
        ${meta ? html`<span slot="meta">${labelTemplate(meta)}</span>` : nothing}
        ${status ? html`<span slot="status">${status}</span>` : nothing}
        ${statusToelichtingOutline || statusToelichtingWarning
          ? html`<span slot="interactions">
              ${statusToelichtingOutline && badgeTemplate(statusToelichtingOutline)}
              ${statusToelichtingWarning ? badgeTemplate(statusToelichtingWarning) : nothing}
            </span>`
          : nothing}
      </dso-document-card>`;
    },
};
