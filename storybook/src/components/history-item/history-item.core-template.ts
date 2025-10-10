import { DsoHistoryItemCustomEvent } from "@dso-toolkit/core";
import { HistoryItem, HistoryItemClickEvent } from "dso-toolkit";
import { html, nothing } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreHistoryItem: ComponentImplementation<HistoryItem> = {
  component: "historyItem",
  implementation: "core",
  template: () =>
    function historyItemTemplate({ date, explanation, statusMessage, title, href, type, warning, dsoClick }) {
      return html`<dso-history-item
        .type=${type}
        href=${ifDefined(href)}
        @dsoClick=${(e: DsoHistoryItemCustomEvent<HistoryItemClickEvent>) => {
          if (!e.detail.isModifiedEvent) {
            e.detail.originalEvent.preventDefault();
          }

          dsoClick?.(e);
        }}
      >
        <span slot="date">${date}</span> <span slot="status">${statusMessage}</span>
        ${title ? html`<span slot="title">${title}</span>` : nothing}
        ${explanation ? html`<span slot="explanation">${explanation}</span>` : nothing}
        ${warning ? html`<span slot="warning">${warning}</span>` : nothing}
      </dso-history-item>`;
    },
};
