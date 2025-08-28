import { DsoHistoryItemCustomEvent } from "@dso-toolkit/core";
import { HistoryItemClickEvent, HistoryItemList } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreHistoryItemList: ComponentImplementation<HistoryItemList> = {
  component: "historyItemList",
  implementation: "core",
  template: () =>
    function historyItemListTemplate({ headings, historyItems }) {
      return html`<dso-history-item-list>
        ${headings.map((heading) => html`<span slot="heading">${heading}</span>`)}
        ${historyItems.map(
          ({ date, explanation, statusMessage, title, href, type, warning, dsoHistoryItemClick }) =>
            html`<dso-history-item
              type=${type}
              href=${href}
              @dsoHistoryItemClick=${(e: DsoHistoryItemCustomEvent<HistoryItemClickEvent>) => {
                if (!e.detail.isModifiedEvent) {
                  e.detail.originalEvent.preventDefault();
                }

                dsoHistoryItemClick?.(e);
              }}
            >
              ${html`<span slot="date">${date}</span>`} ${html`<span slot="status">${statusMessage}</span>`}
              ${title ? html`<span slot="title">${title}</span>` : nothing}
              ${explanation ? html`<span slot="explanation">${explanation}</span>` : nothing}
              ${warning ? html`<span slot="warning">${warning}</span>` : nothing}
            </dso-history-item>`,
        )}
      </dso-history-item-list>`;
    },
};
