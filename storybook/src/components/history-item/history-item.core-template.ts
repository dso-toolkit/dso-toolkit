import { DsoHistoryItemCustomEvent } from "@dso-toolkit/core";
import { HistoryItem, HistoryItemClickEvent } from "dso-toolkit";
import { html, nothing } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreHistoryItem: ComponentImplementation<HistoryItem> = {
  component: "historyItem",
  implementation: "core",
  template: () =>
    function historyItemTemplate({
      date,
      explanation,
      statusMessage,
      title,
      href,
      type,
      warning,
      dsoHistoryItemClick,
    }) {
      return html`<dso-history-item
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
      </dso-history-item>`;
    },
};
