import { DsoMarkBarCustomEvent, MarkBarClearEvent, MarkBarInputEvent, MarkBarPaginationEvent } from "@dso-toolkit/core";
import { MarkBar } from "dso-toolkit";
import { html } from "lit-html";
import { ifDefined } from "lit-html/directives/if-defined.js";

import { ComponentImplementation } from "../../templates";

export const coreMarkBar: ComponentImplementation<MarkBar> = {
  component: "markBar",
  implementation: "core",
  template: () =>
    function markBarTemplate({ current, totalCount, dsoInput, dsoClear, dsoNext, dsoPrevious, label, value }) {
      return html`<dso-mark-bar
        label=${ifDefined(label)}
        value=${ifDefined(value)}
        current=${current}
        total-count=${totalCount}
        @dsoInput=${(e: DsoMarkBarCustomEvent<MarkBarInputEvent>) => {
          e.stopPropagation();

          dsoInput?.(e.detail);
        }}
        @dsoNext=${(e: DsoMarkBarCustomEvent<MarkBarPaginationEvent>) => dsoNext?.(e.detail)}
        @dsoPrevious=${(e: DsoMarkBarCustomEvent<MarkBarPaginationEvent>) => dsoPrevious?.(e.detail)}
        @dsoClear=${(e: DsoMarkBarCustomEvent<MarkBarClearEvent>) => dsoClear?.(e.detail)}
      ></dso-mark-bar>`;
    },
};
