import { DsoHistoryItemCustomEvent } from "@dso-toolkit/core";
import { HistoryItemClickEvent, HistoryItems } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreHistoryItems: ComponentImplementation<HistoryItems> = {
  component: "historyItems",
  implementation: "core",
  template: () =>
    function historyItemsTemplate({ headings, historyItems }) {
      return html`<dso-history-items>
        ${headings.map((heading) => html`<span slot="headings">${heading}</span>`)}
        ${historyItems.map(
          ({ date, explanation, statusMessage, title, href, type, warning, dsoHistoryItemClick }) =>
            html`<li>
              <dso-history-item
                .type=${type}
                href=${href}
                @dsoHistoryItemClick=${(e: DsoHistoryItemCustomEvent<HistoryItemClickEvent>) => {
                  if (!e.detail.isModifiedEvent) {
                    e.detail.originalEvent.preventDefault();
                  }

                  dsoHistoryItemClick?.(e);
                }}
              >
                <span slot="date">${date}</span> <span slot="status">${statusMessage}</span>
                ${title ? html`<span slot="title">${title}</span>` : nothing}
                ${explanation ? html`<span slot="explanation">${explanation}</span>` : nothing}
                ${warning ? html`<span slot="warning">${warning}</span>` : nothing}
              </dso-history-item>
            </li>`,
        )}
      </dso-history-items></li>`;
    },
};
