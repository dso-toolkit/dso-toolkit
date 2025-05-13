import { DocumentList, DocumentListItem } from "dso-toolkit";
import { html, TemplateResult } from "lit-html";
import { classMap } from "lit-html/directives/class-map.js";
import { ComponentImplementation } from "../../templates";

export const cssDocumentList: ComponentImplementation<DocumentList<TemplateResult>> = {
  component: "documentList",
  implementation: "html-css",
  template: ({ linkTemplate, dropdownMenuTemplate }) =>
    function documentListTemplate({ items }) {
      function documentListItemTemplate({ title, type, owner, status, sticky }: DocumentListItem<TemplateResult>) {
        return html`
          <div class="dso-document-list-item ${classMap({ "dso-document-list-item-sticky": !!sticky })}">
            <div class="dso-document-list-item-heading">
              <h2>${title}</h2>
              <div class="dso-document-list-item-container">
                <p class="dso-document-list-item-type">${type}</p>
                <p class="dso-document-list-item-owner">${owner}</p>
                <p class="dso-document-list-item-status">
                  ${status}
                  ${linkTemplate({
                    url: "#",
                    label: "Hele document bekijken",
                    modifier: "dso-document-list-item-open-document",
                  })}
                </p>
              </div>
            </div>
            <div class="dso-document-list-item-content">
              <span
                >Bovenliggend:
                ${dropdownMenuTemplate({
                  id: "dropdown-id",
                  button: { type: "button", variant: "tertiary", label: "AFDELING 1.1 Algemeen", ariaExpanded: true },
                  groups: [
                    {
                      items: [
                        {
                          type: "anchor",
                          url: "#",
                          label: "HOOFDSTUK 2 Milieubelasende activiteiten en lozingsactiviteiten",
                        },
                        { type: "anchor", url: "#", label: "AFDELING 2.1 Toepassingsbereik" },
                      ],
                    },
                  ],
                  dropdownAlign: "left",
                  boundary: ".dso-document-list-item-content",
                })}</span
              >
              <p>Hier komt vulling</p>
              <p>
                AssCo is the industry leader of virally-distributed, interactive networks. The aptitude to innovate
                interactively leads to the capability to architect ultra-proactively. We usually evolve impactful M&A.
                That is a remarkable achievement considering this year's conditions! If all of this comes off as
                improbable to you, that's because it is! The ability to monetize magnetically leads to the ability to
                empower magnetically. If all of this sounds discombobulating to you, that's because it is! We believe we
                know that it is better to utilize wirelessly than to enable interactively. We frequently embrace B2B
                e-businesses. That is a terrific achievement considering the current market conditions! Quick: do you
                have a granular game plan for managing new paradigms? The world-class models factor can be summed up in
                one word: backward-compatible. We apply the proverb "Birds of a feather flock together" not only to our
                systems but our ability to integrate.
              </p>
            </div>
          </div>
        `;
      }

      return html`
        <dso-responsive-element>
          <ul class="dso-document-list">
            ${items.map((item) => html`<li>${documentListItemTemplate(item)}</li>`)}
          </ul>
        </dso-responsive-element>
      `;
    },
};
