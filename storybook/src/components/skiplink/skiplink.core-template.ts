import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

import { Skiplink } from "dso-toolkit";
import { DsoSkiplinkCustomEvent, SkiplinkClickEvent } from "@dso-toolkit/core";

export const coreSkiplink: ComponentImplementation<Skiplink> = {
  component: "skiplink",
  implementation: "core",
  template: () =>
    function skiplinkTemplate({ to, label, dsoSkiplinkClick }) {
      return html`<dso-skiplink
        to=${to}
        label=${label}
        @dsoSkiplinkClick=${(e: DsoSkiplinkCustomEvent<SkiplinkClickEvent>) => {
          if (!e.detail.isModifiedEvent) {
            e.detail.originalEvent.preventDefault();
          }
          dsoSkiplinkClick?.(e);
        }}
      ></dso-skiplink>`;
    },
};
