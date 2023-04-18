import { ScrollContainer } from "dso-toolkit";
import { html } from "lit-html";

import { ComponentImplementation } from "../../templates";

export const coreScrollContainer: ComponentImplementation<ScrollContainer> = {
  component: "scrollContainer",
  implementation: "core",
  template: () =>
    function scrollContainerTemplate({ children, dsoScrollContainerEvent }) {
      return html`<dso-scroll-container @dsoScrollContainerEvent=${dsoScrollContainerEvent}>
        ${children}
      </dso-scroll-container>`;
    },
};
